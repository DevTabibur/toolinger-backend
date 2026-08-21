"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tag_interface_1 = require("./tag.interface");
const TagSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, maxlength: 100 },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    status: {
        type: String,
        enum: tag_interface_1.TagStatus,
        default: tag_interface_1.TagStatus.PENDING,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: false, // guest allowed
    },
    isSystem: { type: Boolean, default: false },
    description: {
        type: String,
        required: false,
    },
}, { timestamps: true });
const TagModel = (0, mongoose_1.model)("Tag", TagSchema);
exports.default = TagModel;
