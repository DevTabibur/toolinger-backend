"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blog_constant_1 = require("./blog.constant");
const BlogPostSchema = new mongoose_1.Schema({
    // CORE
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
        enum: blog_constant_1.BLOG_STATUS,
        default: "draft",
        required: true,
    },
    excerpt: {
        type: String,
        // required: true,
        maxlength: 160, // Limit to ensure SEO-friendly snippet
    },
    // Author
    author: {
        id: {
            type: mongoose_1.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // name: {
        //   type: String,
        // },
        // email: {
        //   type: String,
        // },
        // role: {
        //   type: String,
        //   enum: AUTHOR_ROLE,
        //   default: "guest",
        //   required: true,
        // },
        profileUrl: {
            type: String,
        },
    },
    // Taxonomy
    // categories: [
    //   {
    //     type: Types.ObjectId,
    //     ref: "Category",
    //     required: true,
    //     index: true,
    //   },
    // ],
    categories: {
        type: [
            {
                type: mongoose_1.Types.ObjectId,
                ref: "Category",
            },
        ],
        required: true,
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: "At least one category is required",
        },
    },
    tags: {
        type: [
            {
                type: mongoose_1.Types.ObjectId,
                ref: "Tag",
            },
        ],
        required: false,
        // validate: {
        //   validator: function (v: Types.ObjectId[]) {
        //     return Array.isArray(v) && v.length > 0;
        //   },
        //   message: "At least one tag is required",
        // },
    },
    // Media
    blogFeaturedImage: {
        type: String,
        required: true,
    },
    //Flags
    allowComments: {
        type: Boolean,
        default: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isSponsored: {
        type: Boolean,
        default: false,
    },
    sponsorName: {
        type: String,
    },
    sponsorUrl: {
        type: String,
    },
    // seo
    seo: {
        title: {
            type: String,
            // required: true,
            maxlength: 70, // SEO title should be <= 70 characters
            default: function () {
                return this.title;
            },
        },
        description: {
            type: String,
            // required: true,
            maxlength: 160,
        },
        keywords: {
            type: [String],
        },
        seoImage: {
            type: String,
        },
        canonicalUrl: String,
        noIndex: { type: Boolean, default: false },
        noFollow: { type: Boolean, default: false },
    },
    // Analytics
    analytics: {
        views: {
            type: Number,
            default: 0,
        },
        uniqueViews: {
            type: Number,
            default: 0,
        },
        readTime: {
            type: Number,
            default: 0,
        },
        shares: {
            type: Number,
            default: 0,
        },
        lastViewedAt: {
            type: Date,
        },
    },
    // Publishing
    publishedAt: {
        type: Date,
    },
    scheduledAt: {
        type: Date,
    },
    // Trash system
    trashedAt: {
        type: Date,
        default: null,
        index: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
// Create the model
const BlogPostModel = (0, mongoose_1.model)("BlogPost", BlogPostSchema);
exports.default = BlogPostModel;
