import { Model, Schema, model } from "mongoose";
import { ISystemSettings } from "./system-settings.interface";

type OTPSettingsModel = Model<ISystemSettings>;

const OTPSchema = new Schema<ISystemSettings>(
  {
    otpType: {
      type: String,
      enum: ["SMS", "EMAIL"],
      default: "EMAIL",
      required: true,
    },
    otpDigitLimit: {
      type: Number,
      default: 4,
      required: true,
      min: 4,
      max: 8,
    },
    otpExpireTime: {
      type: Number,
      default: 5,
      required: true,
      min: 1,
      max: 60,
    },
  },
  {
    timestamps: true,
  },
);

const OTPSettingsModel = model<ISystemSettings, OTPSettingsModel>(
  "OTPSettings",
  OTPSchema,
);

export default OTPSettingsModel;
