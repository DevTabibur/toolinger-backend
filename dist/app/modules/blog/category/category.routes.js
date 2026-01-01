"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoute = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const authGuard_1 = __importDefault(require("../../../middlewares/authGuard"));
const user_constant_1 = require("../../user/user.constant");
const router = (0, express_1.Router)();
// ** Create a new category
router.post("/", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), category_controller_1.CategoryController.createCategory);
// ** Get all categories
router.get("/", category_controller_1.CategoryController.getAllCategories);
// ** Get a category by slug
// router.get("/slug/:slug", CategoryController.getCategoryBySlug);
// ** Get a single category by ID
router.get("/:categoryId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), category_controller_1.CategoryController.getCategoryDetails);
// ** Delete a category by ID
router.delete("/:categoryId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), category_controller_1.CategoryController.deleteCategory);
// ** Update a category (full update: name, description, etc.)
router.patch("/:categoryId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), category_controller_1.CategoryController.updateCategory);
exports.CategoryRoute = router;
