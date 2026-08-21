"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.forgotPassword = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const sendZeptoMail_1 = require("../../helpers/sendZeptoMail");
const system_settings_model_1 = __importDefault(require("../settings/system-settings/system-settings.model"));
const otpGenerator_1 = require("../../utils/otpGenerator");
const otp_model_1 = __importDefault(require("../otp/otp.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const OTPEmailTemplate_1 = require("../../utils/OTPEmailTemplate");
const registerNewUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    //! Validation for already loggedIn User can not register again
    const isUserExist = yield user_model_1.default.findOne({ email });
    if (isUserExist) {
        throw new ApiError_1.default(http_status_1.default.FOUND, "This email is already taken, try another!");
    }
    // ! Generating unique user id
    const result = yield user_model_1.default.create(userData);
    //! Let's give user secret token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: result._id }, config_1.default.jwt.accessToken, config_1.default.jwt.accessToken_expires_in);
    return {
        accessToken,
    };
});
const loginExistingUser = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("login data", loginData)
    const { email, password, rememberMe } = loginData;
    const isUserExist = yield user_model_1.default.findOne({ email });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User is not found");
    }
    const isPasswordMatched = yield user_model_1.default.isPasswordMatched(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: isUserExist._id, userEmail: isUserExist.email }, config_1.default.jwt.accessToken, config_1.default.jwt.accessToken_expires_in);
    return { accessToken };
});
const ChangePassword = (userId, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.default.findOne({ _id: userId }).select("+password");
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    // Check if old password is correct
    const isPasswordMatch = yield user_model_1.default.isPasswordMatched(oldPassword, isUserExist.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Old Password is incorrect");
    }
    // Update password
    isUserExist.password = newPassword;
    // Save the new password
    yield isUserExist.save();
});
const logOutUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = token;
    // console.log("userId", userId);
    if (!userId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User not found");
    }
    const result = yield user_model_1.default.findByIdAndUpdate(userId, { status: "inactive" }, { new: true, select: "-password" });
    return result;
});
const getMe = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = token;
    if (!userId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User not found");
    }
    // Find user by id and exclude password field
    const user = yield user_model_1.default.findById(userId).select("-password");
    return user;
});
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
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    let createdOTP = null;
    let user = null;
    let otpPlain = "";
    let expireDate;
    try {
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            // 1. Check user
            user = yield user_model_1.default.findOne({ email }, { firstName: 1, lastName: 1, email: 1 }).session(session);
            if (!user) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't exist!");
            }
            // 2. Load OTP settings
            const otpSettings = yield system_settings_model_1.default.findOne({}).session(session);
            if (!otpSettings) {
                throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "OTP settings not configured");
            }
            if (otpSettings.otpType !== "EMAIL") {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Email OTP is disabled");
            }
            // 3. Invalidate previous OTPs
            yield otp_model_1.default.deleteMany({ email: user.email }, { session });
            // 4. Generate OTP
            otpPlain = (0, otpGenerator_1.OTPGenerator)(otpSettings.otpDigitLimit);
            const hashedOTP = yield bcryptjs_1.default.hash(otpPlain, Number(config_1.default.bcrypt_salt_round));
            expireDate = new Date(Date.now() + otpSettings.otpExpireTime * 60 * 1000);
            // 5. Save OTP
            createdOTP = yield otp_model_1.default.create([
                {
                    email: user.email,
                    otpCode: hashedOTP,
                    expireTime: expireDate,
                },
            ], { session });
        }));
        // 6. Send Email (outside transaction)
        const emailHTML = (0, OTPEmailTemplate_1.buildOTPEmailTemplate)({
            userName: `${user.firstName} ${user.lastName || ""}`.trim(),
            otp: otpPlain,
            expireMinutes: Number((expireDate.getTime() - Date.now()) / 60000),
        });
        yield (0, sendZeptoMail_1.sendZeptoMail)({
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
    }
    catch (error) {
        // Cleanup OTP if email failed
        if ((_a = createdOTP === null || createdOTP === void 0 ? void 0 : createdOTP[0]) === null || _a === void 0 ? void 0 : _a._id) {
            yield otp_model_1.default.findByIdAndDelete(createdOTP[0]._id);
        }
        throw error instanceof ApiError_1.default
            ? error
            : new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message || "Failed to process forgot password");
    }
    finally {
        session.endSession();
    }
});
exports.forgotPassword = forgotPassword;
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
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp, password } = payload;
    // 1. User check
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User not found");
    }
    // 2. OTP record check
    const otpRecord = yield otp_model_1.default.findOne({ email });
    if (!otpRecord) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "OTP expired or not found");
    }
    // 3. Expiry check (TTL usually deletes automatically, but double safety)
    if (otpRecord.expireTime < new Date()) {
        yield otp_model_1.default.deleteOne({ email });
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "OTP expired");
    }
    // 4. Compare OTP
    const isOTPMatched = yield bcryptjs_1.default.compare(otp, otpRecord.otpCode);
    if (!isOTPMatched) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid OTP");
    }
    // 5. Hash new password
    const hashedPassword = yield bcryptjs_1.default.hash(password, Number(config_1.default.bcrypt_salt_round));
    // 6. Update password
    yield user_model_1.default.updateOne({ email }, { $set: { password: hashedPassword } });
    // 7. Delete OTP (IMPORTANT)
    yield otp_model_1.default.deleteOne({ email });
    return {
        message: "Password reset successful",
    };
});
exports.AuthService = {
    ChangePassword,
    registerNewUser,
    loginExistingUser,
    logOutUser,
    forgotPassword: exports.forgotPassword,
    getMe,
    resetPassword,
};
