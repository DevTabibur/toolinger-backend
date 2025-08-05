import { SortOrder, Types } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { ICategory } from "./category.interface";
import CategoryModel from "./category.model";
import httpStatus from "http-status";
import paginationHelper from "../../helpers/paginationHelper";
import { IPaginationOption } from "../../../interfaces/sharedInterface";
import { CATEGORY_SEARCH__FIELDS, ICategoryFilters } from "./category.constant";
import UserModel from "../user/user.model";

const getAllCategory = async (
  filters: ICategoryFilters,
  paginationOption: IPaginationOption,
) => {
  const { searchTerm, ...filtersFields } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: CATEGORY_SEARCH__FIELDS.map((field) => ({
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

  const result = await CategoryModel.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number);

  const total = await CategoryModel.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const createCategory = async (
  category: Partial<ICategory>,
): Promise<ICategory> => {
  const {
    userId,
    manufacture,
    carModel,
    year,
    skills,
    experience,
    ...otherData
  } = category;

  // Validate userId
  if (!userId || !Types.ObjectId.isValid(userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User ID is required");
  }

  // Check if the user exists
  const isUserExist = await UserModel.findById(userId, { _id: 1 }).lean();
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // Check for existing category with the same userId, manufacture, carModel, and year
  const existingCategory = await CategoryModel.findOne({
    userId: new Types.ObjectId(userId),
    manufacture,
    carModel,
    year,
    skills,
    experience,
  });

  if (existingCategory) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Category with the same details already exists for this user",
    );
  }

  // Prepare the category data
  const categoryData = {
    userId: new Types.ObjectId(userId),
    manufacture,
    carModel,
    year,
    skills,
    experience,
    ...otherData,
  };

  // Create the new category
  const result = await CategoryModel.create(categoryData);

  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create category",
    );
  }

  return result;
};

const getSingleCategory = async (userId: string): Promise<ICategory[]> => {
  if (!userId || !Types.ObjectId.isValid(userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid User ID");
  }

  const result = await CategoryModel.find({
    userId: new Types.ObjectId(userId),
  }).lean();
  if (!result || result.length === 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "No category data found for this user",
    );
  }

  return result as ICategory[];
};

export const categoryService = {
  getAllCategory,
  createCategory,
  getSingleCategory,
};
