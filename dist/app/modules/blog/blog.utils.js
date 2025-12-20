"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExcerpt = exports.generateSlug = void 0;
const generateSlug = (title) => {
    return title
        .toLowerCase() // Convert to lowercase
        .trim() // Remove leading/trailing whitespace
        .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};
exports.generateSlug = generateSlug;
const generateExcerpt = (content, maxLength = 160) => {
    if (!content)
        return "";
    // 1. Remove HTML tags
    const plainText = content.replace(/<[^>]*>/g, "");
    // 2. Normalize spaces
    const cleaned = plainText.replace(/\s+/g, " ").trim();
    // 3. Cut safely
    if (cleaned.length <= maxLength)
        return cleaned;
    return cleaned.slice(0, maxLength).trim() + "...";
};
exports.generateExcerpt = generateExcerpt;
