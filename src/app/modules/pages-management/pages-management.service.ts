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
  const { slug, PageArticle, PageSEO } = payload;
  console.log("slug", slug);
  console.log("PageArticle", PageArticle);
  console.log("PageSEO", PageSEO);

  if (!slug) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Slug is required.");
  }

  // Find if a page with this slug already exists
  const existingPage = await PageManagementModel.findOne({ slug });

  // Logic 1: User wants to create PageArticle
  if (PageArticle && !PageSEO) {
    // If a page with this slug exists and already has PageArticle, throw error
    if (
      existingPage &&
      existingPage.PageArticle &&
      existingPage.PageArticle.content
    ) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "PageArticle already exists for this slug. Please update it instead of creating.",
      );
    }

    // If page exists but no PageArticle, update it with PageArticle
    if (existingPage) {
      existingPage.PageArticle = PageArticle;
      await existingPage.save();
      return existingPage;
    }

    // If page does not exist, create new with PageArticle
    const result = await PageManagementModel.create({
      slug,
      PageArticle,
    });
    return result;
  }

  // Logic 2: User wants to create PageSEO
  if (PageSEO && !PageArticle) {
    // If a page with this slug exists and already has PageSEO, throw error
    if (
      existingPage &&
      existingPage.PageSEO &&
      existingPage.PageSEO.metaTitle
    ) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "PageSEO already exists for this slug. Please update it instead of creating.",
      );
    }

    // If page exists but no PageSEO, update it with PageSEO
    if (existingPage) {
      existingPage.PageSEO = PageSEO;
      await existingPage.save();
      return existingPage;
    }

    // If page does not exist, create new with PageSEO
    const result = await PageManagementModel.create({
      slug,
      PageSEO,
    });
    return result;
  }

  // If both PageArticle and PageSEO are provided, handle both
  if (PageArticle && PageSEO) {
    // If a page with this slug exists, check for both
    if (existingPage) {
      // If both already exist, throw error
      if (
        existingPage.PageArticle &&
        existingPage.PageArticle.content &&
        existingPage.PageSEO &&
        existingPage.PageSEO.metaTitle
      ) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Both PageArticle and PageSEO already exist for this slug. Please update instead of creating.",
        );
      }
      // If only one exists, update the missing one
      if (!existingPage.PageArticle || !existingPage.PageArticle.content) {
        existingPage.PageArticle = PageArticle;
      }
      if (!existingPage.PageSEO || !existingPage.PageSEO.metaTitle) {
        existingPage.PageSEO = PageSEO;
      }
      await existingPage.save();
      return existingPage;
    }

    // If page does not exist, create new with both
    const result = await PageManagementModel.create({
      slug,
      PageArticle,
      PageSEO,
    });
    return result;
  }

  // If neither PageArticle nor PageSEO is provided, throw error
  throw new ApiError(
    httpStatus.BAD_REQUEST,
    "At least one of PageArticle or PageSEO must be provided.",
  );
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

// Delete only the PageSEO or PageArticle data from the model, not the whole document
const deleteDynamicPagesData = async (
  id: string,
  type: string,
): Promise<IPageManagement | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ID");
  }
  if (!type) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide type");
  }

  let unsetField: string | null = null;

  if (type === "seo") {
    unsetField = "PageSEO";
  } else if (type === "article") {
    unsetField = "PageArticle";
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid type provided");
  }

  const result = await PageManagementModel.findByIdAndUpdate(id, {
    $unset: { [unsetField]: "" },
  });
  return result;
};

const GetAllSEOAndArticle = async (
  type: string,
): Promise<Partial<IPageManagement>[]> => {
  if (!type) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide type");
  }

  let projection: any = {};

  if (type === "seo") {
    projection = { slug: 1, PageSEO: 1, _id: 1 };
  } else if (type === "article") {
    projection = { slug: 1, PageArticle: 1, _id: 1 };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid type provided");
  }

  const result = await PageManagementModel.find({}, projection).lean();
  return result;
};

export const DynamicPagesArticleAndSeoService = {
  createDynamicPagesArticleAndSeo,
  getAllDynamicPagesArticleAndSeo,
  getDynamicPagesArticleAndSeoById,
  getDynamicPagesArticleAndSeoBySlug,
  updateDynamicPagesArticleAndSeo,
  deleteDynamicPagesData,
  GetAllSEOAndArticle,
};
