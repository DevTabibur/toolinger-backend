import { Router } from "express";
import { SentMessageController } from "./sent-message.controller";
import authGuard from "../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "../user/user.constant";

const router = Router();

// Send new email (Admin only)
router.post(
  "/",
  authGuard(USER_ROLE_ENUM.ADMIN),
  SentMessageController.sendEmail,
);

// Get all sent messages (Admin only)
router.get(
  "/",
  authGuard(USER_ROLE_ENUM.ADMIN),
  SentMessageController.getAllSentMessages,
);

// Delete sent message log (Admin only)
router.delete(
  "/:id",
  authGuard(USER_ROLE_ENUM.ADMIN),
  SentMessageController.deleteSentMessage,
);

export const SentMessageRoute = router;
