import { Types } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { ICategory } from "./category.interface";
import CategoryModel from "./category.model";
import httpStatus from "http-status";

const createCategory = async (categoryData: ICategory): Promise<ICategory> => {
  const result = await CategoryModel.create(categoryData);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Category Creation Failed");
  }
  return result;
};

const getCategoryDetails = async (categoryId: string): Promise<ICategory> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Category Id");
  }
  const result = await CategoryModel.findById(categoryId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  }
  return result;
};

const getAllCategories = async (): Promise<ICategory[]> => {
  const result = await CategoryModel.find();
  return result;
};

const deleteCategory = async (categoryId: string): Promise<ICategory> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Category Id");
  }
  const result = await CategoryModel.findByIdAndDelete(categoryId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  }
  return result;
};

const getCategoryBySlug = async (slug: string): Promise<ICategory> => {
  const result = await CategoryModel.findOne({ slug });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  }
  return result;
};

const updateCategory = async (
  categoryId: string,
  updateData: Partial<ICategory>,
): Promise<ICategory> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Category Id");
  }

  const result = await CategoryModel.findByIdAndUpdate(
    categoryId,
    { $set: updateData },
    { new: true, runValidators: true },
  );

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  }

  return result;
};

export const CategoryService = {
  createCategory,
  getCategoryDetails,
  getAllCategories,
  deleteCategory,
  getCategoryBySlug,
  updateCategory,
};
