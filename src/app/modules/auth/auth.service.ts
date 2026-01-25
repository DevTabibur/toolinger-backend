import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import UserModel from "../user/user.model";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { IUser } from "../user/user.interface";
import { ILoginUser, IUserResponse } from "./auth.interface";
import { sendEmail } from "../../helpers/sendEmail";
import { sendZeptoMail } from "../../helpers/sendZeptoMail";
import OTPSettingsModel from "../settings/system-settings/system-settings.model";
import { OTPGenerator } from "../../utils/otpGenerator";
import OTPModel from "../otp/otp.model";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { buildOTPEmailTemplate } from "../../utils/OTPEmailTemplate";

const registerNewUser = async (userData: IUser): Promise<IUserResponse> => {
  const { email } = userData;

  //! Validation for already loggedIn User can not register again
  const isUserExist = await UserModel.findOne({ email });
  if (isUserExist) {
    throw new ApiError(
      httpStatus.FOUND,
      "This email is already taken, try another!",
    );
  }

  // ! Generating unique user id

  const result = await UserModel.create(userData);

  //! Let's give user secret token
  const accessToken = jwtHelpers.createToken(
    { userId: result._id },
    config.jwt.accessToken as Secret,
    config.jwt.accessToken_expires_in as string,
  );

  return {
    accessToken,
  };
};

const loginExistingUser = async (
  loginData: ILoginUser,
): Promise<IUserResponse> => {
  // console.log("login data", loginData)
  const { email, password, rememberMe } = loginData;
  const isUserExist = await UserModel.findOne({ email });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User is not found");
  }

  const isPasswordMatched = await UserModel.isPasswordMatched(
    password,
    isUserExist.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const accessToken = jwtHelpers.createToken(
    { userId: isUserExist._id, userEmail: isUserExist.email },
    config.jwt.accessToken as Secret,
    config.jwt.accessToken_expires_in as string,
  );

  return { accessToken };
};

const ChangePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
) => {
  const isUserExist = await UserModel.findOne({ _id: userId }).select(
    "+password",
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // Check if old password is correct
  const isPasswordMatch = await UserModel.isPasswordMatched(
    oldPassword,
    isUserExist.password,
  );

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Old Password is incorrect");
  }

  // Update password
  isUserExist.password = newPassword;

  // Save the new password
  await isUserExist.save();
};

const logOutUser = async (token: any) => {
  const { userId } = token;
  // console.log("userId", userId);
  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  const result = await UserModel.findByIdAndUpdate(
    userId,
    { status: "inactive" },
    { new: true, select: "-password" }, // Exclude the password field
  );
  return result;
};

const getMe = async (token: any) => {
  const { userId } = token;
  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  // Find user by id and exclude password field
  const user = await UserModel.findById(userId).select("-password");
  return user;
};

//** DO NOT DELETE IT */
//   //****************************************************************** */
// const forgotPassword = async (email: string) => {
//   // ! 1. check if user is existed on our db or not check it with email
//   const userExists = await UserModel.findOne(
//     { email },
//     { name: 1, role: 1, email: 1 },
//   );
//   if (!userExists) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist!");
//   }

//   const passwordResetToken = jwtHelpers.createResetToken(
//     { id: userExists.id },
//     config.jwt.accessToken as string,
//     "5m",
//   );

//   const resetLink: string =
//     config.reset_link +
//     `email=${userExists?.email}&token=${passwordResetToken}`;

//   await sendZeptoMail(
//     userExists?.email,
//     "Reset Password Link",
//     "This link will expire within 5 minutes",
//     `<div>
//          <p>Hi, Your Reset Password Link: <a href="${resetLink}">Click Here</a></p>
//          <p style="color: red;">This link will expire within 5 minutes</p>
//          <p>Thank You</p>
//       </div>
//       `,
//   );
//   return {
//     message: "Check your email!",
//   };
// };

