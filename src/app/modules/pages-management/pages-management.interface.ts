// Page SEO fields interface - required for every page
export interface PageSEO {
  // Basic SEO
  metaTitle: string; // <title>
  metaDescription: string; // meta[name="description"]
  keywords?: string[]; // meta[name="keywords"]
  canonicalUrl?: string; // canonical link
  noindex?: boolean; // robots index/follow toggle (default false)

  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  ogImageUrl?: string; // 1200×630
  ogType?: "website" | "article" | "product" | string;
  ogSiteName?: string;
  ogLocale?: string; // e.g. "en_US"

  // Twitter Card
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterSite?: string; // @handle
  twitterCreator?: string; // @handle
  twitterImageUrl?: string;

  // Hreflang / Alternates
  alternates?: Record<string, string>; // { "en": "https://...", "bn": "https://..." }

  // JSON-LD schemas
  schemas?: Array<Record<string, any>>;

  // Sitemap helpers
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number; // 0.0 - 1.0
}

// Article content interface
// Content is optional, and should be HTML (for Quill output, to be rendered with dangerouslySetInnerHTML)
export interface PageArticle {
  content?: string; // HTML string (Quill output), optional
  image?: string; // Featured image URL
  imageAlt?: string;
}

// Page management interface
export interface IPageManagement {
  slug: string;
  PageSEO: PageSEO; // SEO fields (required)
  PageArticle?: PageArticle; // Article fields (content optional)
}

// Filters for querying dynamic pages/articles
export interface IPageManagementFilters {
  searchTerm?: string;
  pageType?: string;
  toolCategory?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  author?: string;
  categories?: string[];
  tags?: string[];
  publishedAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}
