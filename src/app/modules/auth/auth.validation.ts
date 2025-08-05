import { z } from 'zod'

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
})

const registerUserZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'user id is required',
    }),
    name: z.string({
      required_error: 'name is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password  is required',
    }),
    newPassword: z.string({
      required_error: 'New password  is required',
    }),
    confirmNewPassword: z.string({
      required_error: 'New password  is required',
    }),
  }),
})

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})


const verifyOTPSchema = z.object({
  body: z.object({
    phoneNo: z.string({
      required_error: 'Phone no is required',
    }),
    otp: z.string({
      required_error: 'OTP is required',
    }),
  }),
})




export const AuthValidation = {
  loginZodSchema,
  changePasswordZodSchema,
  registerUserZodSchema,
  verifyOTPSchema,
  refreshTokenZodSchema,
}