export const forgotPassword = async (email: string) => {
  const session = await mongoose.startSession();

  let createdOTP: any = null;
  let user: any = null;
  let otpPlain = "";
  let expireDate!: Date;

  try {
    await session.withTransaction(async () => {
      // 1. Check user
      user = await UserModel.findOne(
        { email },
        { firstName: 1, lastName: 1, email: 1 },
      ).session(session);

      if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist!");
      }

      // 2. Load OTP settings
      const otpSettings = await OTPSettingsModel.findOne({}).session(session);
      if (!otpSettings) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "OTP settings not configured",
        );
      }

      if (otpSettings.otpType !== "EMAIL") {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email OTP is disabled");
      }

      // 3. Invalidate previous OTPs
      await OTPModel.deleteMany({ email: user.email }, { session });

      // 4. Generate OTP
      otpPlain = OTPGenerator(otpSettings.otpDigitLimit);
      const hashedOTP = await bcrypt.hash(
        otpPlain,
        Number(config.bcrypt_salt_round),
      );

      expireDate = new Date(Date.now() + otpSettings.otpExpireTime * 60 * 1000);

      // 5. Save OTP
      createdOTP = await OTPModel.create(
        [
          {
            email: user.email,
            otpCode: hashedOTP,
            expireTime: expireDate,
          },
        ],
        { session },
      );
    });

    // 6. Send Email (outside transaction)
    const emailHTML = buildOTPEmailTemplate({
      userName: `${user.firstName} ${user.lastName || ""}`.trim(),
      otp: otpPlain,
      expireMinutes: Number((expireDate.getTime() - Date.now()) / 60000),
    });

    await sendZeptoMail({
      to: [
        {
          email: user.email,
          name: `${user.firstName} ${user.lastName || ""}`.trim(),
        },
      ],
      subject: "Your Toolinger Verification Code",
      htmlBody: emailHTML,
    });

    return {
      message: "OTP sent to your email",
    };
  } catch (error: any) {
    // Cleanup OTP if email failed
    if (createdOTP?.[0]?._id) {
      await OTPModel.findByIdAndDelete(createdOTP[0]._id);
    }

    throw error instanceof ApiError
      ? error
      : new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          error.message || "Failed to process forgot password",
        );
  } finally {
    session.endSession();
  }
};

//****************************************************************** */

// const resetPassword = async (
//   payload: {
//     email: string
//     password: string
//   },
//   token: string,
// ) => {
//   const { email, password } = payload

//   const userExists = await UserModel.findOne({ email })
//   if (!userExists) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
//   }

//   const isVerified = jwtHelpers.verifyToken(
//     token,
//     config.jwt.accessToken as string,
//   )

//   const hashedPassword = await bcrypt.hash(
//     password,
//     Number(config.bcrypt_salt_round),
//   )
//   await UserModel.updateOne(
//     { email: email },
//     {
//       $set: {
//         password: hashedPassword,
//       },
//     },
//   )

//   // await userModel.updateOne({ email }, { hashedPassword })
// }

//===========================OTP BASED
const resetPassword = async (payload: {
  email: string;
  otp: string;
  password: string;
}) => {
  const { email, otp, password } = payload;

  // 1. User check
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }

  // 2. OTP record check
  const otpRecord = await OTPModel.findOne({ email });
  if (!otpRecord) {
    throw new ApiError(httpStatus.BAD_REQUEST, "OTP expired or not found");
  }

  // 3. Expiry check (TTL usually deletes automatically, but double safety)
  if (otpRecord.expireTime < new Date()) {
    await OTPModel.deleteOne({ email });
    throw new ApiError(httpStatus.BAD_REQUEST, "OTP expired");
  }

  // 4. Compare OTP
  const isOTPMatched = await bcrypt.compare(otp, otpRecord.otpCode);

  if (!isOTPMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid OTP");
  }

  // 5. Hash new password
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_round),
  );

  // 6. Update password
  await UserModel.updateOne({ email }, { $set: { password: hashedPassword } });

  // 7. Delete OTP (IMPORTANT)
  await OTPModel.deleteOne({ email });

  return {
    message: "Password reset successful",
  };
};

export const AuthService = {
  ChangePassword,
  registerNewUser,
  loginExistingUser,
  logOutUser,
  forgotPassword,
  getMe,
  resetPassword,
};
