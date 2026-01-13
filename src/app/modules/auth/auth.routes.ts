import { Router } from "express";
import { AuthController } from "./auth.controller";
import authGuard from "../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "../user/user.constant";

const router = Router();

//! Register New User
router.post("/register", AuthController.registerNewUser);

//! Login Existing User
router.post("/login", AuthController.loginExistingUser);

// ** Change password
router.post("/change-password", AuthController.ChangePassword);

//! log out user
router.post("/logout", authGuard(), AuthController.logOutUser);

// get-me
router.get("/get-me", authGuard(), AuthController.getMe);

//!  forgot password
router.post("/forgot-password", AuthController.forgotPassword);

// //! reset password
router.post("/reset-password", AuthController.resetPassword);

export const AuthRoute = router;
