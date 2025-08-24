# Category Module

This module handles blog category management with full CRUD operations, SEO optimization, and hierarchical category support.

## Features

- ✅ Create, Read, Update, Delete categories
- ✅ SEO optimization (title, description, keywords, images)
- ✅ Hierarchical categories (parent-child relationships)
- ✅ Featured categories
- ✅ Category status management (active/inactive)
- ✅ Category ordering
- ✅ Slug-based routing
- ✅ File upload support for images

## API Endpoints

### Create Category
```
POST /api/category
Content-Type: multipart/form-data

Body:
- name: string (required)
- slug: string (required)
- description: string (required)
- image: file (optional)
- seoTitle: string (optional)
- seoDescription: string (optional)
- seoKeywords: string[] (optional)
- seoImage: file (optional)
- isActive: boolean (default: true)
- isFeatured: boolean (default: false)
- parentCategory: string (optional)
- order: number (default: 0)
```

### Get All Categories
```
GET /api/category
```

### Get Featured Categories
```
GET /api/category/featured
```

### Get Category by ID
```
GET /api/category/:categoryId
```

### Get Category by Slug
```
GET /api/category/slug/:slug
```

### Get Sub Categories
```
GET /api/category/subcategories/:parentCategoryId
```

### Get Category Hierarchy
```
GET /api/category/hierarchy
```

### Update Category
```
PATCH /api/category/:categoryId
Content-Type: multipart/form-data

Body: (all fields optional)
- name: string
- slug: string
- description: string
- image: file
- seoTitle: string
- seoDescription: string
- seoKeywords: string[]
- seoImage: file
- isActive: boolean
- isFeatured: boolean
- parentCategory: string
- order: number
```

### Update Category SEO
```
PATCH /api/category/:categoryId/seo

Body:
- seoTitle: string (optional)
- seoDescription: string (optional)
- seoKeywords: string[] (optional)
- seoImage: string (optional)
```

### Toggle Category Status
```
PATCH /api/category/:categoryId/toggle-status
```

### Delete Category
```
DELETE /api/category/:categoryId
```

## Data Structure

### Category Interface
```typescript
interface ICategory {
  name: string;                      // Category name
  slug: string;                      // SEO-friendly URL
  description: string;               // Category description
  image: string;                     // Category image URL
  seoTitle: string;                  // Custom SEO title
  seoDescription: string;            // Custom SEO description
  seoKeywords: string[];             // Keywords for SEO
  seoImage: string;                  // Image for SEO (e.g., Open Graph)
  isActive: boolean;                 // Whether the category is active
  isFeatured: boolean;               // Mark as featured category
  parentCategory?: string;           // Parent category ID (for hierarchical categories)
  order: number;                     // Display order
  createdAt: Date;                   // Date created
  updatedAt: Date;                   // Last update date
}
```

## Common Category Types

The module includes predefined category types in `category.constant.ts`:

- Technology, Business, Lifestyle, Health, Education
- Entertainment, Sports, Travel, Food, Fashion
- Science, Politics, Finance, Automotive, Real Estate
- Gaming, Music, Movies, Books, Art, Photography
- And many more...

## Usage Examples

### Create a Technology Category
```javascript
const categoryData = {
  name: "Technology",
  slug: "technology",
  description: "Latest technology news, reviews, and insights",
  seoTitle: "Technology News & Reviews",
  seoDescription: "Stay updated with the latest technology trends, reviews, and insights",
  seoKeywords: ["technology", "tech news", "reviews", "gadgets"],
  isFeatured: true,
  order: 1
};
```

### Create a Sub-Category
```javascript
const subCategoryData = {
  name: "Mobile Technology",
  slug: "mobile-technology",
  description: "Mobile phones, tablets, and mobile apps",
  parentCategory: "parentCategoryId",
  order: 1
};
```

## Error Handling

The module includes comprehensive error handling for:
- Invalid category IDs
- Missing required fields
- Duplicate names/slugs
- Invalid parent category references
- File upload errors

## Validation

All endpoints include Zod validation schemas for:
- Required field validation
- String length limits
- Data type validation
- URL format validation
- Array validation

## File Structure

```
src/app/modules/category/
├── category.interface.ts    # TypeScript interfaces
├── category.model.ts        # Mongoose model
├── category.service.ts      # Business logic
├── category.controller.ts   # Request handlers
├── category.routes.ts       # Route definitions
├── category.constant.ts     # Constants and messages
├── category.validation.ts   # Zod validation schemas
└── README.md               # This documentation
```
