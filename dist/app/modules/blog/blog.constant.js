"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOG_POST_SEARCH__FIELDS = exports.BLOG_POST_FILTER_FIELDS = exports.AUTHOR_ROLE = exports.BLOG_STATUS = void 0;
exports.BLOG_STATUS = [
    "draft", // article is not completed
    "published",
    "scheduled", // future publish
    "private", // only admin
    "pending_review", // guest post approval
    "archived",
];
exports.AUTHOR_ROLE = ["admin", "editor", "guest"];
exports.BLOG_POST_FILTER_FIELDS = [
    // exact match
    "status", // draft | published
    "author.id", // admin/guest
    "categories", // category ObjectId
    "tags", // tag ObjectId
    "isFeatured", // boolean
    "isSponsored", // boolean
];
exports.BLOG_POST_SEARCH__FIELDS = [
    // search for partial match
    "title",
    "slug",
];
