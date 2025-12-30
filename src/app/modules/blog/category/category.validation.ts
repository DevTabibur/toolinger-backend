import { z } from "zod";

// Create category validation schema
export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Category name is required",
      })
      .min(1, "Category name cannot be empty")
      .max(100, "Category name cannot exceed 100 characters"),
    slug: z
      .string({
        required_error: "Category slug is required",
      })
      .min(1, "Category slug cannot be empty")
      .max(100, "Category slug cannot exceed 100 characters"),
    description: z
      .string({
        required_error: "Category description is required",
      })
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description cannot exceed 500 characters"),
    image: z.string().optional(),
    seoTitle: z
      .string()
      .max(70, "SEO title cannot exceed 70 characters")
      .optional(),
    seoDescription: z
      .string()
      .max(160, "SEO description cannot exceed 160 characters")
      .optional(),
    seoKeywords: z.array(z.string()).optional(),
    seoImage: z.string().optional(),
    isActive: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
    parentCategory: z.string().optional(),
    order: z.number().int().min(0).default(0),
  }),
});

// Update category validation schema
export const updateCategorySchema = z.object({
  params: z.object({
    categoryId: z.string({
      required_error: "Category ID is required",
    }),
  }),
  body: z.object({
    name: z
      .string()
      .min(1, "Category name cannot be empty")
      .max(100, "Category name cannot exceed 100 characters")
      .optional(),
    slug: z
      .string()
      .min(1, "Category slug cannot be empty")
      .max(100, "Category slug cannot exceed 100 characters")
      .optional(),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description cannot exceed 500 characters")
      .optional(),
    image: z.string().optional(),
    seoTitle: z
      .string()
      .max(70, "SEO title cannot exceed 70 characters")
      .optional(),
    seoDescription: z
      .string()
      .max(160, "SEO description cannot exceed 160 characters")
      .optional(),
    seoKeywords: z.array(z.string()).optional(),
    seoImage: z.string().optional(),
    isActive: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    parentCategory: z.string().optional(),
    order: z.number().int().min(0).optional(),
  }),
});

// Update category SEO validation schema
export const updateCategorySEOSchema = z.object({
  params: z.object({
    categoryId: z.string({
      required_error: "Category ID is required",
    }),
  }),
  body: z.object({
    seoTitle: z
      .string()
      .max(70, "SEO title cannot exceed 70 characters")
      .optional(),
    seoDescription: z
      .string()
      .max(160, "SEO description cannot exceed 160 characters")
      .optional(),
    seoKeywords: z.array(z.string()).optional(),
    seoImage: z.string().optional(),
  }),
});

// Get category by ID validation schema
export const getCategoryByIdSchema = z.object({
  params: z.object({
    categoryId: z.string({
      required_error: "Category ID is required",
    }),
  }),
});

// Get category by slug validation schema
export const getCategoryBySlugSchema = z.object({
  params: z.object({
    slug: z.string({
      required_error: "Category slug is required",
    }),
  }),
});

// Get sub categories validation schema
export const getSubCategoriesSchema = z.object({
  params: z.object({
    parentCategoryId: z.string({
      required_error: "Parent category ID is required",
    }),
  }),
});

// Delete category validation schema
export const deleteCategorySchema = z.object({
  params: z.object({
    categoryId: z.string({
      required_error: "Category ID is required",
    }),
  }),
});

// Toggle category status validation schema
export const toggleCategoryStatusSchema = z.object({
  params: z.object({
    categoryId: z.string({
      required_error: "Category ID is required",
    }),
  }),
});
