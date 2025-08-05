"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
//! Register New User
// router.post(
//     '/register',
//     AuthController.registerNewUser,
// )
//! Login Existing User
router.post("/login", auth_controller_1.AuthController.loginExistingUser);
// ** Change password
router.post("/change-password", auth_controller_1.AuthController.ChangePassword);
// //! log out user
// router.post('/log-out/:userId', AuthController.logOutUser)
// //!  forgot password
// router.post('/forgot-password', AuthController.forgotPassword)
// //! reset password
// router.post('/reset-password', AuthController.resetPassword)
exports.AuthRoute = router;
