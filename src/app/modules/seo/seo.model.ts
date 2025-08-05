// seo/seo.model.ts
import { Schema, model } from "mongoose";
import { ISEO } from "./seo.interface";

const SEOSchema = new Schema<ISEO>(
  {
    page: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "home",
        "blog",
        "contact",
        "copyright",
        "cutter",
        "faq",
        "login",
        "mp4",
        "privacy",
        "shortener",
        "terms",
        "404",
      ],
    },
    // Core SEO
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    keywords: [{ type: String }],
    canonicalUrl: String,
    metaRobots: {
      type: String,
      default: "index, follow",
      enum: [
        "index, follow",
        "noindex, follow",
        "index, nofollow",
        "noindex, nofollow",
      ],
    },

    // Structured Data
    schemaMarkup: {
      articleSchema: Schema.Types.Mixed,
      faqSchema: Schema.Types.Mixed,
      breadcrumbSchema: Schema.Types.Mixed,
      organizationSchema: Schema.Types.Mixed,
    },

    // Social Media
    openGraph: {
      title: String,
      description: String,
      images: [
        {
          url: String,
          width: Number,
          height: Number,
          alt: String,
        },
      ],
      siteName: String,
    },
    twitterCard: {
      title: String,
      description: String,
      image: String,
      cardType: {
        type: String,
        enum: ["summary", "summary_large_image", "app", "player"],
      },
    },

    // Advanced SEO
    hreflangs: [
      {
        lang: String,
        url: String,
      },
    ],
    structuredData: String,
    jsonLD: Schema.Types.Mixed,

    // Content Optimization
    contentQualityScore: Number,
    readabilityScore: Number,
    keywordDensity: Schema.Types.Mixed,

    // Monitoring
    lastCrawled: Date,
    indexedStatus: {
      type: String,
      enum: ["indexed", "not-indexed", "blocked", "error"],
    },
  },
  { timestamps: true },
);

const SEOModel = model<ISEO>("SEO", SEOSchema);

export default SEOModel;
