import { Router } from "express";
import { BlogController } from "./blog.controller";
import uploadMiddleware from "../../middlewares/fileUploadAndConvertToWebP";
import authGuard from "../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "../user/user.constant";

const router = Router();

// ** Create a new blog post
router.post(
  "/",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.EDITOR, USER_ROLE_ENUM.GUEST),
  uploadMiddleware,
  BlogController.createBlogPost,
);

// ** Delete a blog post by ID
router.delete(
  "/:blogId",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.EDITOR, USER_ROLE_ENUM.GUEST),
  BlogController.deleteBlog,
);

// ** Get a single blog post by ID
router.get("/:blogId", BlogController.BlogDetails);

// ** Get a blog post by slug
router.get("/slug/:slug", BlogController.getBlogBySlug);

// ** Get blogs by categories except for a specific blog ID
router.post("/categories/:blogId", BlogController.getBlogsByCategories);

// ** Get all blog posts
router.get("/", BlogController.getAllBlogs);

// ** Update SEO fields for a blog post
router.patch("/:blogId/seo", BlogController.updateBlogSEO);

// ** Update a blog post (full update: title, content, images, etc.)
router.patch("/:blogId", uploadMiddleware, BlogController.updateBlogPost);

// ** Get SEO analytics for a blog post
router.get("/:blogId/seo-analytics", BlogController.getBlogSEOAnalytics);

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

export const BlogRoute = router;
