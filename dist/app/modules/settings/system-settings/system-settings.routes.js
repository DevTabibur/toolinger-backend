"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemSettingsRoute = void 0;
const express_1 = require("express");
const system_settings_controller_1 = require("./system-settings.controller");
const authGuard_1 = __importDefault(require("../../../middlewares/authGuard"));
const user_constant_1 = require("../../user/user.constant");
const router = (0, express_1.Router)();
//! Get system settings
router.get("/", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), system_settings_controller_1.SystemSettingsController.getSystemSettings);
//! Update system settings (admin only)
router.patch("/", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), system_settings_controller_1.SystemSettingsController.updateSystemSettings);
exports.SystemSettingsRoute = router;
