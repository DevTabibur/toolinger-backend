import { z } from "zod";

// Create dynamic pages article and SEO validation schema
export const createDynamicPagesArticleAndSeoSchema = z.object({
  body: z.object({
    slug: z
      .string({
        required_error: "Slug is required",
      })
      .min(1, "Slug cannot be empty")
      .max(100, "Slug cannot exceed 100 characters")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug can only contain lowercase letters, numbers, and hyphens",
      ),
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(1, "Title cannot be empty")
      .max(200, "Title cannot exceed 200 characters"),
    content: z
      .string({
        required_error: "Content is required",
      })
      .min(10, "Content must be at least 10 characters"),
    excerpt: z
      .string()
      .max(160, "Excerpt cannot exceed 160 characters")
      .optional(),
    author: z
      .string({
        required_error: "Author is required",
      })
      .min(1, "Author cannot be empty")
      .max(100, "Author cannot exceed 100 characters"),
    categories: z
      .array(z.string())
      .min(1, "At least one category is required")
      .max(10, "Cannot exceed 10 categories"),
    tags: z.array(z.string()).max(20, "Cannot exceed 20 tags").optional(),
    image: z.string().url("Invalid image URL").optional(),
    seoTitle: z
      .string()
      .max(70, "SEO title cannot exceed 70 characters")
      .optional(),
    seoDescription: z
      .string()
      .max(160, "SEO description cannot exceed 160 characters")
      .optional(),
    seoKeywords: z
      .array(z.string())
      .max(15, "Cannot exceed 15 SEO keywords")
      .optional(),
    seoImage: z.string().url("Invalid SEO image URL").optional(),
    isPublished: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
    metaTitle: z
      .string({
        required_error: "Meta title is required",
      })
      .min(1, "Meta title cannot be empty")
      .max(60, "Meta title cannot exceed 60 characters"),
    metaDescription: z
      .string({
        required_error: "Meta description is required",
      })
      .min(1, "Meta description cannot be empty")
      .max(160, "Meta description cannot exceed 160 characters"),
    canonicalUrl: z
      .string({
        required_error: "Canonical URL is required",
      })
      .url("Invalid canonical URL"),
    pageType: z.enum(
      [
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
      ],
      {
        required_error: "Page type is required",
      },
    ),
    toolCategory: z.enum(
      [
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
      ],
      {
        required_error: "Tool category is required",
      },
    ),
    relatedTools: z
      .array(z.string())
      .max(20, "Cannot exceed 20 related tools")
      .optional(),
    usageInstructions: z
      .string({
        required_error: "Usage instructions are required",
      })
      .min(10, "Usage instructions must be at least 10 characters"),
    features: z
      .array(z.string())
      .max(20, "Cannot exceed 20 features")
      .optional(),
    benefits: z
      .array(z.string())
      .max(20, "Cannot exceed 20 benefits")
      .optional(),
    // Additional SEO fields
    ogTitle: z
      .string()
      .max(70, "Open Graph title cannot exceed 70 characters")
      .optional(),
    ogDescription: z
      .string()
      .max(160, "Open Graph description cannot exceed 160 characters")
      .optional(),
    ogImage: z.string().url("Invalid Open Graph image URL").optional(),
    twitterTitle: z
      .string()
      .max(70, "Twitter title cannot exceed 70 characters")
      .optional(),
    twitterDescription: z
      .string()
      .max(160, "Twitter description cannot exceed 160 characters")
      .optional(),
    twitterImage: z.string().url("Invalid Twitter image URL").optional(),
    structuredData: z.record(z.any()).optional(),
    breadcrumbData: z.record(z.any()).optional(),
    priority: z
      .number()
      .min(0.0, "Priority must be at least 0.0")
      .max(1.0, "Priority cannot exceed 1.0")
      .default(0.5),
    changeFreq: z
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
    isIndexed: z.boolean().default(true),
    robotsDirective: z
      .enum([
        "index,follow",
        "noindex,follow",
        "index,nofollow",
        "noindex,nofollow",
      ])
      .default("index,follow"),
    schemaMarkup: z.record(z.any()).optional(),
    internalLinks: z
      .array(z.string())
      .max(50, "Cannot exceed 50 internal links")
      .optional(),
    externalLinks: z
      .array(z.string())
      .max(50, "Cannot exceed 50 external links")
      .optional(),
    mobileFriendly: z.boolean().default(true),
  }),
});

