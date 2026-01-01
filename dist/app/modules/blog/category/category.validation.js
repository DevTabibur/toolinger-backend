"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleCategoryStatusSchema = exports.deleteCategorySchema = exports.getSubCategoriesSchema = exports.getCategoryBySlugSchema = exports.getCategoryByIdSchema = exports.updateCategorySEOSchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
// Create category validation schema
exports.createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Category name is required",
        })
            .min(1, "Category name cannot be empty")
            .max(100, "Category name cannot exceed 100 characters"),
        slug: zod_1.z
            .string({
            required_error: "Category slug is required",
        })
            .min(1, "Category slug cannot be empty")
            .max(100, "Category slug cannot exceed 100 characters"),
        description: zod_1.z
            .string({
            required_error: "Category description is required",
        })
            .min(10, "Description must be at least 10 characters")
            .max(500, "Description cannot exceed 500 characters"),
        image: zod_1.z.string().optional(),
        seoTitle: zod_1.z
            .string()
            .max(70, "SEO title cannot exceed 70 characters")
            .optional(),
        seoDescription: zod_1.z
            .string()
            .max(160, "SEO description cannot exceed 160 characters")
            .optional(),
        seoKeywords: zod_1.z.array(zod_1.z.string()).optional(),
        seoImage: zod_1.z.string().optional(),
        isActive: zod_1.z.boolean().default(true),
        isFeatured: zod_1.z.boolean().default(false),
        parentCategory: zod_1.z.string().optional(),
        order: zod_1.z.number().int().min(0).default(0),
    }),
});
// Update category validation schema
exports.updateCategorySchema = zod_1.z.object({
    params: zod_1.z.object({
        categoryId: zod_1.z.string({
            required_error: "Category ID is required",
        }),
    }),
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1, "Category name cannot be empty")
            .max(100, "Category name cannot exceed 100 characters")
            .optional(),
        slug: zod_1.z
            .string()
            .min(1, "Category slug cannot be empty")
            .max(100, "Category slug cannot exceed 100 characters")
            .optional(),
        description: zod_1.z
            .string()
            .min(10, "Description must be at least 10 characters")
            .max(500, "Description cannot exceed 500 characters")
            .optional(),
        image: zod_1.z.string().optional(),
        seoTitle: zod_1.z
            .string()
            .max(70, "SEO title cannot exceed 70 characters")
            .optional(),
        seoDescription: zod_1.z
            .string()
            .max(160, "SEO description cannot exceed 160 characters")
            .optional(),
        seoKeywords: zod_1.z.array(zod_1.z.string()).optional(),
        seoImage: zod_1.z.string().optional(),
        isActive: zod_1.z.boolean().optional(),
        isFeatured: zod_1.z.boolean().optional(),
        parentCategory: zod_1.z.string().optional(),
        order: zod_1.z.number().int().min(0).optional(),
    }),
});
// Update category SEO validation schema
exports.updateCategorySEOSchema = zod_1.z.object({
    params: zod_1.z.object({
        categoryId: zod_1.z.string({
            required_error: "Category ID is required",
        }),
    }),
    body: zod_1.z.object({
        seoTitle: zod_1.z
            .string()
            .max(70, "SEO title cannot exceed 70 characters")
            .optional(),
        seoDescription: zod_1.z
            .string()
            .max(160, "SEO description cannot exceed 160 characters")
            .optional(),
        seoKeywords: zod_1.z.array(zod_1.z.string()).optional(),
        seoImage: zod_1.z.string().optional(),
    }),
});
// Get category by ID validation schema
exports.getCategoryByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        categoryId: zod_1.z.string({
            required_error: "Category ID is required",
        }),
    }),
});
// Get category by slug validation schema
exports.getCategoryBySlugSchema = zod_1.z.object({
    params: zod_1.z.object({
        slug: zod_1.z.string({
            required_error: "Category slug is required",
        }),
    }),
});
// Get sub categories validation schema
exports.getSubCategoriesSchema = zod_1.z.object({
    params: zod_1.z.object({
        parentCategoryId: zod_1.z.string({
            required_error: "Parent category ID is required",
        }),
    }),
});
// Delete category validation schema
exports.deleteCategorySchema = zod_1.z.object({
    params: zod_1.z.object({
        categoryId: zod_1.z.string({
            required_error: "Category ID is required",
        }),
    }),
});
// Toggle category status validation schema
exports.toggleCategoryStatusSchema = zod_1.z.object({
    params: zod_1.z.object({
        categoryId: zod_1.z.string({
            required_error: "Category ID is required",
        }),
    }),
});
