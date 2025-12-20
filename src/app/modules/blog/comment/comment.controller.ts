import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { sendSuccessResponse } from "../../../../shared/sendSuccessResponse";
import httpStatus from "http-status";
import { CommentService } from "./comment.service";
import pick from "../../../../shared/pick";
import { paginationFields } from "../../../../constants/shared.constant";
import { IPaginationOption } from "../../../../interfaces/sharedInterface";
import { COMMENT_FILTER_FIELDS } from "./comment.constant";
import { CommentStatus } from "./comment.interface";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const ipAddress = req.ip || req.socket.remoteAddress;
  const userAgent = req.get("user-agent");
  const { blogId } = req.params;

  const result = await CommentService.createComment(
    blogId,
    req.body,
    ipAddress,
    userAgent,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Comment submitted successfully and is pending approval",
    data: result,
  });
});

const getAllComments = catchAsync(async (req: Request, res: Response) => {
  console.log("req.query", req.query);
  const filters = pick(req.query, ["searchTerm", ...COMMENT_FILTER_FIELDS]);
  const paginationOption: IPaginationOption = pick(req.query, paginationFields);

  const result = await CommentService.getAllComments(filters, paginationOption);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Comments fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getCommentsByBlogPost = catchAsync(
  async (req: Request, res: Response) => {
    const { blogPostId } = req.params;
    console.log("blogPostId", blogPostId);
    const paginationOption: IPaginationOption = pick(
      req.query,
      paginationFields,
    );

    const result = await CommentService.getCommentsByBlogPost(
      blogPostId,
      paginationOption,
    );

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Comments fetched successfully",
      data: result.data,
      meta: result.meta,
    });
  },
);

const getCommentById = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const result = await CommentService.getCommentById(commentId);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Comment fetched successfully",
    data: result,
  });
});

const updateCommentStatus = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { status } = req.body;

  const result = await CommentService.updateCommentStatus(
    commentId,
    status as CommentStatus,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Comment status updated successfully",
    data: result,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const commentInfo = req.body;

  const result = await CommentService.updateComment(commentId, commentInfo);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Comment updated successfully",
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const result = await CommentService.deleteComment(commentId);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Comment deleted successfully",
    data: result,
  });
});

const likeComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const result = await CommentService.likeComment(commentId);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Comment liked successfully",
    data: result,
  });
});

const dislikeComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const result = await CommentService.dislikeComment(commentId);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Comment disliked successfully",
    data: result,
  });
});

const getCommentStats = catchAsync(async (req: Request, res: Response) => {
  const { blogPostId } = req.params;
  const result = await CommentService.getCommentStats(blogPostId);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Comment statistics fetched successfully",
    data: result,
  });
});

export const CommentController = {
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
