import { FilterQuery, SortOrder, Types } from "mongoose";
import { IUser } from "./user.interface";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from "../../../interfaces/sharedInterface";
import paginationHelper from "../../helpers/paginationHelper";

import UserModel from "./user.model";
import { IUserFilters, USER_SEARCH_FIELDS } from "./user.constant";

const getAllUser = async (
  filters: IUserFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<IUser[]>> => {
  const { searchTerm, ...filtersFields } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: USER_SEARCH_FIELDS.map((field) => ({
        [field]: new RegExp(searchTerm, "i"),
      })),
    });
  }

  if (Object.keys(filtersFields).length) {
    const fieldConditions = Object.entries(filtersFields).map(
      ([key, value]) => ({
        [key]: value,
      }),
    );
    andConditions.push({ $and: fieldConditions });
  }

  const whereCondition = andConditions.length ? { $and: andConditions } : {};

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOption);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await UserModel.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number);

  const total = await UserModel.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateProfile = async (
  userId: string,
  profileData: Partial<IUser>,
): Promise<IUser> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User ID is not valid");
  }

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: userId },
    profileData,
    {
      new: true, // Return updated document
      runValidators: true, // Apply schema validation
    },
  );

  if (!updatedUser) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User not found or update failed!",
    );
  }

  return updatedUser as IUser;
};

const getSingleUserById = async (userId: string): Promise<IUser> => {
  // console.log("userId", userId); // userId 67bf008287820d633d918dc1
  if (!Types.ObjectId.isValid(userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User ID is not valid");
  }

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User not found. Please try another!",
    );
  }

  return user as IUser;
};

const deleteUser = async (userId: string): Promise<IUser> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User ID is not valid");
  }

  const user = await UserModel.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User not found. Please try another!",
    );
  }

  return user as IUser;
};

export const UserServices = {
  updateProfile,
  getAllUser,
  getSingleUserById,
  deleteUser,
};
