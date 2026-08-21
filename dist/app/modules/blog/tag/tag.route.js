"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRoute = void 0;
const express_1 = require("express");
const authGuard_1 = __importDefault(require("../../../middlewares/authGuard"));
const user_constant_1 = require("../../user/user.constant");
const tag_controller_1 = require("./tag.controller");
const router = (0, express_1.Router)();
// ** Create a new tag
router.post("/", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN, user_constant_1.USER_ROLE_ENUM.GUEST, user_constant_1.USER_ROLE_ENUM.EDITOR), tag_controller_1.TagController.createTag);
// ** Get all tags
router.get("/", tag_controller_1.TagController.getAllTags);
// ** Get a tag by slug
// router.get("/slug/:slug", TagController.getCategoryBySlug);
// ** Get a single tag by ID
router.get("/:tagId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), tag_controller_1.TagController.getTagDetails);
// ** Delete a tag by ID
router.delete("/:tagId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), tag_controller_1.TagController.deleteTag);
// ** Update a tag (full update: name, description, etc.)
router.patch("/:tagId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), tag_controller_1.TagController.updateTag);
exports.TagRoute = router;
