import { Router } from "express";
import { BlogController } from "./blog.controller";
import uploadMiddleware from "../../middlewares/fileUploadAndConvertToWebP";

const router = Router();

// ** Create a new blog post
router.post(
  "/",
  // uploadMiddleware,
  BlogController.createBlogPost,
);

// ** Get a blog post by slug
router.get("/slug/:slug", BlogController.getBlogBySlug);

// ** Get blogs by categories except for a specific blog ID
router.post("/categories/:blogId", BlogController.getBlogsByCategories);

// ** Get a single blog post by ID
router.get("/:blogId", BlogController.BlogDetails);

// ** Get all blog posts
router.get("/", BlogController.getAllBlogs);

// ** Delete a blog post by ID
router.delete("/:blogId", BlogController.deleteBlog);

// ** Update SEO fields for a blog post
router.patch("/:blogId/seo", BlogController.updateBlogSEO);

// ** Update a blog post (full update: title, content, images, etc.)
router.patch("/:blogId", uploadMiddleware, BlogController.updateBlogPost);

// ** Get SEO analytics for a blog post
router.get("/:blogId/seo-analytics", BlogController.getBlogSEOAnalytics);

export const BlogRoute = router;
