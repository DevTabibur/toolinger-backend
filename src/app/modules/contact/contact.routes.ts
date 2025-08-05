import { Router } from "express";
import { contactController } from "./contact.controller";

const router = Router();

// Send email data
router.post("/", contactController.sendEmail);

// Get all emails
router.get("/", contactController.getAllMails);

// Delete a single mail by ID
router.delete("/:mailId", contactController.deleteMailById);

// ** New Route: Delete all emails
router.delete("/", contactController.deleteAllMails);

// ** New Route: Delete selected mails by IDs
// router.post("/delete-selected", contactController.deleteSelectedMails);

export const ContactRoute = router;
