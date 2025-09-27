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
const router = (0, express_1.Router)();
// ** Create a new blog post
router.post("/", (0, authGuard_1.default)(), fileUploadAndConvertToWebP_1.default, blog_controller_1.BlogController.createBlogPost);
// ** Get a blog post by slug
router.get("/slug/:slug", blog_controller_1.BlogController.getBlogBySlug);
// ** Get blogs by categories except for a specific blog ID
router.post("/categories/:blogId", blog_controller_1.BlogController.getBlogsByCategories);
// ** Get a single blog post by ID
router.get("/:blogId", blog_controller_1.BlogController.BlogDetails);
// ** Get all blog posts
router.get("/", blog_controller_1.BlogController.getAllBlogs);
// ** Delete a blog post by ID
router.delete("/:blogId", blog_controller_1.BlogController.deleteBlog);
// ** Update SEO fields for a blog post
router.patch("/:blogId/seo", blog_controller_1.BlogController.updateBlogSEO);
// ** Update a blog post (full update: title, content, images, etc.)
router.patch("/:blogId", fileUploadAndConvertToWebP_1.default, blog_controller_1.BlogController.updateBlogPost);
// ** Get SEO analytics for a blog post
router.get("/:blogId/seo-analytics", blog_controller_1.BlogController.getBlogSEOAnalytics);
exports.BlogRoute = router;
