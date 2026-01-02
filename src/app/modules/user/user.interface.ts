export interface IUser {
  email: string;
  password: string;
  status: "active" | "inactive";
  firstName: string;
  lastName?: string;
  role?: string;
  avatar?: string;
  rememberMe?: boolean;
  phoneNo?: string;
}
