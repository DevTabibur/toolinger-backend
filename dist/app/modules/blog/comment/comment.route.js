"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoute = void 0;
const express_1 = require("express");
const comment_controller_1 = require("./comment.controller");
const authGuard_1 = __importDefault(require("../../../middlewares/authGuard"));
const user_constant_1 = require("../../user/user.constant");
const router = (0, express_1.Router)();
/**
 * @api {post} /comments Create a new comment
 * @apiName CreateComment
 * @apiGroup Comment
 * @apiDescription Create a new comment on a blog post (guest or authenticated user)
 */
router.post("/:blogId", comment_controller_1.CommentController.createComment);
/**
 * @api {get} /comments Get all comments (Admin only)
 * @apiName GetAllComments
 * @apiGroup Comment
 * @apiDescription Get all comments with filters and pagination (admin panel)
 */
router.get("/", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN, user_constant_1.USER_ROLE_ENUM.EDITOR), comment_controller_1.CommentController.getAllComments);
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
router.get("/stats/:blogPostId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN, user_constant_1.USER_ROLE_ENUM.EDITOR), comment_controller_1.CommentController.getCommentStats);
/**
 * @api {get} /comments/:commentId Get comment by ID
 * @apiName GetCommentById
 * @apiGroup Comment
 * @apiDescription Get a single comment by ID
 */
router.get("/:commentId", (0, authGuard_1.default)(), comment_controller_1.CommentController.getCommentById);
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
router.patch("/:commentId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN, user_constant_1.USER_ROLE_ENUM.EDITOR), comment_controller_1.CommentController.updateComment);
/**
 * @api {delete} /comments/:commentId Delete comment
 * @apiName DeleteComment
 * @apiGroup Comment
 * @apiDescription Delete a comment and all its replies
 */
router.delete("/:commentId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN, user_constant_1.USER_ROLE_ENUM.EDITOR), comment_controller_1.CommentController.deleteComment);
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
exports.CommentRoute = router;
