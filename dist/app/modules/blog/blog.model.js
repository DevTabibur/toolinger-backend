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
    excerpt: {
        type: String,
        // required: true,
        // maxlength: 160, // Limit to ensure SEO-friendly snippet
    },
    author: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    categories: {
        type: [String], // Array of strings for categories
        required: true,
    },
    tags: {
        type: [String], // Array of strings for tags
        default: [],
    },
    image: {
        type: String,
        // required: true,
    },
    seoTitle: {
        type: String,
        // maxlength: 70, // SEO title should be <= 70 characters
        default: function () {
            return this.title; // Default to the blog title if SEO title is not provided
        },
    },
    seoDescription: {
        type: String,
        maxlength: 160, // SEO description should be <= 160 characters
        // required: true,
    },
    seoKeywords: {
        type: [String], // Array of strings for SEO keywords
        default: [],
    },
    seoImage: {
        type: String,
        // required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
});
BlogPostSchema.pre("save", function (next) {
    this.updatedAt = new Date(); // Update the updatedAt field when the post is modified
    next();
});
// Create the model
const BlogPostModel = (0, mongoose_1.model)("BlogPost", BlogPostSchema);
exports.default = BlogPostModel;
