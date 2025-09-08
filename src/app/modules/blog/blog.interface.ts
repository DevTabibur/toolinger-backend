export interface IBlogPost {
  title: string; // Blog post title
  slug: string; // SEO-friendly URL
  content: string;
  status: "archive" | "published" | "draft"; // Blog content
  excerpt: string; // Short summary for SEO
  author: string; // Author name
  category: string; // Category
  tags: string[]; // Tags for SEO
  blogFeaturedImage: string; // Featured image URL
  isAllowComments?: boolean;
  isFeaturedPost?: boolean;

  //===============================
  seoTitle: string; // Custom SEO title
  seoDescription: string; // Custom SEO description
  seoKeywords?: string[]; // Keywords for SEO
  seoImage?: string; // Image for SEO (e.g., Open Graph)
}
