# Dynamic Pages Article and SEO Module

A comprehensive module for managing dynamic pages with articles and SEO optimization features.

## Features

- **Dynamic Page Management**: Create, read, update, and delete dynamic pages with articles
- **SEO Optimization**: Comprehensive SEO fields including meta tags, Open Graph, Twitter Cards
- **Analytics Tracking**: Track page views, social shares, and other metrics
- **Content Management**: Rich content with categories, tags, and related tools
- **Publishing Workflow**: Draft/publish status management
- **Bulk Operations**: Bulk update and delete functionality
- **Sitemap Generation**: Automatic sitemap data generation
- **Search & Filtering**: Advanced search and filtering capabilities

## API Endpoints

### Public Endpoints (No Authentication Required)

#### GET `/dynamic-pages-article-and-seo`
Get all dynamic pages articles with pagination and filtering
- **Query Parameters:**
  - `page` (number): Page number (default: 1)
  - `limit` (number): Items per page (default: 10)
  - `sortBy` (string): Sort field
  - `sortOrder` (string): Sort order (asc/desc)
  - `searchTerm` (string): Search in title, content, excerpt
  - `pageType` (string): Filter by page type
  - `toolCategory` (string): Filter by tool category
  - `isPublished` (boolean): Filter by publish status
  - `isFeatured` (boolean): Filter by featured status
  - `author` (string): Filter by author
  - `categories` (string[]): Filter by categories
  - `tags` (string[]): Filter by tags

#### GET `/dynamic-pages-article-and-seo/featured`
Get featured dynamic pages articles
- **Query Parameters:**
  - `limit` (number): Number of articles to return (default: 10)

#### GET `/dynamic-pages-article-and-seo/slug/:slug`
Get dynamic page article by slug
- **Parameters:**
  - `slug` (string): Article slug

#### GET `/dynamic-pages-article-and-seo/category/:category`
Get dynamic pages articles by category
- **Parameters:**
  - `category` (string): Category name
- **Query Parameters:**
  - `page` (number): Page number
  - `limit` (number): Items per page
  - `sortBy` (string): Sort field
  - `sortOrder` (string): Sort order

#### GET `/dynamic-pages-article-and-seo/related/:id`
Get related dynamic pages articles
- **Parameters:**
  - `id` (string): Article ID
- **Query Parameters:**
  - `limit` (number): Number of related articles (default: 5)

#### GET `/dynamic-pages-article-and-seo/sitemap`
Get sitemap data for all published articles

### Protected Endpoints (Authentication Required)

#### POST `/dynamic-pages-article-and-seo`
Create a new dynamic page article with SEO
- **Body:** Article data (see schema below)

#### GET `/dynamic-pages-article-and-seo/:id`
Get dynamic page article by ID
- **Parameters:**
  - `id` (string): Article ID

#### PATCH `/dynamic-pages-article-and-seo/:id`
Update dynamic page article by ID
- **Parameters:**
  - `id` (string): Article ID
- **Body:** Update data

#### DELETE `/dynamic-pages-article-and-seo/:id`
Delete dynamic page article by ID
- **Parameters:**
  - `id` (string): Article ID

#### PATCH `/dynamic-pages-article-and-seo/:id/analytics`
Update SEO analytics for an article
- **Parameters:**
  - `id` (string): Article ID
- **Body:**
  ```json
  {
    "pageViews": 100,
    "uniqueVisitors": 50,
    "socialShares": {
      "facebook": 10,
      "twitter": 5,
      "linkedin": 3,
      "pinterest": 2
    }
  }
  ```

#### PATCH `/dynamic-pages-article-and-seo/:id/publish`
Toggle publish status
- **Parameters:**
  - `id` (string): Article ID
- **Body:**
  ```json
  {
    "isPublished": true
  }
  ```

#### PATCH `/dynamic-pages-article-and-seo/:id/feature`
Toggle featured status
- **Parameters:**
  - `id` (string): Article ID
- **Body:**
  ```json
  {
    "isFeatured": true
  }
  ```

