"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_FILTER_FIELDS = exports.CATEGORY_SEARCH_FIELDS = exports.CATEGORY_SEO_DEFAULTS = exports.CATEGORY_ORDER = exports.CATEGORY_VALIDATION = exports.CATEGORY_MESSAGES = exports.CATEGORY_TYPES = void 0;
// Common category types for blog categories
exports.CATEGORY_TYPES = {
    TECHNOLOGY: "Technology",
    BUSINESS: "Business",
    LIFESTYLE: "Lifestyle",
    HEALTH: "Health",
    EDUCATION: "Education",
    ENTERTAINMENT: "Entertainment",
    SPORTS: "Sports",
    TRAVEL: "Travel",
    FOOD: "Food",
    FASHION: "Fashion",
    SCIENCE: "Science",
    POLITICS: "Politics",
    FINANCE: "Finance",
    AUTOMOTIVE: "Automotive",
    REAL_ESTATE: "Real Estate",
    GAMING: "Gaming",
    MUSIC: "Music",
    MOVIES: "Movies",
    BOOKS: "Books",
    ART: "Art",
    PHOTOGRAPHY: "Photography",
    FITNESS: "Fitness",
    PARENTING: "Parenting",
    PETS: "Pets",
    GARDENING: "Gardening",
    DIY: "DIY",
    CRAFTS: "Crafts",
    RECIPES: "Recipes",
    REVIEWS: "Reviews",
    TUTORIALS: "Tutorials",
    NEWS: "News",
    OPINION: "Opinion",
    INTERVIEWS: "Interviews",
    CASE_STUDIES: "Case Studies",
    RESEARCH: "Research",
    ANALYSIS: "Analysis",
    GUIDES: "Guides",
    TIPS: "Tips",
    TRICKS: "Tricks",
    HOW_TO: "How To",
    WHAT_IS: "What Is",
    WHY: "Why",
    WHEN: "When",
    WHERE: "Where",
    WHO: "Who",
    OTHER: "Other",
};
// Category status messages
exports.CATEGORY_MESSAGES = {
    CREATED: "Category Created Successfully",
    UPDATED: "Category Updated Successfully",
    DELETED: "Category Deleted Successfully",
    FETCHED: "Category Details Fetched Successfully",
    ALL_FETCHED: "Categories Fetched Successfully",
    FEATURED_FETCHED: "Featured Categories Fetched Successfully",
    SUB_CATEGORIES_FETCHED: "Sub Categories Fetched Successfully",
    HIERARCHY_FETCHED: "Category Hierarchy Fetched Successfully",
    SEO_UPDATED: "SEO Fields Updated Successfully",
    STATUS_TOGGLED: "Category Status Toggled Successfully",
    NOT_FOUND: "Category Not Found",
    INVALID_ID: "Invalid Category Id",
    CREATION_FAILED: "Category Creation Failed",
    UPDATE_FAILED: "Category Update Failed",
    DELETE_FAILED: "Category Deletion Failed",
};
// Category validation messages
exports.CATEGORY_VALIDATION = {
    NAME_REQUIRED: "Category name is required",
    NAME_UNIQUE: "Category name must be unique",
    SLUG_REQUIRED: "Category slug is required",
    SLUG_UNIQUE: "Category slug must be unique",
    DESCRIPTION_REQUIRED: "Category description is required",
    DESCRIPTION_MAX_LENGTH: "Description cannot exceed 500 characters",
    SEO_DESCRIPTION_MAX_LENGTH: "SEO description cannot exceed 160 characters",
    SEO_TITLE_MAX_LENGTH: "SEO title cannot exceed 70 characters",
    ORDER_NUMBER: "Order must be a positive number",
    PARENT_CATEGORY_INVALID: "Invalid parent category ID",
    IMAGE_URL: "Invalid image URL format",
    SEO_IMAGE_URL: "Invalid SEO image URL format",
};
// Default category order values
exports.CATEGORY_ORDER = {
    FEATURED: 1,
    HIGH_PRIORITY: 2,
    NORMAL: 3,
    LOW_PRIORITY: 4,
    HIDDEN: 999,
};
// Category SEO defaults
exports.CATEGORY_SEO_DEFAULTS = {
    KEYWORDS: ["category", "blog", "articles"],
    DESCRIPTION_MAX_LENGTH: 160,
    TITLE_MAX_LENGTH: 70,
};
exports.CATEGORY_SEARCH_FIELDS = ["name", "slug"]; // "_id" diye regExp chalano jai na
exports.CATEGORY_FILTER_FIELDS = ["status"];
