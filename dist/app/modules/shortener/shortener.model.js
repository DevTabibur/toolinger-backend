"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UrlSchema = new mongoose_1.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 }, // Ensure clicks defaults to 0
    lastAccessed: { type: Date, default: null }, // Track last visit
    expiry: { type: Date, required: true }, // Expiry time of the URL
}, { timestamps: true });
// Set TTL index on the 'expiry' field with 48 hours expiration time
UrlSchema.index({ expiry: 1 }, { expireAfterSeconds: 0 });
const ShortenedURLModel = (0, mongoose_1.model)("ShortenedURL", UrlSchema);
exports.default = ShortenedURLModel;
