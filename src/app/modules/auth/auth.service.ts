import { Types } from "mongoose";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import UserModel from "../user/user.model";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import { IUser } from "../user/user.interface";
import { IChangePassword, ILoginUser, IUserResponse } from "./auth.interface";
import { comparePassword } from "../../helpers/comparePassword";

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
  const { email, password } = loginData;
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
//   const forgotPassword = async (email: string) => {
//     // ! 1. check if user is existed on our db or not check it with email
//     const userExists = await UserModel.findOne(
//       { email },
//       { name: 1, role: 1, email: 1 },
//     )
//     if (!userExists) {
//       throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist!")
//     }

//     const passwordResetToken = jwtHelpers.createResetToken(
//       { id: userExists.id },
//       config.jwt.accessToken as string,
//       '5m',
//     )

//     const resetLink: string =
//       config.resetLink + `email=${userExists?.email}&token=${passwordResetToken}`

//     await sendEmail(
//       userExists?.email,
//       'Reset Password Link',
//       'This link will expire within 5 minutes',
//       `<div>
//          <p>Hi, Your Reset Password Link: <a href="${resetLink}">Click Here</a></p>
//          <p style="color: red;">This link will expire within 5 minutes</p>
//          <p>Thank You</p>
//       </div>
//       `,
//     )
//     return {
//       message: 'Check your email!',
//     }
//   }

//   //****************************************************************** */

//   const resetPassword = async (
//     payload: {
//       email: string
//       password: string
//     },
//     token: string,
//   ) => {
//     const { email, password } = payload

//     const userExists = await UserModel.findOne({ email })
//     if (!userExists) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
//     }

//     const isVerified = jwtHelpers.verifyToken(
//       token,
//       config.jwt.accessToken as string,
//     )

//     const hashedPassword = await bcrypt.hash(
//       password,
//       Number(config.bcrypt_salt_round),
//     )
//     await UserModel.updateOne(
//       { email: email },
//       {
//         $set: {
//           password: hashedPassword,
//         },
//       },
//     )

//     // await userModel.updateOne({ email }, { hashedPassword })
//   }

export const AuthService = {
  ChangePassword,
  registerNewUser,
  loginExistingUser,
  logOutUser,
  getMe,
};
