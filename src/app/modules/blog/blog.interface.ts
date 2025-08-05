export interface IBlogPost {
  title: string;                      // Blog post title
  slug: string;                       // SEO-friendly URL
  content: string;                    // Blog content
  excerpt: string;                    // Short summary for SEO
  author: string;                     // Author name
  publishedAt: Date;                  // Date published
  updatedAt: Date;                    // Last update date
  categories: string[];               // Categories
  tags: string[];                     // Tags for SEO
  image: string;                      // Featured image URL
  seoTitle: string;                   // Custom SEO title
  seoDescription: string;             // Custom SEO description
  seoKeywords: string[];              // Keywords for SEO
  seoImage: string;                   // Image for SEO (e.g., Open Graph)
  isPublished: boolean;               // Whether the post is published
  isFeatured: boolean;                // Mark as featured blog post
}