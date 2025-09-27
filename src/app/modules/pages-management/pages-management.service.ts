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

// Create or update a dynamic page article with SEO
const createDynamicPagesArticleAndSeo = async (
  payload: any,
  ogImageUrl: Express.Multer.File[],
  twitterImageUrl: Express.Multer.File[],
): Promise<any> => {
  const { slug, title, type } = payload;

  const missingFields = [];
  if (!slug) missingFields.push("slug");
  if (!title) missingFields.push("title");
  if (!type) missingFields.push("type");
  if (missingFields.length > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Missing required field${missingFields.length > 1 ? "s" : ""}: ${missingFields.join(", ")}.`,
    );
  }

  // Check if a page with this slug already exists
  const existingPage = await PageManagementModel.findOne({ slug, title, type });
  // console.log("existing page", existingPage)

  if (existingPage) {
    if (payload.pageContent) {
      existingPage.pageContent = payload.pageContent;
    }
    if (payload.metaTitle) {
      //===================================Basic SEO
      existingPage.metaTitle = payload.metaTitle;
      existingPage.metaDescription = payload.metaDescription;
      existingPage.keywords = payload.keywords;
      existingPage.canonicalUrl = payload.canonicalUrl;
      existingPage.noindex = payload.noindex;

      //=============================Open Graph
      existingPage.ogTitle = payload.ogTitle;
      existingPage.ogDescription = payload.ogDescription;
      existingPage.ogImageUrl =
        ogImageUrl && ogImageUrl[0]?.filename
          ? ogImageUrl[0].filename.replace(/\.(jpg|jpeg|png|pneg)$/i, ".webp")
          : "";
      existingPage.ogType = payload.ogType;
      existingPage.ogSiteName = payload.ogSiteName;
      existingPage.ogLocale = payload.ogLocale;

      //=============================Twitter Card
      existingPage.twitterCard = payload.twitterCard;
      existingPage.twitterSite = payload.twitterSite;
      existingPage.twitterCreator = payload.twitterCreator;
      existingPage.twitterImageUrl =
        twitterImageUrl && twitterImageUrl[0]?.filename
          ? twitterImageUrl[0].filename.replace(
              /\.(jpg|jpeg|png|pneg)$/i,
              ".webp",
            )
          : "";

      //=============================Hreflang / Alternates
      ((existingPage.alternates = payload.keywords),
        // =============================Sitemap helpers
        (existingPage.changefreq = payload.changefreq));
      existingPage.priority = payload.priority;

      // =============================Schema
      existingPage.schemas = payload.schemas;
    }
    await existingPage.save();
    return existingPage;
  }

  // If page does not exist, create new

  if (!existingPage) {
    if (ogImageUrl && ogImageUrl[0]?.filename) {
      payload.ogImageUrl = ogImageUrl[0].filename.replace(
        /\.(jpg|jpeg|png|pneg)$/i,
        ".webp",
      );
    }
    if (twitterImageUrl && twitterImageUrl[0]?.filename) {
      payload.twitterImageUrl = twitterImageUrl[0].filename.replace(
        /\.(jpg|jpeg|png|pneg)$/i,
        ".webp",
      );
    }

    const result = await PageManagementModel.create(payload);
    return result;
  }
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
  if (!slug) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Slug is required");
  }
  const result = await PageManagementModel.findOne({
    slug: `/${slug}`,
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
