import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import {
  IPageManagement,
  IPageManagementFilters,
} from "./pages-management.interface";
import { SortOrder, Types } from "mongoose";
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from "../../../interfaces/sharedInterface";
import paginationHelper from "../../helpers/paginationHelper";
import { DYNAMIC_PAGES_ARTICLE_AND_SEO_SEARCH_FIELDS } from "./pages-management.constant";
import PageManagementModel from "./pages-management.model";

// Create a new dynamic page article with SEO
const createDynamicPagesArticleAndSeo = async (
  payload: IPageManagement,
): Promise<IPageManagement> => {
  const existingSlug = await PageManagementModel.findOne({
    slug: payload.slug,
  });

  if (existingSlug) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "A page with this slug already exists",
    );
  }

  const result = await PageManagementModel.create(payload);
  return result;
};

// Get all dynamic pages articles with SEO
const getAllDynamicPagesArticleAndSeo = async (
  filters?: IPageManagementFilters,
  paginationOptions?: IPaginationOption,
): Promise<IGenericDataWithMeta<IPageManagementFilters[]>> => {
  const result = await PageManagementModel.find();
  return result;
  // const { searchTerm, ...filtersData } = filters;
  // const andConditions = [];

  // if (searchTerm) {
  //   andConditions.push({
  //     $or: DYNAMIC_PAGES_ARTICLE_AND_SEO_SEARCH_FIELDS.map((field) => ({
  //       [field]: {
  //         $regex: searchTerm,
  //         $options: "i",
  //       },
  //     })),
  //   });
  // }

  // if (Object.keys(filtersData).length) {
  //   andConditions.push({
  //     $and: Object.entries(filtersData).map(([field, value]) => ({
  //       [field]: value,
  //     })),
  //   });
  // }

  // const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
  // const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(paginationOptions);

  // const sortConditions: { [key: string]: SortOrder } = {};
  // if (sortBy && sortOrder) {
  //   sortConditions[sortBy] = sortOrder;
  // } else {
  //   sortConditions["createdAt"] = "desc";
  // }

  // const result = await DynamicPagesArticleAndSeoModel.find(whereConditions)
  //   .sort(sortConditions)
  //   .skip(skip)
  //   .limit(limit);

  // const total = await DynamicPagesArticleAndSeoModel.countDocuments(whereConditions);

  // return {
  //   meta: { page, limit, total },
  //   data: result,
  // };
};

// Get dynamic page article by ID
const getDynamicPagesArticleAndSeoById = async (
  id: string,
): Promise<IPageManagement | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ID");
  }
  const result = await PageManagementModel.findById(id);
  return result;
};

// Get dynamic page article by slug
const getDynamicPagesArticleAndSeoBySlug = async (
  slug: string,
): Promise<IPageManagement | null> => {
  const result = await PageManagementModel.findOne({
    slug,
  });
  return result;
};

// Update dynamic page article by ID
const updateDynamicPagesArticleAndSeo = async (
  id: string,
  payload: Partial<IPageManagement>,
): Promise<IPageManagement | null> => {
  // Prevent updating the slug field
  if ("slug" in payload) {
    delete (payload as any).slug;
  }

  const result = await PageManagementModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Delete dynamic page article by ID
const deleteDynamicPagesArticleAndSeo = async (
  id: string,
): Promise<IPageManagement | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ID");
  }

  const result = await PageManagementModel.findByIdAndDelete(id);
  return result;
};

export const DynamicPagesArticleAndSeoService = {
  createDynamicPagesArticleAndSeo,
  getAllDynamicPagesArticleAndSeo,
  getDynamicPagesArticleAndSeoById,
  getDynamicPagesArticleAndSeoBySlug,
  updateDynamicPagesArticleAndSeo,
  deleteDynamicPagesArticleAndSeo,
};
