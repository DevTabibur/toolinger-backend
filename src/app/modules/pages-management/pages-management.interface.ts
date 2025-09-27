// Page management interface
export interface IPageManagement {
  slug: string;
  title: string;
  type:
    | "static"
    | "text"
    | "image"
    | "developers"
    | "converters"
    | "generators"
    | "calculators"
    | "websiteManagemet";
  // Article
  pageContent?: string; // page content

  // Basic SEO
  metaTitle?: string; // <title>
  metaDescription?: string; // meta[name="description"]
  keywords?: string[]; // meta[name="keywords"]
  canonicalUrl?: string; // canonical link
  noindex?: boolean; // robots index/follow toggle (default false)

  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  ogImageUrl?: string; // 1200×630
  ogType?:
    | "website"
    | "article"
    | "book"
    | "profile"
    | "music.song"
    | "music.album"
    | "music.playlist"
    | "music.radio_station"
    | "video.movie"
    | "video.episode"
    | "video.tv_show"
    | "video.other"
    | "product"
    | "other"
    | string;
  ogSiteName?: string;
  ogLocale?: "en_US" | "en_GB" | "es" | "fr" | "de" | string; // e.g. "en_US"

  // Twitter Card
  twitterCard?: "summary" | "summary_large_image" | "app" | "player" | string;
  twitterSite?: string; // @handle
  twitterCreator?: string; // @handle
  twitterImageUrl?: string;

  // Hreflang / Alternates
  alternates?: Record<string, string>; // { "en": "https://...", "bn": "https://..." }

  // JSON-LD schemas
  schemas?: Array<Record<string, any>>;

  // Sitemap helpers
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never"
    | string;
  priority?: number; // 0.0 - 1.0
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
