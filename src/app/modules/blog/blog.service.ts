import { Types } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { IBlogPost } from "./blog.interface";
import BlogPostModel from "./blog.model";
import httpStatus from "http-status";

const createBlogPost = async (
  blogData: IBlogPost,
  blogFeaturedImage: Express.Multer.File[],
): Promise<IBlogPost> => {
  const blog: IBlogPost = {
    title: blogData?.title,
    slug: blogData?.slug,
    content: blogData?.content,
    status: blogData?.status,
    excerpt: blogData?.excerpt,
    author: blogData?.author,
    category: blogData?.category,
    tags: blogData?.tags,
    blogFeaturedImage:
      blogFeaturedImage[0]?.filename?.replace(
        /\.(jpg|jpeg|png|pneg)$/i,
        ".webp",
      ) || "",
    isAllowComments: blogData?.isAllowComments,
    isFeaturedPost: blogData?.isFeaturedPost,
    seoTitle: blogData?.seoTitle,
    seoDescription: blogData?.seoDescription,
    seoKeywords: blogData?.seoKeywords,
    seoImage: blogData?.seoImage,
  };

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

const getAllBlogs = async (): Promise<IBlogPost[]> => {
  const result = await BlogPostModel.find();
  console.log("result", result);
  return result;
};

const deleteBlog = async (blogId: string): Promise<IBlogPost> => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Blog Id");
  }
  const result = await BlogPostModel.findByIdAndDelete(blogId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog Not Found");
  }
  return result;
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
