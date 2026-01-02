import { Router } from "express";
import { SystemSettingsController } from "./system-settings.controller";
import authGuard from "../../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "../../user/user.constant";

const router = Router();

//! Get system settings
router.get(
  "/",
  authGuard(USER_ROLE_ENUM.ADMIN),
  SystemSettingsController.getSystemSettings,
);

//! Update system settings (admin only)
router.patch(
  "/",
  authGuard(USER_ROLE_ENUM.ADMIN),
  SystemSettingsController.updateSystemSettings,
);

export const SystemSettingsRoute = router;
