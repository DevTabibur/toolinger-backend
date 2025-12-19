import { SortOrder, Types } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { IBlogPost } from "./blog.interface";
import BlogPostModel from "./blog.model";
import httpStatus from "http-status";
import { generateSlug, generateExcerpt } from "./blog.utils";
import TrashModel from "../trash/trash.model";
import { BLOG_POST_SEARCH__FIELDS, BlogPostFilters } from "./blog.constant";
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from "../../../interfaces/sharedInterface";
import paginationHelper from "../../helpers/paginationHelper";

const createBlogPost = async (
  blogData: IBlogPost,
  blogFeaturedImage: Express.Multer.File[],
  seoImage: Express.Multer.File[],
): Promise<IBlogPost> => {
  // console.log("blogData", blogData);
  const slug = generateSlug(blogData?.title);
  const excerpt = blogData?.excerpt || generateExcerpt(blogData?.content);
  const blog: IBlogPost = {
    title: blogData?.title,
    slug: slug,
    content: blogData?.content,
    status: blogData?.status,
    excerpt: excerpt,
    author: blogData?.author,
    categories: blogData?.categories,
    tags: blogData?.tags,
    blogFeaturedImage:
      blogFeaturedImage[0]?.filename?.replace(
        /\.(jpg|jpeg|png|pneg)$/i,
        ".webp",
      ) || "",
    allowComments: blogData?.allowComments,
    isFeatured: blogData?.isFeatured,
    isSponsored: blogData?.isSponsored,
    sponsorName: blogData?.sponsorName,
    sponsorUrl: blogData?.sponsorUrl,
    // seo
    seo: {
      title: blogData?.seo?.title,
      description: blogData?.seo?.description,
      keywords: blogData?.seo?.keywords,
      seoImage:
        seoImage[0]?.filename?.replace(/(jpg|jpeg|png|pneg)$/i, ".webp") || "",
    },
    // Analytics
    analytics: {
      views: blogData?.analytics?.views,
      uniqueViews: blogData?.analytics?.uniqueViews,
      readTime: blogData?.analytics?.readTime,
      shares: blogData?.analytics?.shares,
      lastViewedAt: blogData?.analytics?.lastViewedAt,
    },
  };

  // console.log("blog ==>", blog);

  const result = await BlogPostModel.create(blog);
  return result;
};

const BlogDetails = async (blogId: string): Promise<IBlogPost> => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Blog Id");
  }
  const result = await BlogPostModel.findById(blogId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog Not Found");
  }
  return result;
};

//
const getAllBlogs = async (
  filters: BlogPostFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<IBlogPost[]>> => {
  const { searchTerm, ...filtersFields } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: BLOG_POST_SEARCH__FIELDS.map((field) => ({
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

  const result = await BlogPostModel.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number);

  const total = await BlogPostModel.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteBlog = async (blogId: string): Promise<IBlogPost> => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Blog Id");
  }
  const session = await BlogPostModel.startSession();
  session.startTransaction();
  try {
    // delete blog post
    const result =
      await BlogPostModel.findByIdAndDelete(blogId).session(session);

    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
    }

    // Create trash record
    const trashRecord = new TrashModel({
      model: "BlogPost",
      data: result,
      deletedAt: new Date(),
      expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiration
    });

    // Save the trash record (this is done in parallel)
    const trashSavePromise = trashRecord.save();

    // Commit the transaction
    await Promise.all([trashSavePromise]);

    // Commit the session
    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateBlogSEO = async (
  blogId: string,
  seoData: Partial<IBlogPost>,
): Promise<IBlogPost> => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Blog Id");
  }
  const result = await BlogPostModel.findByIdAndUpdate(
    blogId,
    { $set: seoData },
    { new: true },
  );
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog Not Found");
  }
  return result;
};

const getBlogSEOAnalytics = async (blogId: string): Promise<any> => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Blog Id");
  }
  const blog = await BlogPostModel.findById(blogId);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog Not Found");
  }

  // Mock SEO analytics (replace with actual analytics integration)
  const seoAnalytics = {
    pageViews: 1000, // Example: Fetch from Google Analytics
    timeOnPage: "3:45", // Example: Fetch from Google Analytics
    bounceRate: "45%", // Example: Fetch from Google Analytics
    keywordRankings: ["SEO tips", "Blog optimization"], // Example: Fetch from Ahrefs/SEMrush
    backlinks: 25, // Example: Fetch from Ahrefs/SEMrush
  };

  return seoAnalytics;
};

const getBlogBySlug = async (slug: string): Promise<IBlogPost> => {
  const result = await BlogPostModel.findOne({ slug });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog Not Found");
  }
  return result;
};

const getBlogsByCategories = async (
  blogId: string,
  categories: string[],
): Promise<IBlogPost[]> => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Blog Id");
  }

  const blogs = await BlogPostModel.find({
    _id: { $ne: blogId },
    categories: { $in: categories },
  });

  return blogs;
};

const updateBlogPost = async (
  blogId: string,
  updateData: Partial<IBlogPost>,
): Promise<IBlogPost> => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Blog Id");
  }

  const result = await BlogPostModel.findByIdAndUpdate(
    blogId,
    { $set: updateData },
    { new: true, runValidators: true },
  );

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog Not Found");
  }

  return result;
};

export const BlogService = {
  createBlogPost,
  BlogDetails,
  getAllBlogs,
  deleteBlog,
  updateBlogSEO,
  getBlogSEOAnalytics,
  getBlogBySlug,
  getBlogsByCategories,
  updateBlogPost,
};
