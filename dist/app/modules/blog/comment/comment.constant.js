"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMENT_SEARCH_FIELDS = exports.COMMENT_FILTER_FIELDS = exports.COMMENT_STATUS = void 0;
exports.COMMENT_STATUS = [
    "pending",
    "approved",
    "rejected",
    "spam",
];
// exact match
exports.COMMENT_FILTER_FIELDS = [
    "status",
    "blogPost",
    "author.user",
    "parentComment",
];
// partial match
exports.COMMENT_SEARCH_FIELDS = ["content", "author._id", "author.email"];
