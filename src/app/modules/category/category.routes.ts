import { Router } from "express";
import { CategoryController } from "./category.controller";
import uploadMiddleware from "../../middlewares/fileUploadAndConvertToWebP";

const router = Router();

// ** Create a new category
router.post("/", CategoryController.createCategory);

// ** Get all categories
router.get("/", CategoryController.getAllCategories);

// ** Get a category by slug
router.get("/slug/:slug", CategoryController.getCategoryBySlug);

// ** Get a single category by ID
router.get("/:categoryId", CategoryController.getCategoryDetails);

// ** Delete a category by ID
router.delete("/:categoryId", CategoryController.deleteCategory);

// ** Update a category (full update: name, description, images, etc.)
router.patch(
  "/:categoryId",
  uploadMiddleware,
  CategoryController.updateCategory,
);

export const CategoryRoute = router;
