export interface ISystemSettings {
  otpType: "SMS" | "EMAIL";
  otpDigitLimit: number;
  otpExpireTime: number; // in minutes
}

export interface IUpdateSystemSettings {
  otpType?: "SMS" | "EMAIL";
  otpDigitLimit?: number;
  otpExpireTime?: number;
}
