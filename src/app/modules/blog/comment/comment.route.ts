import { Router } from "express";
import { CommentController } from "./comment.controller";
import authGuard from "../../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "../../user/user.constant";

const router = Router();

/**
 * @api {post} /comments Create a new comment
 * @apiName CreateComment
 * @apiGroup Comment
 * @apiDescription Create a new comment on a blog post (guest or authenticated user)
 */
router.post("/:blogId", CommentController.createComment);

/**
 * @api {get} /comments Get all comments (Admin only)
 * @apiName GetAllComments
 * @apiGroup Comment
 * @apiDescription Get all comments with filters and pagination (admin panel)
 */
router.get(
  "/",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.EDITOR),
  CommentController.getAllComments,
);

// /**
//  * @api {get} /comments/blog/:blogPostId Get comments by blog post
//  * @apiName GetCommentsByBlogPost
//  * @apiGroup Comment
//  * @apiDescription Get all approved comments for a specific blog post (public)
//  */
// router.get("/:blogPostId", CommentController.getCommentsByBlogPost);

/**
 * @api {get} /comments/stats/:blogPostId Get comment statistics
 * @apiName GetCommentStats
 * @apiGroup Comment
 * @apiDescription Get comment statistics for a blog post
 */
router.get(
  "/stats/:blogPostId",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.EDITOR),
  CommentController.getCommentStats,
);

/**
 * @api {get} /comments/:commentId Get comment by ID
 * @apiName GetCommentById
 * @apiGroup Comment
 * @apiDescription Get a single comment by ID
 */
router.get("/:commentId", authGuard(), CommentController.getCommentById);

// /**
//  * @api {patch} /comments/:commentId/status Update comment status
//  * @apiName UpdateCommentStatus
//  * @apiGroup Comment
//  * @apiDescription Approve, reject, or mark comment as spam (admin/editor only)
//  */
// router.patch(
//   "/:commentId/status",
//   authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.EDITOR),
//   CommentController.updateCommentStatus
// );

/**
 * @api {patch} /comments/:commentId Update comment content
 * @apiName UpdateComment
 * @apiGroup Comment
 * @apiDescription Update comment content (author or admin only)
 */
router.patch(
  "/:commentId",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.EDITOR),
  CommentController.updateComment,
);

/**
 * @api {delete} /comments/:commentId Delete comment
 * @apiName DeleteComment
 * @apiGroup Comment
 * @apiDescription Delete a comment and all its replies
 */
router.delete(
  "/:commentId",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.EDITOR),
  CommentController.deleteComment,
);

// /**
//  * @api {post} /comments/:commentId/like Like a comment
//  * @apiName LikeComment
//  * @apiGroup Comment
//  * @apiDescription Increment like count for a comment
//  */
// router.post("/:commentId/like", CommentController.likeComment);

// /**
//  * @api {post} /comments/:commentId/dislike Dislike a comment
//  * @apiName DislikeComment
//  * @apiGroup Comment
//  * @apiDescription Increment dislike count for a comment
//  */
// router.post("/:commentId/dislike", CommentController.dislikeComment);

export const CommentRoute = router;
