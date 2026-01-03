import { Model, Schema, model } from "mongoose";
import { IOTP } from "./otp.interface";

type OTPModel = Model<IOTP>;

const OTPModelSchema = new Schema<IOTP>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otpCode: {
      type: String,
      required: true,
    },
    expireTime: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  },
);

const OTPModel = model<IOTP, OTPModel>("OTPModel", OTPModelSchema);

export default OTPModel;
