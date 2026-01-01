"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
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
    // categories: {
    //   type: [
    //     {
    //       type: Types.ObjectId,
    //       ref: "Category",
    //     },
    //   ],
    //   required: true,
    //   validate: {
    //     validator: function (v: Types.ObjectId[]) {
    //       return Array.isArray(v) && v.length > 0;
    //     },
    //     message: "At least one category is required",
    //   },
    // },
    primaryCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    secondaryCategories: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Category",
        },
    ],
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
BlogPostSchema.pre("validate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.primaryCategory) {
            const uncategorized = yield mongoose_1.default
                .model("Category")
                .findOne({ slug: "uncategorized", deletedAt: null });
            this.primaryCategory = uncategorized._id;
        }
        next();
    });
});
// Create the model
const BlogPostModel = (0, mongoose_1.model)("BlogPost", BlogPostSchema);
exports.default = BlogPostModel;
