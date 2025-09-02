"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicPagesArticleAndSeoValidation = exports.bulkDeleteDynamicPagesArticleAndSeoSchema = exports.bulkUpdateDynamicPagesArticleAndSeoSchema = exports.toggleFeaturedStatusSchema = exports.togglePublishStatusSchema = exports.updateSEOAnalyticsSchema = exports.getRelatedDynamicPagesArticleAndSeoSchema = exports.getDynamicPagesArticleAndSeoByCategorySchema = exports.deleteDynamicPagesArticleAndSeoSchema = exports.getDynamicPagesArticleAndSeoBySlugSchema = exports.getDynamicPagesArticleAndSeoByIdSchema = exports.updateDynamicPagesArticleAndSeoSchema = exports.createDynamicPagesArticleAndSeoSchema = void 0;
const zod_1 = require("zod");
// Create dynamic pages article and SEO validation schema
exports.createDynamicPagesArticleAndSeoSchema = zod_1.z.object({
    body: zod_1.z.object({
        slug: zod_1.z
            .string({
            required_error: "Slug is required",
        })
            .min(1, "Slug cannot be empty")
            .max(100, "Slug cannot exceed 100 characters")
            .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
        title: zod_1.z
            .string({
            required_error: "Title is required",
        })
            .min(1, "Title cannot be empty")
            .max(200, "Title cannot exceed 200 characters"),
        content: zod_1.z
            .string({
            required_error: "Content is required",
        })
            .min(10, "Content must be at least 10 characters"),
        excerpt: zod_1.z
            .string()
            .max(160, "Excerpt cannot exceed 160 characters")
            .optional(),
        author: zod_1.z
            .string({
            required_error: "Author is required",
        })
            .min(1, "Author cannot be empty")
            .max(100, "Author cannot exceed 100 characters"),
        categories: zod_1.z
            .array(zod_1.z.string())
            .min(1, "At least one category is required")
            .max(10, "Cannot exceed 10 categories"),
        tags: zod_1.z.array(zod_1.z.string()).max(20, "Cannot exceed 20 tags").optional(),
        image: zod_1.z.string().url("Invalid image URL").optional(),
        seoTitle: zod_1.z
            .string()
            .max(70, "SEO title cannot exceed 70 characters")
            .optional(),
        seoDescription: zod_1.z
            .string()
            .max(160, "SEO description cannot exceed 160 characters")
            .optional(),
        seoKeywords: zod_1.z
            .array(zod_1.z.string())
            .max(15, "Cannot exceed 15 SEO keywords")
            .optional(),
        seoImage: zod_1.z.string().url("Invalid SEO image URL").optional(),
        isPublished: zod_1.z.boolean().default(false),
        isFeatured: zod_1.z.boolean().default(false),
        metaTitle: zod_1.z
            .string({
            required_error: "Meta title is required",
        })
            .min(1, "Meta title cannot be empty")
            .max(60, "Meta title cannot exceed 60 characters"),
        metaDescription: zod_1.z
            .string({
            required_error: "Meta description is required",
        })
            .min(1, "Meta description cannot be empty")
            .max(160, "Meta description cannot exceed 160 characters"),
        canonicalUrl: zod_1.z
            .string({
            required_error: "Canonical URL is required",
        })
            .url("Invalid canonical URL"),
        pageType: zod_1.z.enum([
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
        ], {
            required_error: "Page type is required",
        }),
        toolCategory: zod_1.z.enum([
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
        ], {
            required_error: "Tool category is required",
        }),
        relatedTools: zod_1.z
            .array(zod_1.z.string())
            .max(20, "Cannot exceed 20 related tools")
            .optional(),
        usageInstructions: zod_1.z
            .string({
            required_error: "Usage instructions are required",
        })
            .min(10, "Usage instructions must be at least 10 characters"),
        features: zod_1.z
            .array(zod_1.z.string())
            .max(20, "Cannot exceed 20 features")
            .optional(),
        benefits: zod_1.z
            .array(zod_1.z.string())
            .max(20, "Cannot exceed 20 benefits")
            .optional(),
        // Additional SEO fields
        ogTitle: zod_1.z
            .string()
            .max(70, "Open Graph title cannot exceed 70 characters")
            .optional(),
        ogDescription: zod_1.z
            .string()
            .max(160, "Open Graph description cannot exceed 160 characters")
            .optional(),
        ogImage: zod_1.z.string().url("Invalid Open Graph image URL").optional(),
        twitterTitle: zod_1.z
            .string()
            .max(70, "Twitter title cannot exceed 70 characters")
            .optional(),
        twitterDescription: zod_1.z
            .string()
            .max(160, "Twitter description cannot exceed 160 characters")
            .optional(),
        twitterImage: zod_1.z.string().url("Invalid Twitter image URL").optional(),
        structuredData: zod_1.z.record(zod_1.z.any()).optional(),
        breadcrumbData: zod_1.z.record(zod_1.z.any()).optional(),
        priority: zod_1.z
            .number()
            .min(0.0, "Priority must be at least 0.0")
            .max(1.0, "Priority cannot exceed 1.0")
            .default(0.5),
        changeFreq: zod_1.z
            .enum([
            "always",
            "hourly",
            "daily",
            "weekly",
            "monthly",
            "yearly",
            "never",
        ])
            .default("weekly"),
        isIndexed: zod_1.z.boolean().default(true),
        robotsDirective: zod_1.z
            .enum([
            "index,follow",
            "noindex,follow",
            "index,nofollow",
            "noindex,nofollow",
        ])
            .default("index,follow"),
        schemaMarkup: zod_1.z.record(zod_1.z.any()).optional(),
        internalLinks: zod_1.z
            .array(zod_1.z.string())
            .max(50, "Cannot exceed 50 internal links")
            .optional(),
        externalLinks: zod_1.z
            .array(zod_1.z.string())
            .max(50, "Cannot exceed 50 external links")
            .optional(),
        mobileFriendly: zod_1.z.boolean().default(true),
    }),
});
// Update dynamic pages article and SEO validation schema
exports.updateDynamicPagesArticleAndSeoSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Article ID is required",
        }),
    }),
    body: zod_1.z.object({
        slug: zod_1.z
            .string()
            .min(1, "Slug cannot be empty")
            .max(100, "Slug cannot exceed 100 characters")
            .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens")
            .optional(),
        title: zod_1.z
            .string()
            .min(1, "Title cannot be empty")
            .max(200, "Title cannot exceed 200 characters")
            .optional(),
        content: zod_1.z
            .string()
            .min(10, "Content must be at least 10 characters")
            .optional(),
        excerpt: zod_1.z
            .string()
            .max(160, "Excerpt cannot exceed 160 characters")
            .optional(),
        author: zod_1.z
            .string()
            .min(1, "Author cannot be empty")
            .max(100, "Author cannot exceed 100 characters")
            .optional(),
        categories: zod_1.z
            .array(zod_1.z.string())
            .min(1, "At least one category is required")
            .max(10, "Cannot exceed 10 categories")
            .optional(),
        tags: zod_1.z.array(zod_1.z.string()).max(20, "Cannot exceed 20 tags").optional(),
        image: zod_1.z.string().url("Invalid image URL").optional(),
        seoTitle: zod_1.z
            .string()
            .max(70, "SEO title cannot exceed 70 characters")
            .optional(),
        seoDescription: zod_1.z
            .string()
            .max(160, "SEO description cannot exceed 160 characters")
            .optional(),
        seoKeywords: zod_1.z
            .array(zod_1.z.string())
            .max(15, "Cannot exceed 15 SEO keywords")
            .optional(),
        seoImage: zod_1.z.string().url("Invalid SEO image URL").optional(),
        isPublished: zod_1.z.boolean().optional(),
        isFeatured: zod_1.z.boolean().optional(),
        metaTitle: zod_1.z
            .string()
            .min(1, "Meta title cannot be empty")
            .max(60, "Meta title cannot exceed 60 characters")
            .optional(),
        metaDescription: zod_1.z
            .string()
            .min(1, "Meta description cannot be empty")
            .max(160, "Meta description cannot exceed 160 characters")
            .optional(),
        canonicalUrl: zod_1.z.string().url("Invalid canonical URL").optional(),
        pageType: zod_1.z
            .enum([
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
        ])
            .optional(),
        toolCategory: zod_1.z
            .enum([
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
        ])
            .optional(),
        relatedTools: zod_1.z
            .array(zod_1.z.string())
            .max(20, "Cannot exceed 20 related tools")
            .optional(),
        usageInstructions: zod_1.z
            .string()
            .min(10, "Usage instructions must be at least 10 characters")
            .optional(),
        features: zod_1.z
            .array(zod_1.z.string())
            .max(20, "Cannot exceed 20 features")
            .optional(),
        benefits: zod_1.z
            .array(zod_1.z.string())
            .max(20, "Cannot exceed 20 benefits")
            .optional(),
        ogTitle: zod_1.z
            .string()
            .max(70, "Open Graph title cannot exceed 70 characters")
            .optional(),
        ogDescription: zod_1.z
            .string()
            .max(160, "Open Graph description cannot exceed 160 characters")
            .optional(),
        ogImage: zod_1.z.string().url("Invalid Open Graph image URL").optional(),
        twitterTitle: zod_1.z
            .string()
            .max(70, "Twitter title cannot exceed 70 characters")
            .optional(),
        twitterDescription: zod_1.z
            .string()
            .max(160, "Twitter description cannot exceed 160 characters")
            .optional(),
        twitterImage: zod_1.z.string().url("Invalid Twitter image URL").optional(),
        structuredData: zod_1.z.record(zod_1.z.any()).optional(),
        breadcrumbData: zod_1.z.record(zod_1.z.any()).optional(),
        priority: zod_1.z
            .number()
            .min(0.0, "Priority must be at least 0.0")
            .max(1.0, "Priority cannot exceed 1.0")
            .optional(),
        changeFreq: zod_1.z
            .enum([
            "always",
            "hourly",
            "daily",
            "weekly",
            "monthly",
            "yearly",
            "never",
        ])
            .optional(),
        isIndexed: zod_1.z.boolean().optional(),
        robotsDirective: zod_1.z
            .enum([
            "index,follow",
            "noindex,follow",
            "index,nofollow",
            "noindex,nofollow",
        ])
            .optional(),
        schemaMarkup: zod_1.z.record(zod_1.z.any()).optional(),
        internalLinks: zod_1.z
            .array(zod_1.z.string())
            .max(50, "Cannot exceed 50 internal links")
            .optional(),
        externalLinks: zod_1.z
            .array(zod_1.z.string())
            .max(50, "Cannot exceed 50 external links")
            .optional(),
        mobileFriendly: zod_1.z.boolean().optional(),
    }),
});
// Get dynamic pages article by ID validation schema
exports.getDynamicPagesArticleAndSeoByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Article ID is required",
        }),
    }),
});
// Get dynamic pages article by slug validation schema
exports.getDynamicPagesArticleAndSeoBySlugSchema = zod_1.z.object({
    params: zod_1.z.object({
        slug: zod_1.z.string({
            required_error: "Slug is required",
        }),
    }),
});
// Delete dynamic pages article validation schema
exports.deleteDynamicPagesArticleAndSeoSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Article ID is required",
        }),
    }),
});
// Get dynamic pages article by category validation schema
exports.getDynamicPagesArticleAndSeoByCategorySchema = zod_1.z.object({
    params: zod_1.z.object({
        category: zod_1.z.string({
            required_error: "Category is required",
        }),
    }),
    query: zod_1.z.object({
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        sortBy: zod_1.z.string().optional(),
        sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    }),
});
// Get related dynamic pages article validation schema
exports.getRelatedDynamicPagesArticleAndSeoSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Article ID is required",
        }),
    }),
    query: zod_1.z.object({
        limit: zod_1.z.string().optional(),
    }),
});
// Update SEO analytics validation schema
exports.updateSEOAnalyticsSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Article ID is required",
        }),
    }),
    body: zod_1.z.object({
        pageViews: zod_1.z.number().min(0, "Page views must be non-negative").optional(),
        uniqueVisitors: zod_1.z
            .number()
            .min(0, "Unique visitors must be non-negative")
            .optional(),
        socialShares: zod_1.z
            .object({
            facebook: zod_1.z
                .number()
                .min(0, "Facebook shares must be non-negative")
                .optional(),
            twitter: zod_1.z
                .number()
                .min(0, "Twitter shares must be non-negative")
                .optional(),
            linkedin: zod_1.z
                .number()
                .min(0, "LinkedIn shares must be non-negative")
                .optional(),
            pinterest: zod_1.z
                .number()
                .min(0, "Pinterest shares must be non-negative")
                .optional(),
        })
            .optional(),
    }),
});
// Toggle publish status validation schema
exports.togglePublishStatusSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Article ID is required",
        }),
    }),
    body: zod_1.z.object({
        isPublished: zod_1.z.boolean({
            required_error: "isPublished is required",
        }),
    }),
});
// Toggle featured status validation schema
exports.toggleFeaturedStatusSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Article ID is required",
        }),
    }),
    body: zod_1.z.object({
        isFeatured: zod_1.z.boolean({
            required_error: "isFeatured is required",
        }),
    }),
});
// Bulk update validation schema
exports.bulkUpdateDynamicPagesArticleAndSeoSchema = zod_1.z.object({
    body: zod_1.z.object({
        ids: zod_1.z
            .array(zod_1.z.string())
            .min(1, "At least one ID is required")
            .max(100, "Cannot update more than 100 articles at once"),
        updateData: zod_1.z
            .record(zod_1.z.any())
            .refine((data) => Object.keys(data).length > 0, {
            message: "Update data is required",
        }),
    }),
});
// Bulk delete validation schema
exports.bulkDeleteDynamicPagesArticleAndSeoSchema = zod_1.z.object({
    body: zod_1.z.object({
        ids: zod_1.z
            .array(zod_1.z.string())
            .min(1, "At least one ID is required")
            .max(100, "Cannot delete more than 100 articles at once"),
    }),
});
exports.DynamicPagesArticleAndSeoValidation = {
    createDynamicPagesArticleAndSeoSchema: exports.createDynamicPagesArticleAndSeoSchema,
    updateDynamicPagesArticleAndSeoSchema: exports.updateDynamicPagesArticleAndSeoSchema,
    getDynamicPagesArticleAndSeoByIdSchema: exports.getDynamicPagesArticleAndSeoByIdSchema,
    getDynamicPagesArticleAndSeoBySlugSchema: exports.getDynamicPagesArticleAndSeoBySlugSchema,
    deleteDynamicPagesArticleAndSeoSchema: exports.deleteDynamicPagesArticleAndSeoSchema,
    getDynamicPagesArticleAndSeoByCategorySchema: exports.getDynamicPagesArticleAndSeoByCategorySchema,
    getRelatedDynamicPagesArticleAndSeoSchema: exports.getRelatedDynamicPagesArticleAndSeoSchema,
    updateSEOAnalyticsSchema: exports.updateSEOAnalyticsSchema,
    togglePublishStatusSchema: exports.togglePublishStatusSchema,
    toggleFeaturedStatusSchema: exports.toggleFeaturedStatusSchema,
    bulkUpdateDynamicPagesArticleAndSeoSchema: exports.bulkUpdateDynamicPagesArticleAndSeoSchema,
    bulkDeleteDynamicPagesArticleAndSeoSchema: exports.bulkDeleteDynamicPagesArticleAndSeoSchema,
};