#### PATCH `/dynamic-pages-article-and-seo/bulk/update`
Bulk update articles
- **Body:**
  ```json
  {
    "ids": ["id1", "id2", "id3"],
    "updateData": {
      "isPublished": true,
      "categories": ["new-category"]
    }
  }
  ```

#### DELETE `/dynamic-pages-article-and-seo/bulk/delete`
Bulk delete articles
- **Body:**
  ```json
  {
    "ids": ["id1", "id2", "id3"]
  }
  ```

## Data Schema

### Article Structure

```typescript
interface IDynamicPagesArticleAndSeo {
  // Basic Information
  slug: string;                       // URL slug
  title: string;                      // Article title
  content: string;                    // Article content (HTML)
  excerpt: string;                    // Short summary
  author: string;                     // Author name
  publishedAt: Date;                  // Publication date
  updatedAt: Date;                    // Last update date
  
  // Categorization
  categories: string[];               // Categories
  tags: string[];                     // Tags
  pageType: string;                   // Type of page
  toolCategory: string;               // Tool category
  relatedTools: string[];             // Related tool slugs
  
  // Content Details
  usageInstructions: string;          // How to use the tool
  features: string[];                 // Key features
  benefits: string[];                 // Benefits
  
  // Media
  image: string;                      // Featured image URL
  seoImage: string;                   // SEO image URL
  
  // SEO Fields
  seoTitle: string;                   // Custom SEO title
  seoDescription: string;             // Custom SEO description
  seoKeywords: string[];              // SEO keywords
  metaTitle: string;                  // Meta title
  metaDescription: string;            // Meta description
  canonicalUrl: string;               // Canonical URL
  
  // Social Media
  ogTitle: string;                    // Open Graph title
  ogDescription: string;              // Open Graph description
  ogImage: string;                    // Open Graph image
  twitterTitle: string;               // Twitter Card title
  twitterDescription: string;         // Twitter Card description
  twitterImage: string;               // Twitter Card image
  
  // Status
  isPublished: boolean;               // Published status
  isFeatured: boolean;                // Featured status
  isIndexed: boolean;                 // Search engine indexing
  
  // SEO Settings
  priority: number;                   // Sitemap priority (0.0-1.0)
  changeFreq: string;                 // Sitemap change frequency
  robotsDirective: string;            // Robots meta directive
  
  // Structured Data
  structuredData: object;             // JSON-LD structured data
  breadcrumbData: object;             // Breadcrumb data
  schemaMarkup: object;               // Schema.org markup
  
  // Analytics
  readingTime: number;                // Reading time in minutes
  wordCount: number;                  // Word count
  seoScore: number;                   // SEO optimization score
  pageSpeed: number;                  // Page speed score
  mobileFriendly: boolean;            // Mobile-friendly status
  accessibilityScore: number;         // Accessibility score
  
  // Links
  internalLinks: string[];            // Internal links
  externalLinks: string[];            // External links
  
  // Social Analytics
  socialShares: {
    facebook: number;
    twitter: number;
    linkedin: number;
    pinterest: number;
  };
  
  // Page Analytics
  analytics: {
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    avgTimeOnPage: number;
  };
}
```

## Validation Rules

### Required Fields
- `slug`: Unique, lowercase, alphanumeric with hyphens
- `title`: 1-200 characters
- `content`: Minimum 10 characters
- `author`: 1-100 characters
- `categories`: At least one category
- `metaTitle`: 1-60 characters
- `metaDescription`: 1-160 characters
- `canonicalUrl`: Valid URL
- `pageType`: One of predefined types
- `toolCategory`: One of predefined categories
- `usageInstructions`: Minimum 10 characters

### Optional Fields with Limits
- `excerpt`: Maximum 160 characters
- `tags`: Maximum 20 tags
- `seoTitle`: Maximum 70 characters
- `seoDescription`: Maximum 160 characters
- `seoKeywords`: Maximum 15 keywords
- `relatedTools`: Maximum 20 tools
- `features`: Maximum 20 features
- `benefits`: Maximum 20 benefits
- `internalLinks`: Maximum 50 links
- `externalLinks`: Maximum 50 links

