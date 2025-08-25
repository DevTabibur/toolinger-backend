import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

//! Register New User
router.post("/register", AuthController.registerNewUser);

//! Login Existing User
router.post("/login", AuthController.loginExistingUser);

// ** Change password
router.post("/change-password", AuthController.ChangePassword);

// //! log out user
// router.post('/log-out/:userId', AuthController.logOutUser)

// //!  forgot password
// router.post('/forgot-password', AuthController.forgotPassword)

// //! reset password
// router.post('/reset-password', AuthController.resetPassword)

export const AuthRoute = router;