// Update dynamic pages article and SEO validation schema
export const updateDynamicPagesArticleAndSeoSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Article ID is required",
    }),
  }),
  body: z.object({
    slug: z
      .string()
      .min(1, "Slug cannot be empty")
      .max(100, "Slug cannot exceed 100 characters")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug can only contain lowercase letters, numbers, and hyphens",
      )
      .optional(),
    title: z
      .string()
      .min(1, "Title cannot be empty")
      .max(200, "Title cannot exceed 200 characters")
      .optional(),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters")
      .optional(),
    excerpt: z
      .string()
      .max(160, "Excerpt cannot exceed 160 characters")
      .optional(),
    author: z
      .string()
      .min(1, "Author cannot be empty")
      .max(100, "Author cannot exceed 100 characters")
      .optional(),
    categories: z
      .array(z.string())
      .min(1, "At least one category is required")
      .max(10, "Cannot exceed 10 categories")
      .optional(),
    tags: z.array(z.string()).max(20, "Cannot exceed 20 tags").optional(),
    image: z.string().url("Invalid image URL").optional(),
    seoTitle: z
      .string()
      .max(70, "SEO title cannot exceed 70 characters")
      .optional(),
    seoDescription: z
      .string()
      .max(160, "SEO description cannot exceed 160 characters")
      .optional(),
    seoKeywords: z
      .array(z.string())
      .max(15, "Cannot exceed 15 SEO keywords")
      .optional(),
    seoImage: z.string().url("Invalid SEO image URL").optional(),
    isPublished: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    metaTitle: z
      .string()
      .min(1, "Meta title cannot be empty")
      .max(60, "Meta title cannot exceed 60 characters")
      .optional(),
    metaDescription: z
      .string()
      .min(1, "Meta description cannot be empty")
      .max(160, "Meta description cannot exceed 160 characters")
      .optional(),
    canonicalUrl: z.string().url("Invalid canonical URL").optional(),
    pageType: z
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
    toolCategory: z
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
    relatedTools: z
      .array(z.string())
      .max(20, "Cannot exceed 20 related tools")
      .optional(),
    usageInstructions: z
      .string()
      .min(10, "Usage instructions must be at least 10 characters")
      .optional(),
    features: z
      .array(z.string())
      .max(20, "Cannot exceed 20 features")
      .optional(),
    benefits: z
      .array(z.string())
      .max(20, "Cannot exceed 20 benefits")
      .optional(),
    ogTitle: z
      .string()
      .max(70, "Open Graph title cannot exceed 70 characters")
      .optional(),
    ogDescription: z
      .string()
      .max(160, "Open Graph description cannot exceed 160 characters")
      .optional(),
    ogImage: z.string().url("Invalid Open Graph image URL").optional(),
    twitterTitle: z
      .string()
      .max(70, "Twitter title cannot exceed 70 characters")
      .optional(),
    twitterDescription: z
      .string()
      .max(160, "Twitter description cannot exceed 160 characters")
      .optional(),
    twitterImage: z.string().url("Invalid Twitter image URL").optional(),
    structuredData: z.record(z.any()).optional(),
    breadcrumbData: z.record(z.any()).optional(),
    priority: z
      .number()
      .min(0.0, "Priority must be at least 0.0")
      .max(1.0, "Priority cannot exceed 1.0")
      .optional(),
    changeFreq: z
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
    isIndexed: z.boolean().optional(),
    robotsDirective: z
      .enum([
        "index,follow",
        "noindex,follow",
        "index,nofollow",
        "noindex,nofollow",
      ])
      .optional(),
    schemaMarkup: z.record(z.any()).optional(),
    internalLinks: z
      .array(z.string())
      .max(50, "Cannot exceed 50 internal links")
      .optional(),
    externalLinks: z
      .array(z.string())
      .max(50, "Cannot exceed 50 external links")
      .optional(),
    mobileFriendly: z.boolean().optional(),
  }),
});

