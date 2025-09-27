"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BlogPostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["archive", "published", "draft"],
        default: "published",
        required: true,
    },
    excerpt: {
        type: String,
        required: true,
        maxlength: 160, // Limit to ensure SEO-friendly snippet
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    blogFeaturedImage: {
        type: String,
        required: true,
    },
    isAllowComments: {
        type: Boolean,
    },
    isFeaturedPost: {
        type: Boolean,
    },
    seoTitle: {
        type: String,
        required: true,
        maxlength: 70, // SEO title should be <= 70 characters
        default: function () {
            return this.title;
        },
    },
    seoDescription: {
        type: String,
        required: true,
        maxlength: 160,
    },
    seoKeywords: {
        type: [String],
    },
    seoImage: {
        type: String,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
// Create the model
const BlogPostModel = (0, mongoose_1.model)("BlogPost", BlogPostSchema);
exports.default = BlogPostModel;
