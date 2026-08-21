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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const auth_service_1 = require("./auth.service");
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerNewUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = yield auth_service_1.AuthService.registerNewUser(req.body), { accessToken } = _a, rest = __rest(_a, ["accessToken"]);
    const cookieOptions = {
        httpOnly: true,
        // secure: false,
        secure: (config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.env) === "production",
    };
    res.cookie("refreshToken", accessToken, cookieOptions);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Registered successfully",
        data: Object.assign({ accessToken }, rest),
    });
}));
//!================================================>>>
const loginExistingUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = yield auth_service_1.AuthService.loginExistingUser(req.body), { accessToken } = _a, rest = __rest(_a, ["accessToken"]);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Login successfully",
        data: Object.assign({ accessToken }, rest),
    });
}));
const ChangePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "No token provided");
    }
    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    try {
        if (!config_1.default.jwt.accessToken) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "JWT secret is not defined");
        }
        // Decode and verify the token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.accessToken);
        const { userId } = decoded;
        if (!userId) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid token");
        }
        const { oldPassword, newPassword } = req.body;
        // Call the AuthService to handle password change
        yield auth_service_1.AuthService.ChangePassword(userId, oldPassword, newPassword);
        (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Password changed successfully",
        });
    }
    catch (error) {
        console.error("Error in password change:", error); // Log error details.
    }
}));
//!===========================================================>>>
const logOutUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.user;
    // console.log("token", token);
    const result = yield auth_service_1.AuthService.logOutUser(token);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Log out successful",
        data: result,
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.user;
    const result = yield auth_service_1.AuthService.getMe(token);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Get Me  successful",
        data: result,
    });
}));
///** DO NOT DELETE IT */
//!==========================================================>>>
const forgotPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield auth_service_1.AuthService.forgotPassword(email);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: "Check your email!",
    });
}));
// //!====================JWT BASED=====================================>>>
// const resetPassword = catchAsync(async (req: Request, res: Response) => {
//   const token = req.headers.authorization
//   // const token = req.body.token
//   // console.log("tokne", token)
//   const data = await AuthService.resetPassword(req.body, token as string)
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     data: data,
//     message: 'Account recovered',
//   })
// })
//!=========================OTP BASED============================>>>
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_service_1.AuthService.resetPassword(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: data,
        message: "Account recovered",
    });
}));
exports.AuthController = {
    ChangePassword,
    registerNewUser,
    loginExistingUser,
    logOutUser,
    getMe,
    forgotPassword,
    resetPassword,
};
