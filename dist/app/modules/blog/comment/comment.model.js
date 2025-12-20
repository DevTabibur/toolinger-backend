"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const comment_constant_1 = require("./comment.constant");
const CommentSchema = new mongoose_1.Schema({
    blogPost: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "BlogPost",
        required: true,
    },
    author: {
        user: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: true, // Optional for guest comments
        },
        // name: {
        //   type: String,
        //   required: true,
        //   trim: true,
        // },
        // email: {
        //   type: String,
        //   required: true,
        //   lowercase: true,
        //   trim: true,
        // },
        // website: {
        //   type: String,
        //   trim: true,
        // },
    },
    content: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    status: {
        type: String,
        enum: [...comment_constant_1.COMMENT_STATUS],
        default: "pending",
        required: true,
    },
    parentComment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
        index: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    isEdited: {
        type: Boolean,
        default: false,
    },
    editedAt: {
        type: Date,
    },
    ipAddress: {
        type: String,
    },
    userAgent: {
        type: String,
    },
}, {
    timestamps: true,
});
const CommentModel = (0, mongoose_1.model)("Comment", CommentSchema);
exports.default = CommentModel;
