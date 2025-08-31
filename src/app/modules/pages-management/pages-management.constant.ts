export const PAGE_MANAGEMENT_FILTER_FIELDS = [
  "slug",
  "metaTitle",
  "metaDescription",
  "createdAt",
];
export const PAGE_MANAGEMENT_SEO_SEARCH__FIELDS = [
  "slug",
  "metaTitle",
  "metaDescription",
  "createdAt",
];

export type IPageManagementFilters = {
  searchTerm?: string;
};

export const DYNAMIC_PAGES_ARTICLE_AND_SEO_SEARCH_FIELDS = [
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

export const DYNAMIC_PAGES_ARTICLE_AND_SEO_FILTERABLE_FIELDS = [
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

export const DYNAMIC_PAGES_ARTICLE_AND_SEO_SORTABLE_FIELDS = [
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

export const PAGE_TYPE_OPTIONS = [
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
] as const;

export const TOOL_CATEGORY_OPTIONS = [
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
] as const;

export const CHANGE_FREQ_OPTIONS = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
] as const;

export const ROBOTS_DIRECTIVE_OPTIONS = [
  "index,follow",
  "noindex,follow",
  "index,nofollow",
  "noindex,nofollow",
] as const;

export const SOCIAL_PLATFORMS = [
  "facebook",
  "twitter",
  "linkedin",
  "pinterest",
] as const;

export const ANALYTICS_FIELDS = [
  "pageViews",
  "uniqueVisitors",
  "bounceRate",
  "avgTimeOnPage",
] as const;

export const SEO_SCORE_WEIGHTS = {
  titleOptimization: 15,
  metaDescriptionOptimization: 15,
  contentLength: 10,
  keywordsOptimization: 10,
  imageOptimization: 10,
  socialMediaOptimization: 10,
  structuredData: 10,
  internalLinking: 10,
  mobileFriendliness: 10,
} as const;

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
} as const;

export const MAX_BULK_OPERATIONS = 100;

export const SEO_TITLE_MAX_LENGTH = 70;
export const SEO_DESCRIPTION_MAX_LENGTH = 160;
export const META_TITLE_MAX_LENGTH = 60;
export const META_DESCRIPTION_MAX_LENGTH = 160;
export const EXCERPT_MAX_LENGTH = 160;

export const CONTENT_MIN_LENGTH = 10;
export const USAGE_INSTRUCTIONS_MIN_LENGTH = 10;

export const MAX_CATEGORIES = 10;
export const MAX_TAGS = 20;
export const MAX_SEO_KEYWORDS = 15;
export const MAX_RELATED_TOOLS = 20;
export const MAX_FEATURES = 20;
export const MAX_BENEFITS = 20;
export const MAX_INTERNAL_LINKS = 50;
export const MAX_EXTERNAL_LINKS = 50;

export const SLUG_REGEX = /^[a-z0-9-]+$/;
export const URL_REGEX = /^https?:\/\/.+/;

export const READING_TIME_WORDS_PER_MINUTE = 200;

export const DEFAULT_SEO_VALUES = {
  priority: 0.5,
  changeFreq: "weekly",
  isIndexed: true,
  robotsDirective: "index,follow",
  mobileFriendly: true,
  isPublished: false,
  isFeatured: false,
} as const;

export const ERROR_MESSAGES = {
  SLUG_EXISTS: "A page with this slug already exists",
  ARTICLE_NOT_FOUND: "Dynamic page article not found",
  INVALID_SLUG: "Slug can only contain lowercase letters, numbers, and hyphens",
  INVALID_URL: "Invalid URL format",
  CONTENT_TOO_SHORT: "Content must be at least 10 characters",
  USAGE_INSTRUCTIONS_TOO_SHORT:
    "Usage instructions must be at least 10 characters",
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
} as const;

export const SUCCESS_MESSAGES = {
  CREATED: "Dynamic page article with SEO created successfully",
  UPDATED: "Dynamic page article updated successfully",
  DELETED: "Dynamic page article deleted successfully",
  FETCHED: "Dynamic page article fetched successfully",
  FETCHED_BY_SLUG: "Dynamic page article fetched successfully by slug",
  FETCHED_ALL: "Dynamic pages articles with SEO fetched successfully",
  FETCHED_FEATURED: "Featured dynamic pages articles fetched successfully",
  FETCHED_BY_CATEGORY:
    "Dynamic pages articles by category fetched successfully",
  FETCHED_RELATED: "Related dynamic pages articles fetched successfully",
  ANALYTICS_UPDATED: "SEO analytics updated successfully",
  SITEMAP_FETCHED: "Sitemap data fetched successfully",
  PUBLISHED: "Dynamic page article published successfully",
  UNPUBLISHED: "Dynamic page article unpublished successfully",
  FEATURED: "Dynamic page article marked as featured successfully",
  UNFEATURED: "Dynamic page article removed from featured successfully",
  BULK_UPDATED: "Successfully updated {count} out of {total} articles",
  BULK_DELETED: "Successfully deleted {count} out of {total} articles",
} as const;
