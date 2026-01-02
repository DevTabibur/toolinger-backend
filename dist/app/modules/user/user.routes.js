"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const user_constant_1 = require("./user.constant");
const fileUploadAndConvertToWebP_1 = __importDefault(require("../../middlewares/fileUploadAndConvertToWebP"));
const router = (0, express_1.Router)();
// ** get all user profile
router.get("/", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), user_controller_1.UserController.getAllUser);
// update profile, or any data
router.patch("/:userId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN, user_constant_1.USER_ROLE_ENUM.EDITOR, user_constant_1.USER_ROLE_ENUM.GUEST), fileUploadAndConvertToWebP_1.default, user_controller_1.UserController.updateProfile);
// ** get user specific details for user
router.get("/:userId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN, user_constant_1.USER_ROLE_ENUM.EDITOR, user_constant_1.USER_ROLE_ENUM.GUEST), user_controller_1.UserController.getSingleUserById);
router.delete("/:userId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), user_controller_1.UserController.deleteUser);
exports.UserRoute = router;
