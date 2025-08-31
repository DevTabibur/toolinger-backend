# Dynamic Pages Article and SEO API Examples

This file contains practical examples of how to use the Dynamic Pages Article and SEO API endpoints.

## Base URL
```
http://localhost:5000/api/v1/dynamic-pages-article-and-seo
```

## Authentication
For protected endpoints, include the authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Examples

### 1. Create a New Article

**POST** `/dynamic-pages-article-and-seo`

```json
{
  "slug": "word-counter-tool",
  "title": "Free Word Counter Tool - Count Words, Characters, and More",
  "content": "<p>This is a comprehensive word counter tool that helps you count words, characters, sentences, and paragraphs in your text. Perfect for writers, students, and professionals who need to meet specific word count requirements.</p><h2>Features</h2><ul><li>Real-time word counting</li><li>Character count with and without spaces</li><li>Sentence and paragraph counting</li><li>Reading time estimation</li></ul>",
  "excerpt": "Count words, characters, sentences, and paragraphs with our free online word counter tool. Perfect for writers, students, and professionals.",
  "author": "John Doe",
  "categories": ["text-tools", "writing-tools"],
  "tags": ["word counter", "character count", "text analysis", "writing tools"],
  "image": "https://example.com/images/word-counter.jpg",
  "seoTitle": "Free Word Counter Tool - Count Words Online",
  "seoDescription": "Free online word counter tool. Count words, characters, sentences, and paragraphs instantly. Perfect for writers and students.",
  "seoKeywords": ["word counter", "character count", "text analysis", "online tool"],
  "seoImage": "https://example.com/images/word-counter-seo.jpg",
  "isPublished": true,
  "isFeatured": false,
  "metaTitle": "Free Word Counter Tool - Count Words Online",
  "metaDescription": "Free online word counter tool. Count words, characters, sentences, and paragraphs instantly.",
  "canonicalUrl": "https://example.com/tools/word-counter",
  "pageType": "tool",
  "toolCategory": "text-tools",
  "relatedTools": ["text-to-speech", "grammar-checker", "plagiarism-checker"],
  "usageInstructions": "Simply paste your text into the input field and get instant word count statistics. The tool will automatically count words, characters, sentences, and paragraphs.",
  "features": [
    "Real-time counting",
    "Multiple metrics",
    "No registration required",
    "Mobile friendly",
    "Free to use"
  ],
  "benefits": [
    "Save time on word counting",
    "Improve writing efficiency",
    "Track writing progress",
    "Meet word count requirements"
  ],
  "ogTitle": "Free Word Counter Tool - Count Words Online",
  "ogDescription": "Count words, characters, sentences, and paragraphs with our free online word counter tool.",
  "ogImage": "https://example.com/images/word-counter-og.jpg",
  "twitterTitle": "Free Word Counter Tool - Count Words Online",
  "twitterDescription": "Count words, characters, sentences, and paragraphs with our free online word counter tool.",
  "twitterImage": "https://example.com/images/word-counter-twitter.jpg",
  "structuredData": {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Word Counter Tool",
    "description": "Free online word counter tool"
  },
  "breadcrumbData": {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://example.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://example.com/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Word Counter",
        "item": "https://example.com/tools/word-counter"
      }
    ]
  },
  "priority": 0.8,
  "changeFreq": "weekly",
  "isIndexed": true,
  "robotsDirective": "index,follow",
  "schemaMarkup": {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Word Counter Tool",
    "description": "Free online word counter tool"
  },
  "internalLinks": ["/tools/text-to-speech", "/tools/grammar-checker"],
  "externalLinks": ["https://wikipedia.org/wiki/Word_count"],
  "mobileFriendly": true
}
```

### 2. Get All Articles with Pagination

**GET** `/dynamic-pages-article-and-seo?page=1&limit=10&sortBy=publishedAt&sortOrder=desc`

