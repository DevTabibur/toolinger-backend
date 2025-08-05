"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoute = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
// create blog category
router.post("/", category_controller_1.categoryController.createCategory);
// get all category
router.get("/", category_controller_1.categoryController.getAllCategory);
// ** get category by userId
router.get("/:userId", category_controller_1.categoryController.getSingleCategory);
exports.CategoryRoute = router;
