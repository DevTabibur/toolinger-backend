export interface IPageSEO {
  page: string;

  // Basic SEO
  pageTitle: string;
  focusKeyword: string;
  keywords: string[];
  metaDescription: string;

  // Social Media
  openGraph: {
    title: string;
    type: string;
    siteName: string;
    locale: string;
    imageUrl: string;
    description: string;
  };
  twitterCard: {
    cardType: string;
    siteHandle: string;
    creatorHandle: string;
    imageUrl: string;
    title: string;
    description: string;
  };

  // Technical
  canonicalUrl: string;
  robotsMeta: string;
  hreflang: string;
  viewport: string;

  // Schema
  schemaMarkup: string;
  schemaTemplates: string[];
}
