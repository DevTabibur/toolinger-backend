import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { SystemSettingsService } from "./system-settings.service";
import { sendSuccessResponse } from "../../../../shared/sendSuccessResponse";
import httpStatus from "http-status";

const getSystemSettings = catchAsync(async (req: Request, res: Response) => {
  const result = await SystemSettingsService.getSystemSettings();

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "OTP settings retrieved successfully",
    data: result,
  });
});

const updateSystemSettings = catchAsync(async (req: Request, res: Response) => {
  const result = await SystemSettingsService.updateSystemSettings(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "OTP settings updated successfully",
    data: result,
  });
});

export const SystemSettingsController = {
  getSystemSettings,
  updateSystemSettings,
};
