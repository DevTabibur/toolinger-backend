"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
    }),
});
const registerUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'user id is required',
        }),
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password  is required',
        }),
        newPassword: zod_1.z.string({
            required_error: 'New password  is required',
        }),
        confirmNewPassword: zod_1.z.string({
            required_error: 'New password  is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
const verifyOTPSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNo: zod_1.z.string({
            required_error: 'Phone no is required',
        }),
        otp: zod_1.z.string({
            required_error: 'OTP is required',
        }),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
    changePasswordZodSchema,
    registerUserZodSchema,
    verifyOTPSchema,
    refreshTokenZodSchema,
};