**Response:**
```json
{
  "status": "true",
  "statusCode": 200,
  "message": "Dynamic pages articles with SEO fetched successfully",
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "slug": "word-counter-tool",
      "title": "Free Word Counter Tool - Count Words, Characters, and More",
      "excerpt": "Count words, characters, sentences, and paragraphs with our free online word counter tool.",
      "author": "John Doe",
      "publishedAt": "2024-01-15T10:30:00.000Z",
      "categories": ["text-tools", "writing-tools"],
      "tags": ["word counter", "character count", "text analysis"],
      "isPublished": true,
      "isFeatured": false,
      "seoScore": 85,
      "readingTime": 3,
      "wordCount": 600,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```

### 3. Get Article by Slug

**GET** `/dynamic-pages-article-and-seo/slug/word-counter-tool`

**Response:**
```json
{
  "status": "true",
  "statusCode": 200,
  "message": "Dynamic page article fetched successfully by slug",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "slug": "word-counter-tool",
    "title": "Free Word Counter Tool - Count Words, Characters, and More",
    "content": "<p>This is a comprehensive word counter tool...</p>",
    "excerpt": "Count words, characters, sentences, and paragraphs with our free online word counter tool.",
    "author": "John Doe",
    "publishedAt": "2024-01-15T10:30:00.000Z",
    "categories": ["text-tools", "writing-tools"],
    "tags": ["word counter", "character count", "text analysis"],
    "image": "https://example.com/images/word-counter.jpg",
    "seoTitle": "Free Word Counter Tool - Count Words Online",
    "seoDescription": "Free online word counter tool. Count words, characters, sentences, and paragraphs instantly.",
    "seoKeywords": ["word counter", "character count", "text analysis"],
    "isPublished": true,
    "isFeatured": false,
    "metaTitle": "Free Word Counter Tool - Count Words Online",
    "metaDescription": "Free online word counter tool. Count words, characters, sentences, and paragraphs instantly.",
    "canonicalUrl": "https://example.com/tools/word-counter",
    "pageType": "tool",
    "toolCategory": "text-tools",
    "relatedTools": ["text-to-speech", "grammar-checker"],
    "usageInstructions": "Simply paste your text into the input field and get instant word count statistics.",
    "features": ["Real-time counting", "Multiple metrics", "No registration required"],
    "benefits": ["Save time", "Improve writing", "Track progress"],
    "seoScore": 85,
    "readingTime": 3,
    "wordCount": 600,
    "analytics": {
      "pageViews": 150,
      "uniqueVisitors": 75,
      "bounceRate": 25,
      "avgTimeOnPage": 120
    },
    "socialShares": {
      "facebook": 10,
      "twitter": 5,
      "linkedin": 3,
      "pinterest": 2
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Update Article

**PATCH** `/dynamic-pages-article-and-seo/64f8a1b2c3d4e5f6a7b8c9d0`

```json
{
  "title": "Updated Word Counter Tool - Enhanced Features",
  "isFeatured": true,
  "seoKeywords": ["word counter", "character count", "text analysis", "writing tool", "online counter"],
  "features": [
    "Real-time counting",
    "Multiple metrics",
    "No registration required",
    "Mobile friendly",
    "Free to use",
    "Export results"
  ]
}
```

### 5. Update Analytics

**PATCH** `/dynamic-pages-article-and-seo/64f8a1b2c3d4e5f6a7b8c9d0/analytics`

```json
{
  "pageViews": 50,
  "uniqueVisitors": 25,
  "socialShares": {
    "facebook": 2,
    "twitter": 1,
    "linkedin": 1,
    "pinterest": 0
  }
}
```

### 6. Toggle Publish Status

**PATCH** `/dynamic-pages-article-and-seo/64f8a1b2c3d4e5f6a7b8c9d0/publish`

```json
{
  "isPublished": false
}
```

### 7. Get Featured Articles

**GET** `/dynamic-pages-article-and-seo/featured?limit=5`

**Response:**
```json
{
  "status": "true",
  "statusCode": 200,
  "message": "Featured dynamic pages articles fetched successfully",
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "slug": "word-counter-tool",
      "title": "Free Word Counter Tool - Count Words, Characters, and More",
      "excerpt": "Count words, characters, sentences, and paragraphs with our free online word counter tool.",
      "author": "John Doe",
      "isFeatured": true,
      "seoScore": 85,
      "publishedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 8. Get Articles by Category

**GET** `/dynamic-pages-article-and-seo/category/text-tools?page=1&limit=10`

**Response:**
```json
{
  "status": "true",
  "statusCode": 200,
  "message": "Dynamic pages articles by category fetched successfully",
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "slug": "word-counter-tool",
      "title": "Free Word Counter Tool - Count Words, Characters, and More",
      "categories": ["text-tools", "writing-tools"],
      "isPublished": true
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```

### 9. Get Related Articles

**GET** `/dynamic-pages-article-and-seo/related/64f8a1b2c3d4e5f6a7b8c9d0?limit=3`

**Response:**
```json
{
  "status": "true",
  "statusCode": 200,
  "message": "Related dynamic pages articles fetched successfully",
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "slug": "text-to-speech",
      "title": "Text to Speech Converter",
      "categories": ["text-tools"],
      "isPublished": true
    }
  ]
}
```

### 10. Get Sitemap Data

**GET** `/dynamic-pages-article-and-seo/sitemap`

**Response:**
```json
{
  "status": "true",
  "statusCode": 200,
  "message": "Sitemap data fetched successfully",
  "data": [
    {
      "slug": "word-counter-tool",
      "lastModified": "2024-01-15T10:30:00.000Z",
      "changeFreq": "weekly",
      "priority": 0.8
    }
  ]
}
```

### 11. Bulk Update Articles

**PATCH** `/dynamic-pages-article-and-seo/bulk/update`

```json
{
  "ids": ["64f8a1b2c3d4e5f6a7b8c9d0", "64f8a1b2c3d4e5f6a7b8c9d1"],
  "updateData": {
    "isPublished": true,
    "categories": ["featured-tools"]
  }
}
```

### 12. Search Articles

**GET** `/dynamic-pages-article-and-seo?searchTerm=word counter&pageType=tool`

**Response:**
```json
{
  "status": "true",
  "statusCode": 200,
  "message": "Dynamic pages articles with SEO fetched successfully",
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "slug": "word-counter-tool",
      "title": "Free Word Counter Tool - Count Words, Characters, and More",
      "pageType": "tool",
      "isPublished": true
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "status": "false",
  "statusCode": 400,
  "message": "Validation Error",
  "errorMessages": [
    {
      "message": "Slug is required",
      "path": "slug"
    }
  ]
}
```

### 404 Not Found
```json
{
  "status": "false",
  "statusCode": 404,
  "message": "Dynamic page article not found",
  "data": null
}
```

### 409 Conflict (Duplicate Slug)
```json
{
  "status": "false",
  "statusCode": 409,
  "message": "A page with this slug already exists",
  "data": null
}
```

## cURL Examples

### Create Article
```bash
curl -X POST http://localhost:5000/api/v1/dynamic-pages-article-and-seo \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "slug": "word-counter-tool",
    "title": "Free Word Counter Tool",
    "content": "<p>This is a word counter tool...</p>",
    "author": "John Doe",
    "categories": ["text-tools"],
    "metaTitle": "Free Word Counter Tool",
    "metaDescription": "Free online word counter tool",
    "canonicalUrl": "https://example.com/tools/word-counter",
    "pageType": "tool",
    "toolCategory": "text-tools",
    "usageInstructions": "Paste your text to count words"
  }'
```

### Get Articles
```bash
curl -X GET "http://localhost:5000/api/v1/dynamic-pages-article-and-seo?page=1&limit=10"
```

### Update Article
```bash
curl -X PATCH http://localhost:5000/api/v1/dynamic-pages-article-and-seo/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "isFeatured": true
  }'
```
