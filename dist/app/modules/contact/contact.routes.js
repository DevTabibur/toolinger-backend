"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRoute = void 0;
const express_1 = require("express");
const contact_controller_1 = require("./contact.controller");
const router = (0, express_1.Router)();
// Send email data
router.post("/", contact_controller_1.contactController.sendEmail);
// Get all emails
router.get("/", contact_controller_1.contactController.getAllMails);
// Delete a single mail by ID
router.delete("/:mailId", contact_controller_1.contactController.deleteMailById);
// ** New Route: Delete all emails
router.delete("/", contact_controller_1.contactController.deleteAllMails);
// ** New Route: Delete selected mails by IDs
// router.post("/delete-selected", contactController.deleteSelectedMails);
exports.ContactRoute = router;
