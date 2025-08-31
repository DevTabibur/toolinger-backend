"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoute = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const fileUploadAndConvertToWebP_1 = __importDefault(require("../../middlewares/fileUploadAndConvertToWebP"));
const router = (0, express_1.Router)();
// ** Create a new category
router.post("/", category_controller_1.CategoryController.createCategory);
// ** Get all categories
router.get("/", category_controller_1.CategoryController.getAllCategories);
// ** Get a category by slug
router.get("/slug/:slug", category_controller_1.CategoryController.getCategoryBySlug);
// ** Get a single category by ID
router.get("/:categoryId", category_controller_1.CategoryController.getCategoryDetails);
// ** Delete a category by ID
router.delete("/:categoryId", category_controller_1.CategoryController.deleteCategory);
// ** Update a category (full update: name, description, images, etc.)
router.patch("/:categoryId", fileUploadAndConvertToWebP_1.default, category_controller_1.CategoryController.updateCategory);
exports.CategoryRoute = router;
