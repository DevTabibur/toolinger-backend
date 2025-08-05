import bcrypt from "bcryptjs";
import UserModel from "../modules/user/user.model";

export const comparePassword = async (
  loginEmail: string,
  givenPassword: string,
): Promise<boolean> => {
  const user = await UserModel.findOne({ email: loginEmail });
  console.log("user", user);

  const hashedPassword = user?.password;
  if (!user || !user?.password) {
    return false;
  }
  const isPasswordMatch = await bcrypt.compare(
    givenPassword,
    hashedPassword as string,
  );
  console.log("isPasswordMatch", isPasswordMatch);
  return isPasswordMatch;
};
