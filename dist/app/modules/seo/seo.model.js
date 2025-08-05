"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// seo/seo.model.ts
const mongoose_1 = require("mongoose");
const SEOSchema = new mongoose_1.Schema({
    page: {
        type: String,
        required: true,
        unique: true,
        enum: [
            "home",
            "blog",
            "contact",
            "copyright",
            "cutter",
            "faq",
            "login",
            "mp4",
            "privacy",
            "shortener",
            "terms",
            "404",
        ],
    },
    // Core SEO
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    keywords: [{ type: String }],
    canonicalUrl: String,
    metaRobots: {
        type: String,
        default: "index, follow",
        enum: [
            "index, follow",
            "noindex, follow",
            "index, nofollow",
            "noindex, nofollow",
        ],
    },
    // Structured Data
    schemaMarkup: {
        articleSchema: mongoose_1.Schema.Types.Mixed,
        faqSchema: mongoose_1.Schema.Types.Mixed,
        breadcrumbSchema: mongoose_1.Schema.Types.Mixed,
        organizationSchema: mongoose_1.Schema.Types.Mixed,
    },
    // Social Media
    openGraph: {
        title: String,
        description: String,
        images: [
            {
                url: String,
                width: Number,
                height: Number,
                alt: String,
            },
        ],
        siteName: String,
    },
    twitterCard: {
        title: String,
        description: String,
        image: String,
        cardType: {
            type: String,
            enum: ["summary", "summary_large_image", "app", "player"],
        },
    },
    // Advanced SEO
    hreflangs: [
        {
            lang: String,
            url: String,
        },
    ],
    structuredData: String,
    jsonLD: mongoose_1.Schema.Types.Mixed,
    // Content Optimization
    contentQualityScore: Number,
    readabilityScore: Number,
    keywordDensity: mongoose_1.Schema.Types.Mixed,
    // Monitoring
    lastCrawled: Date,
    indexedStatus: {
        type: String,
        enum: ["indexed", "not-indexed", "blocked", "error"],
    },
}, { timestamps: true });
const SEOModel = (0, mongoose_1.model)("SEO", SEOSchema);
exports.default = SEOModel;
