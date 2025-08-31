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
import { PAGE_MANAGEMENT_SEO_SEARCH__FIELDS } from "./pages-management.constant";
import PageManagementModel from "./pages-management.model";
import paginationHelper from "../../helpers/paginationHelper";

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
  filters: IPageManagementFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<IPageManagement[]>> => {
  const { searchTerm, ...filtersFields } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: PAGE_MANAGEMENT_SEO_SEARCH__FIELDS.map((field) => ({
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

  const result = await PageManagementModel.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number);

  const total = await PageManagementModel.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
