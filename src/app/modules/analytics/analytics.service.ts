import BlogPostModel from "../blog/blog.model";
import CategoryModel from "../blog/category/category.model";
import CommentModel from "../blog/comment/comment.model";
import TagModel from "../blog/tag/tag.model";
import UserModel from "../user/user.model";
import { IDashboardAnalytics } from "./analytics.interface";

const getDashboardAnalytics = async (): Promise<IDashboardAnalytics> => {
  const totalBlogs = await BlogPostModel.countDocuments();
  const totalUsers = await UserModel.countDocuments();
  const totalComments = await CommentModel.countDocuments();
  const totalCategories = await CategoryModel.countDocuments();
  const totalTags = await TagModel.countDocuments();

  const totalViewsResult = await BlogPostModel.aggregate([
    {
      $group: {
        _id: null,
        totalViews: { $sum: "$analytics.views" },
      },
    },
  ]);

  const totalViews =
    totalViewsResult.length > 0 ? totalViewsResult[0].totalViews : 0;

  const monthlyBlogs = await BlogPostModel.aggregate([
    {
      $match: { createdAt: { $ne: null } },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $limit: 12 },
  ]);

  const monthlyUsers = await UserModel.aggregate([
    {
      $match: { createdAt: { $ne: null } },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $limit: 12 },
  ]);

  return {
    totalBlogs,
    totalUsers,
    totalComments,
    totalCategories,
    totalTags,
    totalViews,
    monthlyBlogs,
    monthlyUsers,
  };
};

export const AnalyticsService = { getDashboardAnalytics };
