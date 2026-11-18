import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BlogService } from "./blog.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";
import { IPaginationOption } from "../../../interfaces/sharedInterface";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/shared.constant";
import { BLOG_POST_FILTER_FIELDS } from "./blog.constant";

const createBlogPost = catchAsync(async (req: Request, res: Response) => {
  // console.log("create post.", req.body);
  // const files = req.files as
  //   | { [fieldname: string]: Express.Multer.File[] }
  //   | Express.Multer.File[]
  //   | undefined;

  // let blogFeaturedImage;
  // let seoImage;

  // if (Array.isArray(files)) {
  //   blogFeaturedImage = files;
  //   seoImage = files;
  // } else if (
  //   (files && typeof files === "object" && "blogFeaturedImage" in files) ||
  //   (files && typeof files === "object" && "seoImage" in files)
  // ) {
  //   blogFeaturedImage = (
  //     files as { [fieldname: string]: Express.Multer.File[] }
  //   ).blogFeaturedImage;
  //   seoImage = (files as { [fieldname: string]: Express.Multer.File[] })
  //     .seoImage;
  // }

  const result = await BlogService.createBlogPost(
    req.body,
    // blogFeaturedImage ?? [],
    // seoImage ?? [],
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog Created Successfully",
    data: result,
  });
});

const BlogDetails = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await BlogService.BlogDetails(blogId);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog Details Fetched Successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm", ...BLOG_POST_FILTER_FIELDS]);
  const paginationOption: IPaginationOption = pick(req.query, paginationFields);
  const result = await BlogService.getAllBlogs(filters, paginationOption);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blogs Fetched Successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  console.log(blogId);
  const result = await BlogService.deleteBlog(blogId);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog Deleted Successfully",
    data: result,
  });
});

const updateBlogSEO = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const seoData = req.body; // SEO fields to update
  const result = await BlogService.updateBlogSEO(blogId, seoData);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "SEO Fields Updated Successfully",
    data: result,
  });
});

const getBlogSEOAnalytics = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await BlogService.getBlogSEOAnalytics(blogId);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "SEO Analytics Fetched Successfully",
    data: result,
  });
});

const getBlogBySlug = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await BlogService.getBlogBySlug(slug);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog Fetched Successfully by Slug",
    data: result,
  });
});

const getBlogsByCategories = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const { categories } = req.body; // Array of categories to filter by

  if (!Array.isArray(categories) || categories.length === 0) {
    sendSuccessResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      message: "Categories must be an array of strings",
    });
  }

  const blogs = await BlogService.getBlogsByCategories(blogId, categories);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blogs Fetched Successfully by Categories",
    data: blogs,
  });
});

const updateBlogPost = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const updateData = req.body; // Fields to update

  const result = await BlogService.updateBlogPost(blogId, updateData);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog Post Updated Successfully",
    data: result,
  });
});

export const BlogController = {
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