// Get dynamic pages article by ID validation schema
export const getDynamicPagesArticleAndSeoByIdSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Article ID is required",
    }),
  }),
});

// Get dynamic pages article by slug validation schema
export const getDynamicPagesArticleAndSeoBySlugSchema = z.object({
  params: z.object({
    slug: z.string({
      required_error: "Slug is required",
    }),
  }),
});

// Delete dynamic pages article validation schema
export const deleteDynamicPagesArticleAndSeoSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Article ID is required",
    }),
  }),
});

// Get dynamic pages article by category validation schema
export const getDynamicPagesArticleAndSeoByCategorySchema = z.object({
  params: z.object({
    category: z.string({
      required_error: "Category is required",
    }),
  }),
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});

// Get related dynamic pages article validation schema
export const getRelatedDynamicPagesArticleAndSeoSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Article ID is required",
    }),
  }),
  query: z.object({
    limit: z.string().optional(),
  }),
});

// Update SEO analytics validation schema
export const updateSEOAnalyticsSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Article ID is required",
    }),
  }),
  body: z.object({
    pageViews: z.number().min(0, "Page views must be non-negative").optional(),
    uniqueVisitors: z
      .number()
      .min(0, "Unique visitors must be non-negative")
      .optional(),
    socialShares: z
      .object({
        facebook: z
          .number()
          .min(0, "Facebook shares must be non-negative")
          .optional(),
        twitter: z
          .number()
          .min(0, "Twitter shares must be non-negative")
          .optional(),
        linkedin: z
          .number()
          .min(0, "LinkedIn shares must be non-negative")
          .optional(),
        pinterest: z
          .number()
          .min(0, "Pinterest shares must be non-negative")
          .optional(),
      })
      .optional(),
  }),
});

// Toggle publish status validation schema
export const togglePublishStatusSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Article ID is required",
    }),
  }),
  body: z.object({
    isPublished: z.boolean({
      required_error: "isPublished is required",
    }),
  }),
});

// Toggle featured status validation schema
export const toggleFeaturedStatusSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Article ID is required",
    }),
  }),
  body: z.object({
    isFeatured: z.boolean({
      required_error: "isFeatured is required",
    }),
  }),
});

// Bulk update validation schema
export const bulkUpdateDynamicPagesArticleAndSeoSchema = z.object({
  body: z.object({
    ids: z
      .array(z.string())
      .min(1, "At least one ID is required")
      .max(100, "Cannot update more than 100 articles at once"),
    updateData: z
      .record(z.any())
      .refine((data) => Object.keys(data).length > 0, {
        message: "Update data is required",
      }),
  }),
});

// Bulk delete validation schema
export const bulkDeleteDynamicPagesArticleAndSeoSchema = z.object({
  body: z.object({
    ids: z
      .array(z.string())
      .min(1, "At least one ID is required")
      .max(100, "Cannot delete more than 100 articles at once"),
  }),
});

export const DynamicPagesArticleAndSeoValidation = {
  createDynamicPagesArticleAndSeoSchema,
  updateDynamicPagesArticleAndSeoSchema,
  getDynamicPagesArticleAndSeoByIdSchema,
  getDynamicPagesArticleAndSeoBySlugSchema,
  deleteDynamicPagesArticleAndSeoSchema,
  getDynamicPagesArticleAndSeoByCategorySchema,
  getRelatedDynamicPagesArticleAndSeoSchema,
  updateSEOAnalyticsSchema,
  togglePublishStatusSchema,
  toggleFeaturedStatusSchema,
  bulkUpdateDynamicPagesArticleAndSeoSchema,
  bulkDeleteDynamicPagesArticleAndSeoSchema,
};
