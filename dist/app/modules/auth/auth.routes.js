"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const router = (0, express_1.Router)();
//! Register New User
router.post("/register", auth_controller_1.AuthController.registerNewUser);
//! Login Existing User
router.post("/login", auth_controller_1.AuthController.loginExistingUser);
// ** Change password
router.post("/change-password", auth_controller_1.AuthController.ChangePassword);
//! log out user
router.post("/logout", (0, authGuard_1.default)(), auth_controller_1.AuthController.logOutUser);
// get-me
router.get("/get-me", (0, authGuard_1.default)(), auth_controller_1.AuthController.getMe);
//!  forgot password
router.post("/forgot-password", auth_controller_1.AuthController.forgotPassword);
// //! reset password
router.post("/reset-password", auth_controller_1.AuthController.resetPassword);
exports.AuthRoute = router;
