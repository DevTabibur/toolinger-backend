import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { CategoryService } from "./category.service";
import { sendSuccessResponse } from "../../../../shared/sendSuccessResponse";
import httpStatus from "http-status";
import pick from "../../../../shared/pick";
import { CATEGORY_FILTER_FIELDS } from "./category.constant";
import { IPaginationOption } from "../../../../interfaces/sharedInterface";
import { paginationFields } from "../../../../constants/shared.constant";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Category Created Successfully",
    data: result,
  });
});

const getCategoryDetails = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await CategoryService.getCategoryDetails(categoryId);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Category Details Fetched Successfully",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm", ...CATEGORY_FILTER_FIELDS]);
  const paginationOption: IPaginationOption = pick(req.query, paginationFields);
  const result = await CategoryService.getAllCategories(
    filters,
    paginationOption,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Categories Fetched Successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await CategoryService.deleteCategory(categoryId);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Category Deleted Successfully",
    data: result,
  });
});

const getCategoryBySlug = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  console.log("slug", slug);
  const result = await CategoryService.getCategoryBySlug(slug);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Category Fetched Successfully by Slug",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const updateData = req.body; // Fields to update

  const result = await CategoryService.updateCategory(categoryId, updateData);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Category Updated Successfully",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getCategoryDetails,
  getAllCategories,
  deleteCategory,
  getCategoryBySlug,
  updateCategory,
};
