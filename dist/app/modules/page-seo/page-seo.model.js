"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PageSEOSchema = new mongoose_1.Schema({
    page: {
        type: String,
        required: true,
        unique: true,
        // enum: [
        //   "home",
        //   "about",
        //   "contact",
        //   "blog",
        //   "services",
        //   "pricing",
        //   "faq",
        //   "privacy",
        //   "terms",
        //   "404",
        //   "login",
        //   "register",
        //   "dashboard",
        //   "tools",
        //   "shortener",
        //   "converter",
        //   "cutter",
        //   "analytics",
        //   "seo-tools",
        //   "domain-tools",
        //   "advanced-tools",
        //   "website-management",
        //   "calculators",
        //   "more-tools",
        // ],
    },
    // Basic SEO
    pageTitle: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 60,
    },
    focusKeyword: {
        type: String,
        required: true,
    },
    keywords: [
        {
            type: String,
        },
    ],
    metaDescription: {
        type: String,
        required: true,
        // minlength: 120,
        // maxlength: 160
    },
    // Social Media
    openGraph: {
        title: { type: String, required: true },
        type: {
            type: String,
            default: "website",
            enum: [
                "website",
                "article",
                "book",
                "profile",
                "music.song",
                "music.album",
                "music.playlist",
                "music.radio_station",
                "video.movie",
                "video.episode",
                "video.tv_show",
                "video.other",
                "business.business",
            ],
        },
        siteName: { type: String, required: true },
        locale: {
            type: String,
            default: "en_US",
            enum: [
                "en_US",
                "en_GB",
                "es_ES",
                "fr_FR",
                "de_DE",
                "it_IT",
                "pt_BR",
                "ru_RU",
                "ja_JP",
                "ko_KR",
                "zh_CN",
                "ar_AR",
                "hi_IN",
                "bn_BD",
            ],
        },
        imageUrl: { type: String, required: true },
        description: { type: String, required: true },
    },
    twitterCard: {
        cardType: {
            type: String,
            default: "summary_large_image",
            enum: ["summary", "summary_large_image", "app", "player"],
        },
        siteHandle: { type: String, required: true },
        creatorHandle: { type: String, required: true },
        imageUrl: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    // Technical
    canonicalUrl: { type: String, required: true },
    robotsMeta: {
        type: String,
        default: "index, follow",
        enum: [
            "index, follow",
            "noindex, follow",
            "index, nofollow",
            "noindex, nofollow",
        ],
    },
    hreflang: {
        type: String,
        default: "en",
        enum: [
            "en",
            "es",
            "fr",
            "de",
            "it",
            "pt",
            "ru",
            "ja",
            "ko",
            "zh",
            "ar",
            "hi",
            "bn",
        ],
    },
    viewport: {
        type: String,
        default: "width=device-width, initial-scale=1",
    },
    // Schema
    schemaMarkup: { type: String, required: true },
    schemaTemplates: [{ type: String }],
}, { timestamps: true });
const PageSEOModel = (0, mongoose_1.model)("PageSEO", PageSEOSchema);
exports.default = PageSEOModel;
