export interface ISEO {
  page: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  canonicalUrl?: string;
  metaRobots?: string;
  schemaMarkup?: {
    articleSchema?: object;
    faqSchema?: object;
    breadcrumbSchema?: object;
    organizationSchema?: object;
  };
  openGraph?: {
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    siteName?: string;
  };
  twitterCard?: {
    title?: string;
    description?: string;
    image?: string;
    cardType?: string;
  };
  hreflangs?: Array<{
    lang: string;
    url: string;
  }>;
  structuredData?: string;
  jsonLD?: object;
  contentQualityScore?: number;
  readabilityScore?: number;
  keywordDensity?: object;
  lastCrawled?: Date;
  indexedStatus?: string;
}
