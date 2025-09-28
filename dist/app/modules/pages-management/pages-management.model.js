"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Helper function to allow empty string for enums
function enumOrEmpty(enumValues) {
    return {
        type: String,
        enum: [...enumValues, ""],
        default: "",
        trim: true,
    };
}
// Main PageManagement schema
const PageManagementSchema = new mongoose_1.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    type: Object.assign(Object.assign({}, enumOrEmpty([
        "static",
        "text",
        "image",
        "developers",
        "converters",
        "generators",
        "calculators",
        "websiteManagemet",
        "other",
    ])), { required: true }),
    //=========================================Article===============================
    pageContent: {
        type: String,
        required: false,
    },
    //============================================ Basic SEO=============================================================
    metaTitle: { type: String, trim: true, maxlength: 70 },
    metaDescription: {
        type: String,
        trim: true,
        maxlength: 160,
    },
    keywords: { type: [String], default: [] },
    canonicalUrl: { type: String, trim: true },
    noindex: { type: Boolean, default: false },
    // ================================================Open Graph=========================================================
    ogTitle: { type: String, trim: true },
    ogDescription: { type: String, trim: true },
    ogImageUrl: { type: String, trim: true },
    ogType: { type: String, trim: true },
    ogSiteName: { type: String, trim: true },
    ogLocale: Object.assign(Object.assign({}, enumOrEmpty(["en_US", "en_GB", "es", "fr", "de"])), { default: "en_US" }),
    // ====================================================Twitter Card======================================================
    twitterCard: Object.assign(Object.assign({}, enumOrEmpty(["summary", "summary_large_image", "app", "player"])), { default: "summary" }),
    twitterSite: { type: String, trim: true },
    twitterCreator: { type: String, trim: true },
    twitterImageUrl: { type: String, trim: true },
    // ==================================================Hreflang / Alternates================================================
    alternates: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    // ==================================================JSON-LD schemas=======================================================
    schemas: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
    //=================================================== Sitemap helpers======================================================
    changefreq: Object.assign(Object.assign({}, enumOrEmpty([
        "always",
        "hourly",
        "daily",
        "weekly",
        "monthly",
        "yearly",
        "never",
    ])), { default: "weekly" }),
    priority: { type: Number, min: 0.0, max: 1.0, default: 0.5 },
}, {
    timestamps: true,
});
const PageManagementModel = (0, mongoose_1.model)("PageManagement", PageManagementSchema);
exports.default = PageManagementModel;
