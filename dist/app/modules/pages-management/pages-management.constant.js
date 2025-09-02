"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUCCESS_MESSAGES = exports.ERROR_MESSAGES = exports.DEFAULT_SEO_VALUES = exports.READING_TIME_WORDS_PER_MINUTE = exports.URL_REGEX = exports.SLUG_REGEX = exports.MAX_EXTERNAL_LINKS = exports.MAX_INTERNAL_LINKS = exports.MAX_BENEFITS = exports.MAX_FEATURES = exports.MAX_RELATED_TOOLS = exports.MAX_SEO_KEYWORDS = exports.MAX_TAGS = exports.MAX_CATEGORIES = exports.USAGE_INSTRUCTIONS_MIN_LENGTH = exports.CONTENT_MIN_LENGTH = exports.EXCERPT_MAX_LENGTH = exports.META_DESCRIPTION_MAX_LENGTH = exports.META_TITLE_MAX_LENGTH = exports.SEO_DESCRIPTION_MAX_LENGTH = exports.SEO_TITLE_MAX_LENGTH = exports.MAX_BULK_OPERATIONS = exports.DEFAULT_PAGINATION = exports.SEO_SCORE_WEIGHTS = exports.ANALYTICS_FIELDS = exports.SOCIAL_PLATFORMS = exports.ROBOTS_DIRECTIVE_OPTIONS = exports.CHANGE_FREQ_OPTIONS = exports.TOOL_CATEGORY_OPTIONS = exports.PAGE_TYPE_OPTIONS = exports.DYNAMIC_PAGES_ARTICLE_AND_SEO_SORTABLE_FIELDS = exports.DYNAMIC_PAGES_ARTICLE_AND_SEO_FILTERABLE_FIELDS = exports.DYNAMIC_PAGES_ARTICLE_AND_SEO_SEARCH_FIELDS = exports.PAGE_MANAGEMENT_SEO_SEARCH__FIELDS = exports.PAGE_MANAGEMENT_FILTER_FIELDS = void 0;
exports.PAGE_MANAGEMENT_FILTER_FIELDS = [
    "slug",
    "metaTitle",
    "metaDescription",
    "createdAt",
];
exports.PAGE_MANAGEMENT_SEO_SEARCH__FIELDS = [
    "slug",
    "metaTitle",
    "metaDescription",
    "createdAt",
];
exports.DYNAMIC_PAGES_ARTICLE_AND_SEO_SEARCH_FIELDS = [
    "title",
    "content",
    "excerpt",
    "author",
    "categories",
    "tags",
    "seoTitle",
    "seoDescription",
    "seoKeywords",
    "metaTitle",
    "metaDescription",
    "usageInstructions",
    "features",
    "benefits",
];
exports.DYNAMIC_PAGES_ARTICLE_AND_SEO_FILTERABLE_FIELDS = [
    "searchTerm",
    "pageType",
    "toolCategory",
    "isPublished",
    "isFeatured",
    "author",
    "categories",
    "tags",
    "publishedAt",
];
exports.DYNAMIC_PAGES_ARTICLE_AND_SEO_SORTABLE_FIELDS = [
    "title",
    "author",
    "publishedAt",
    "updatedAt",
    "createdAt",
    "seoScore",
    "pageSpeed",
    "accessibilityScore",
    "readingTime",
    "wordCount",
    "priority",
];
exports.PAGE_TYPE_OPTIONS = [
    "tool",
    "calculator",
    "converter",
    "generator",
    "analyzer",
    "formatter",
    "encoder",
    "decoder",
    "checker",
    "validator",
    "other",
];
exports.TOOL_CATEGORY_OPTIONS = [
    "text-tools",
    "image-tools",
    "video-tools",
    "audio-tools",
    "file-tools",
    "web-tools",
    "developer-tools",
    "seo-tools",
    "social-media-tools",
    "business-tools",
    "education-tools",
    "other",
];
exports.CHANGE_FREQ_OPTIONS = [
    "always",
    "hourly",
    "daily",
    "weekly",
    "monthly",
    "yearly",
    "never",
];
exports.ROBOTS_DIRECTIVE_OPTIONS = [
    "index,follow",
    "noindex,follow",
    "index,nofollow",
    "noindex,nofollow",
];
exports.SOCIAL_PLATFORMS = [
    "facebook",
    "twitter",
    "linkedin",
    "pinterest",
];
exports.ANALYTICS_FIELDS = [
    "pageViews",
    "uniqueVisitors",
    "bounceRate",
    "avgTimeOnPage",
];
exports.SEO_SCORE_WEIGHTS = {
    titleOptimization: 15,
    metaDescriptionOptimization: 15,
    contentLength: 10,
    keywordsOptimization: 10,
    imageOptimization: 10,
    socialMediaOptimization: 10,
    structuredData: 10,
    internalLinking: 10,
    mobileFriendliness: 10,
};
exports.DEFAULT_PAGINATION = {
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
};
exports.MAX_BULK_OPERATIONS = 100;
exports.SEO_TITLE_MAX_LENGTH = 70;
exports.SEO_DESCRIPTION_MAX_LENGTH = 160;
exports.META_TITLE_MAX_LENGTH = 60;
exports.META_DESCRIPTION_MAX_LENGTH = 160;
exports.EXCERPT_MAX_LENGTH = 160;
exports.CONTENT_MIN_LENGTH = 10;
exports.USAGE_INSTRUCTIONS_MIN_LENGTH = 10;
exports.MAX_CATEGORIES = 10;
exports.MAX_TAGS = 20;
exports.MAX_SEO_KEYWORDS = 15;
exports.MAX_RELATED_TOOLS = 20;
exports.MAX_FEATURES = 20;
exports.MAX_BENEFITS = 20;
exports.MAX_INTERNAL_LINKS = 50;
exports.MAX_EXTERNAL_LINKS = 50;
exports.SLUG_REGEX = /^[a-z0-9-]+$/;
exports.URL_REGEX = /^https?:\/\/.+/;
exports.READING_TIME_WORDS_PER_MINUTE = 200;
exports.DEFAULT_SEO_VALUES = {
    priority: 0.5,
    changeFreq: "weekly",
    isIndexed: true,
    robotsDirective: "index,follow",
    mobileFriendly: true,
    isPublished: false,
    isFeatured: false,
};
exports.ERROR_MESSAGES = {
    SLUG_EXISTS: "A page with this slug already exists",
    ARTICLE_NOT_FOUND: "Dynamic page article not found",
    INVALID_SLUG: "Slug can only contain lowercase letters, numbers, and hyphens",
    INVALID_URL: "Invalid URL format",
    CONTENT_TOO_SHORT: "Content must be at least 10 characters",
    USAGE_INSTRUCTIONS_TOO_SHORT: "Usage instructions must be at least 10 characters",
    TOO_MANY_CATEGORIES: "Cannot exceed 10 categories",
    TOO_MANY_TAGS: "Cannot exceed 20 tags",
    TOO_MANY_SEO_KEYWORDS: "Cannot exceed 15 SEO keywords",
    TOO_MANY_RELATED_TOOLS: "Cannot exceed 20 related tools",
    TOO_MANY_FEATURES: "Cannot exceed 20 features",
    TOO_MANY_BENEFITS: "Cannot exceed 20 benefits",
    TOO_MANY_INTERNAL_LINKS: "Cannot exceed 50 internal links",
    TOO_MANY_EXTERNAL_LINKS: "Cannot exceed 50 external links",
    INVALID_PRIORITY: "Priority must be between 0.0 and 1.0",
    INVALID_IDS_ARRAY: "Please provide valid IDs array",
    BULK_OPERATION_LIMIT: "Cannot process more than 100 items at once",
};
exports.SUCCESS_MESSAGES = {
    CREATED: "Dynamic page article with SEO created successfully",
    UPDATED: "Dynamic page article updated successfully",
    DELETED: "Dynamic page article deleted successfully",
    FETCHED: "Dynamic page article fetched successfully",
    FETCHED_BY_SLUG: "Dynamic page article fetched successfully by slug",
    FETCHED_ALL: "Dynamic pages articles with SEO fetched successfully",
    FETCHED_FEATURED: "Featured dynamic pages articles fetched successfully",
    FETCHED_BY_CATEGORY: "Dynamic pages articles by category fetched successfully",
    FETCHED_RELATED: "Related dynamic pages articles fetched successfully",
    ANALYTICS_UPDATED: "SEO analytics updated successfully",
    SITEMAP_FETCHED: "Sitemap data fetched successfully",
    PUBLISHED: "Dynamic page article published successfully",
    UNPUBLISHED: "Dynamic page article unpublished successfully",
    FEATURED: "Dynamic page article marked as featured successfully",
    UNFEATURED: "Dynamic page article removed from featured successfully",
    BULK_UPDATED: "Successfully updated {count} out of {total} articles",
    BULK_DELETED: "Successfully deleted {count} out of {total} articles",
};
