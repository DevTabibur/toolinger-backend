import { SortOrder, Types } from "mongoose";
import ApiError from "../../../../errors/ApiError";
import httpStatus from "http-status";
import CommentModel from "./comment.model";
import { CommentFilters, CommentStatus, IComment } from "./comment.interface";
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from "../../../../interfaces/sharedInterface";
import paginationHelper from "../../../helpers/paginationHelper";
import { COMMENT_SEARCH_FIELDS } from "./comment.constant";
import BlogPostModel from "../blog.model";

// Create a new comment
const createComment = async (
  blogId: string,
  commentData: IComment,
  ipAddress?: string,
  userAgent?: string,
): Promise<IComment> => {
  // console.log("commentData", commentData);
  // console.log("ipAddress", ipAddress);
  // console.log("userAgent", userAgent);
  // Verify blog post exists
  const blogPost = await BlogPostModel.findById(blogId);
  if (!blogPost) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog post not found");
  }

  // Check if blog allows comments
  if (!blogPost.allowComments) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Comments are disabled for this blog post",
    );
  }

  // If parent comment exists, verify it
  if (commentData.parentComment) {
    const parentComment = await CommentModel.findById(
      commentData.parentComment,
    );
    if (!parentComment) {
      throw new ApiError(httpStatus.NOT_FOUND, "Parent comment not found");
    }
    // Ensure parent comment belongs to the same blog post
    if (parentComment.blogPost.toString() !== commentData.blogPost.toString()) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Parent comment does not belong to this blog post",
      );
    }
  }

  const comment: IComment = {
    ...commentData,
    blogPost: blogId,
    ipAddress,
    userAgent,
    status: CommentStatus.PENDING, // Default to pending for moderation
  };

  const result = await CommentModel.create(comment);
  return result;
};

// Get all comments with filters and pagination
const getAllComments = async (
  filters: CommentFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<IComment[]>> => {
  const { searchTerm, ...filtersFields } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: COMMENT_SEARCH_FIELDS.map((field) => ({
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
  } else {
    sortCondition.createdAt = "desc"; // Default sort by newest
  }

  const result = await CommentModel.find(whereCondition)
    .populate("author.user", "name email")
    .populate("blogPost", "title slug")
    .populate("parentComment")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number);

  const total = await CommentModel.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get comments by blog post ID
const getCommentsByBlogPost = async (
  blogPostId: string,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<IComment[]>> => {
  if (!Types.ObjectId.isValid(blogPostId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid blog post ID");
  }

  const { page, limit, skip } = paginationHelper(paginationOption);

  // Only get approved comments for public view
  const result = await CommentModel.find({
    blogPost: blogPostId,
    status: CommentStatus.APPROVED,
    parentComment: null, // Only get top-level comments
  })
    .populate("author.user", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit as number);

  // Get replies for each comment
  const commentsWithReplies = await Promise.all(
    result.map(async (comment) => {
      const replies = await CommentModel.find({
        parentComment: comment._id,
        status: CommentStatus.APPROVED,
      })
        .populate("author.user", "name")
        .sort({ createdAt: 1 });

      return {
        ...comment.toObject(),
        replies,
      };
    }),
  );

  const total = await CommentModel.countDocuments({
    blogPost: blogPostId,
    status: CommentStatus.APPROVED,
    parentComment: null,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: commentsWithReplies as any,
  };
};

// Get comment by ID
const getCommentById = async (commentId: string): Promise<IComment> => {
  if (!Types.ObjectId.isValid(commentId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid comment ID");
  }

  const result = await CommentModel.findById(commentId)
    .populate("author.user", "name email")
    .populate("blogPost", "title slug")
    .populate("parentComment");

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
  }

  return result;
};

// Update comment status (approve, reject, spam)
const updateCommentStatus = async (
  commentId: string,
  status: CommentStatus,
): Promise<IComment> => {
  if (!Types.ObjectId.isValid(commentId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid comment ID");
  }

  const result = await CommentModel.findByIdAndUpdate(
    commentId,
    { status },
    { new: true },
  );

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
  }

  return result;
};

// Update comment content
const updateComment = async (
  commentId: string,
  commentInfo: Partial<IComment>,
): Promise<IComment> => {
  if (!Types.ObjectId.isValid(commentId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid comment ID");
  }

  const result = await CommentModel.findOneAndUpdate(
    { _id: commentId },
    {
      ...commentInfo,
      isEdited: true,
      editedAt: new Date(),
    },
    { new: true },
  );

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
  }

  return result;
};

// Delete comment
const deleteComment = async (commentId: string): Promise<IComment> => {
  if (!Types.ObjectId.isValid(commentId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid comment ID");
  }

  // Also delete all replies to this comment
  await CommentModel.deleteMany({ parentComment: commentId });

  const result = await CommentModel.findByIdAndDelete(commentId);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
  }

  return result;
};

// Like a comment
const likeComment = async (commentId: string): Promise<IComment> => {
  if (!Types.ObjectId.isValid(commentId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid comment ID");
  }

  const result = await CommentModel.findByIdAndUpdate(
    commentId,
    { $inc: { likes: 1 } },
    { new: true },
  );

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
  }

  return result;
};

// Dislike a comment
const dislikeComment = async (commentId: string): Promise<IComment> => {
  if (!Types.ObjectId.isValid(commentId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid comment ID");
  }

  const result = await CommentModel.findByIdAndUpdate(
    commentId,
    { $inc: { dislikes: 1 } },
    { new: true },
  );

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
  }

  return result;
};

// Get comment statistics for a blog post
const getCommentStats = async (blogPostId: string) => {
  if (!Types.ObjectId.isValid(blogPostId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid blog post ID");
  }

  const stats = await CommentModel.aggregate([
    { $match: { blogPost: new Types.ObjectId(blogPostId) } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const total = await CommentModel.countDocuments({ blogPost: blogPostId });

  return {
    total,
    byStatus: stats.reduce(
      (acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      },
      {} as Record<string, number>,
    ),
  };
};

export const CommentService = {
  createComment,
  getAllComments,
  getCommentsByBlogPost,
  getCommentById,
  updateCommentStatus,
  updateComment,
  deleteComment,
  likeComment,
  dislikeComment,
  getCommentStats,
};
