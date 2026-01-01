/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import config from "../../../config";
import bcrypt from "bcryptjs";
import { USER_STATUS } from "./user.constant";

type UserModel = Model<IUser> & {
  isUserExist(userId: string): Promise<boolean>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (email: string) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
        },
        message: "Please enter a valid email address.",
      },
    },
    password: {
      type: String,
      required: false,
      minlength: 6,
      // select: 0,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    avatar: {
      type: String,
    },
    rememberMe: {
      type: Boolean,
      default: false,
    },
    phoneNo: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

//! Hash the password before saving
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const hashedPassword = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_round),
      );
      this.password = hashedPassword;
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

//! Check if user exists
userSchema.statics.isUserExist = async function (
  userId: string,
): Promise<boolean> {
  const user = await this.findOne({ userId });
  return !!user;
};

//! Check if the password is matched
userSchema.statics.isPasswordMatched = function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(givenPassword, savedPassword);
};

const UserModel = model<IUser, UserModel>("User", userSchema);
export default UserModel;
