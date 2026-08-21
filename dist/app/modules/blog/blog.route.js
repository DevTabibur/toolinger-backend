"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoute = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const fileUploadAndConvertToWebP_1 = __importDefault(require("../../middlewares/fileUploadAndConvertToWebP"));
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
// ** Create a new blog post
router.post("/", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN, user_constant_1.USER_ROLE_ENUM.EDITOR, user_constant_1.USER_ROLE_ENUM.GUEST), fileUploadAndConvertToWebP_1.default, blog_controller_1.BlogController.createBlogPost);
// ** Delete a blog post by ID
router.delete("/:blogId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN, user_constant_1.USER_ROLE_ENUM.EDITOR, user_constant_1.USER_ROLE_ENUM.GUEST), blog_controller_1.BlogController.deleteBlog);
// ** Get a single blog post by ID
router.get("/:blogId", blog_controller_1.BlogController.BlogDetails);
// ** Get a blog post by slug
router.get("/slug/:slug", blog_controller_1.BlogController.getBlogBySlug);
// ** Get blogs by categories except for a specific blog ID
router.post("/categories/:blogId", blog_controller_1.BlogController.getBlogsByCategories);
// ** Get all blog posts
router.get("/", blog_controller_1.BlogController.getAllBlogs);
// ** Update SEO fields for a blog post
router.patch("/:blogId/seo", blog_controller_1.BlogController.updateBlogSEO);
// ** Update a blog post (full update: title, content, images, etc.)
router.patch("/:blogId", fileUploadAndConvertToWebP_1.default, blog_controller_1.BlogController.updateBlogPost);
// ** Get SEO analytics for a blog post
router.get("/:blogId/seo-analytics", blog_controller_1.BlogController.getBlogSEOAnalytics);
// blog status
// router.patch("/blogs/:blogId/status", authGuard(), BlogController.updateBlogStatus);
// get blog by authorId
// router.get("/blogs/author/:authorId")
//Blog Revision / Versioning
// router.get("/blogs/:id/revisions")
// router.post("/blogs/:id/restore/:revisionId")
// guest post system (default pending=review)
// Admin Approval / Reject
// router.patch("/admin/guest/blogs/:id/approve")
// router.patch("/admin/guest/blogs/:id/reject")
// Guest Author Profile
// router.get("/guest/authors/:slug")   // toolinger.com/guest/john-doe
// Blog comment API
// Blog Share / Analytics
//Share Tracking
// router.post("/blogs/:id/share");
// View Count / Read Time
// router.post("/blogs/:id/view")
// Category / Tag System (Proper way)
// router.get("/categories/:slug/blogs")
// router.post("/tags")
// router.get("/tags/:slug/blogs")
exports.BlogRoute = router;
