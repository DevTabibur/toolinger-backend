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
exports.AuthService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
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
    const { email, password } = loginData;
    // Check if database is empty
    const isDatabaseEmpty = (yield user_model_1.default.countDocuments({})) === 0;
    // If database is empty, create first user with hashed password
    if (isDatabaseEmpty) {
        // Create a new user instance to trigger the pre-save hook
        const newUser = new user_model_1.default(loginData);
        yield newUser.save(); // This will trigger the pre-save hook to hash the password
        const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: newUser._id, userEmail: newUser.email }, config_1.default.jwt.accessToken, config_1.default.jwt.accessToken_expires_in);
        return { accessToken };
    }
    // For non-empty database - normal login flow
    const user = yield user_model_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User is not found");
    }
    // Use the model's static method for password comparison
    const isPasswordMatched = yield user_model_1.default.isPasswordMatched(password, user.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: user._id, userEmail: user.email }, config_1.default.jwt.accessToken, config_1.default.jwt.accessToken_expires_in);
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
//** DO NOT DELETE IT */
// const logOutUser = async (userId: string) => {
//     const result = await UserModel.findByIdAndUpdate(
//       userId,
//       { status: 'inactive' },
//       { new: true, select: '-password' }, // Exclude the password field
//     )
//     return result
//   }
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
exports.AuthService = {
    ChangePassword,
    registerNewUser,
    loginExistingUser,
};
