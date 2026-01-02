import { Router } from "express";
import { UserController } from "./user.controller";
import authGuard from "../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "./user.constant";
import uploadMiddleware from "../../middlewares/fileUploadAndConvertToWebP";
const router = Router();

// ** get all user profile
router.get("/", authGuard(USER_ROLE_ENUM.ADMIN), UserController.getAllUser);

// update profile, or any data
router.patch(
  "/:userId",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.EDITOR, USER_ROLE_ENUM.GUEST),
  uploadMiddleware,
  UserController.updateProfile,
);

// ** get user specific details for user
router.get(
  "/:userId",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.EDITOR, USER_ROLE_ENUM.GUEST),
  UserController.getSingleUserById,
);

router.delete(
  "/:userId",
  authGuard(USER_ROLE_ENUM.ADMIN),
  UserController.deleteUser,
);

export const UserRoute = router;
