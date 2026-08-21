"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentMessageRoute = void 0;
const express_1 = require("express");
const sent_message_controller_1 = require("./sent-message.controller");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
// Send new email (Admin only)
router.post("/", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), sent_message_controller_1.SentMessageController.sendEmail);
// Get all sent messages (Admin only)
router.get("/", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), sent_message_controller_1.SentMessageController.getAllSentMessages);
// Delete sent message log (Admin only)
router.delete("/:id", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), sent_message_controller_1.SentMessageController.deleteSentMessage);
exports.SentMessageRoute = router;