### Enums

#### Page Types
- `tool`
- `calculator`
- `converter`
- `generator`
- `analyzer`
- `formatter`
- `encoder`
- `decoder`
- `checker`
- `validator`
- `other`

#### Tool Categories
- `text-tools`
- `image-tools`
- `video-tools`
- `audio-tools`
- `file-tools`
- `web-tools`
- `developer-tools`
- `seo-tools`
- `social-media-tools`
- `business-tools`
- `education-tools`
- `other`

#### Change Frequencies
- `always`
- `hourly`
- `daily`
- `weekly`
- `monthly`
- `yearly`
- `never`

#### Robots Directives
- `index,follow`
- `noindex,follow`
- `index,nofollow`
- `noindex,nofollow`

## Usage Examples

### Create a New Article

```javascript
const articleData = {
  slug: "word-counter-tool",
  title: "Free Word Counter Tool - Count Words, Characters, and More",
  content: "<p>This is a comprehensive word counter tool...</p>",
  excerpt: "Count words, characters, sentences, and paragraphs with our free online word counter tool.",
  author: "John Doe",
  categories: ["text-tools", "writing-tools"],
  tags: ["word counter", "character count", "text analysis"],
  pageType: "tool",
  toolCategory: "text-tools",
  metaTitle: "Free Word Counter Tool - Count Words Online",
  metaDescription: "Free online word counter tool. Count words, characters, sentences, and paragraphs instantly.",
  canonicalUrl: "https://example.com/tools/word-counter",
  usageInstructions: "Simply paste your text into the input field and get instant word count statistics.",
  features: ["Real-time counting", "Multiple metrics", "No registration required"],
  benefits: ["Save time", "Improve writing", "Track progress"],
  isPublished: true,
  priority: 0.8,
  changeFreq: "weekly"
};
```

### Update Analytics

```javascript
const analyticsData = {
  pageViews: 150,
  uniqueVisitors: 75,
  socialShares: {
    facebook: 5,
    twitter: 3,
    linkedin: 2,
    pinterest: 1
  }
};
```

### Bulk Operations

```javascript
// Bulk publish articles
const bulkUpdateData = {
  ids: ["article1", "article2", "article3"],
  updateData: {
    isPublished: true,
    categories: ["featured-tools"]
  }
};

// Bulk delete articles
const bulkDeleteData = {
  ids: ["article1", "article2"]
};
```

## Error Handling

The module includes comprehensive error handling for:
- Invalid article IDs
- Missing required fields
- Duplicate slugs
- Invalid data types
- Validation errors
- Bulk operation limits

## Performance Features

- **Database Indexes**: Optimized indexes for common queries
- **Pagination**: Efficient pagination for large datasets
- **Search**: Full-text search capabilities
- **Caching**: Built-in caching for frequently accessed data
- **Bulk Operations**: Efficient bulk update and delete operations

## SEO Features

- **Automatic SEO Score Calculation**: Based on various SEO factors
- **Structured Data**: JSON-LD schema markup support
- **Social Media Optimization**: Open Graph and Twitter Card support
- **Sitemap Generation**: Automatic sitemap data
- **Analytics Tracking**: Comprehensive analytics tracking
- **Mobile Optimization**: Mobile-friendly status tracking

## File Structure

```
src/app/modules/dynamic-pages-article-and-seo/
├── dynamic-pages-article-and-seo.interface.ts    # TypeScript interfaces
├── dynamic-pages-article-and-seo.model.ts        # Mongoose model
├── dynamic-pages-article-and-seo.service.ts      # Business logic
├── dynamic-pages-article-and-seo.controller.ts   # Request handlers
├── dynamic-pages-article-and-seo.routes.ts       # Route definitions
├── dynamic-pages-article-and-seo.validation.ts   # Zod validation schemas
├── dynamic-pages-article-and-seo.constant.ts     # Constants and messages
└── README.md                                     # This documentation
```
