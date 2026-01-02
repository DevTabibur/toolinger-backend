import ApiError from "../../../../errors/ApiError";
import httpStatus from "http-status";

import {
  ISystemSettings,
  IUpdateSystemSettings,
} from "./system-settings.interface";
import OTPSettingsModel from "./system-settings.model";

const getSystemSettings = async (): Promise<ISystemSettings> => {
  let settings = await OTPSettingsModel.findOne();

  // If no settings exist, create default settings
  if (!settings) {
    settings = await OTPSettingsModel.create({
      otpType: "EMAIL",
      otpDigitLimit: 4,
      otpExpireTime: 5,
    });
  }

  return settings;
};

const updateSystemSettings = async (
  updateData: Partial<IUpdateSystemSettings>,
): Promise<ISystemSettings> => {
  let settings = await OTPSettingsModel.findOne();
  // console.log("udpateData", updateData)

  // If no settings exist, create with provided data
  if (!settings) {
    settings = await OTPSettingsModel.create({
      otpType: updateData.otpType || "EMAIL",
      otpDigitLimit: updateData.otpDigitLimit || 4,
      otpExpireTime: updateData.otpExpireTime || 5,
    });
  } else {
    // Update existing settings
    settings = await OTPSettingsModel.findOneAndUpdate({}, updateData, {
      new: true,
      runValidators: true,
    });

    if (!settings) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update OTP settings",
      );
    }
  }

  return settings;
};

export const SystemSettingsService = {
  getSystemSettings,
  updateSystemSettings,
};
