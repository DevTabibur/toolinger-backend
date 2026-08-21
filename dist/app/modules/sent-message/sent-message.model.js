"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sentMessageSchema = new mongoose_1.Schema({
    recipientEmail: {
        type: String,
        required: true,
    },
    recipientName: {
        type: String,
    },
    subject: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["sent", "failed"],
        default: "sent",
    },
    errorMessage: {
        type: String,
    },
    sentAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
const SentMessageModel = (0, mongoose_1.model)("SentMessage", sentMessageSchema);
exports.default = SentMessageModel;
