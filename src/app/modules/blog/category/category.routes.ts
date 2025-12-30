import { Router } from "express";
import { CategoryController } from "./category.controller";
import uploadMiddleware from "../../../middlewares/fileUploadAndConvertToWebP";
import authGuard from "../../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "../../user/user.constant";

const router = Router();

// ** Create a new category
router.post(
  "/",
  authGuard(USER_ROLE_ENUM.ADMIN),
  CategoryController.createCategory,
);

// ** Get all categories
router.get("/", CategoryController.getAllCategories);

// ** Get a category by slug
// router.get("/slug/:slug", CategoryController.getCategoryBySlug);

// ** Get a single category by ID
router.get(
  "/:categoryId",
  authGuard(USER_ROLE_ENUM.ADMIN),
  CategoryController.getCategoryDetails,
);

// ** Delete a category by ID
router.delete(
  "/:categoryId",
  authGuard(USER_ROLE_ENUM.ADMIN),
  CategoryController.deleteCategory,
);

// ** Update a category (full update: name, description, etc.)
router.patch(
  "/:categoryId",
  authGuard(USER_ROLE_ENUM.ADMIN),
  CategoryController.updateCategory,
);

export const CategoryRoute = router;
