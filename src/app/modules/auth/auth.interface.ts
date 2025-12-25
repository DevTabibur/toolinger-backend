import { IUser } from "../user/user.interface";

export type IRefreshTokenResponse = {
  accessToken: string;
};

export interface IUserResponse {
  accessToken?: string;
  // refreshToken?: string
  data?: Partial<IUser>;
}

export interface ILoginUser {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export type IChangePassword = {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

// For jwt payload-------------
export interface IJwtPayload {
  _id: string;
}
