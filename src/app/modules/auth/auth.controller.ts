import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import jwt from "jsonwebtoken";

const registerNewUser = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, ...rest } = await AuthService.registerNewUser(req.body);

  const cookieOptions = {
    httpOnly: true,
    // secure: false,
    secure: config?.env === "production",
  };

  res.cookie("refreshToken", accessToken, cookieOptions);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Registered successfully",
    data: { accessToken, ...rest },
  });
});

//!================================================>>>
const loginExistingUser = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, ...rest } = await AuthService.loginExistingUser(
    req.body,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Login successfully",
    data: { accessToken, ...rest },
  });
});

const ChangePassword = catchAsync(async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "No token provided");
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    if (!config.jwt.accessToken) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "JWT secret is not defined",
      );
    }

    // Decode and verify the token
    const decoded = jwt.verify(token, config.jwt.accessToken) as {
      userId: string;
    };

    const { userId } = decoded;

    if (!userId) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
    }

    const { oldPassword, newPassword } = req.body;

    // Call the AuthService to handle password change
    await AuthService.ChangePassword(userId, oldPassword, newPassword);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error in password change:", error); // Log error details.
  }
});

//!===========================================================>>>
const logOutUser = catchAsync(async (req: Request, res: Response) => {
  const token = req.user;
  // console.log("token", token);

  const result = await AuthService.logOutUser(token);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Log out successful",
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const token = req.user;

  const result = await AuthService.getMe(token);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Get Me  successful",
    data: result,
  });
});

///** DO NOT DELETE IT */

//!==========================================================>>>
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await AuthService.forgotPassword(email);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Check your email!",
  });
});

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
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const data = await AuthService.resetPassword(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: data,
    message: "Account recovered",
  });
});
export const AuthController = {
  ChangePassword,
  registerNewUser,
  loginExistingUser,
  logOutUser,
  getMe,
  forgotPassword,
  resetPassword,
};
