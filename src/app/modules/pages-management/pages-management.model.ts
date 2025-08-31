import { model, Schema } from "mongoose";
import {
  IPageManagement,
  PageArticle,
  PageSEO,
} from "./pages-management.interface";

// Define the PageSEO sub-schema
const PageSEOSchema = new Schema<PageSEO>(
  {
    //============================================ Basic SEO=============================================================
    metaTitle: { type: String, required: true, trim: true, maxlength: 70 },
    metaDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    keywords: { type: [String], default: [] },
    canonicalUrl: { type: String, trim: true },
    noindex: { type: Boolean, default: false },

    // ================================================Open Graph=========================================================
    ogTitle: { type: String, trim: true },
    ogDescription: { type: String, trim: true },
    ogImageUrl: { type: String, trim: true },
    ogType: { type: String, trim: true },
    ogSiteName: { type: String, trim: true },
    ogLocale: { type: String, trim: true },

    // ====================================================Twitter Card======================================================
    twitterCard: {
      type: String,
      enum: ["summary", "summary_large_image", "app", "player"],
    },
    twitterSite: { type: String, trim: true },
    twitterCreator: { type: String, trim: true },
    twitterImageUrl: { type: String, trim: true },

    // ==================================================Hreflang / Alternates================================================
    alternates: { type: Schema.Types.Mixed, default: {} },

    // ==================================================JSON-LD schemas=======================================================
    schemas: { type: [Schema.Types.Mixed], default: [] },

    //=================================================== Sitemap helpers======================================================
    changefreq: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "weekly",
    },
    priority: { type: Number, min: 0.0, max: 1.0, default: 0.5 },
  },
  { _id: false },
);

// Define the PageArticle sub-schema
const PageArticleSchema = new Schema<PageArticle>(
  {
    content: { type: String },
    image: { type: String, trim: true },
    imageAlt: { type: String, trim: true },
  },
  { _id: false },
);

// Main PageManagement schema
const PageManagementSchema = new Schema<IPageManagement>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    PageSEO: { type: PageSEOSchema, required: true },
    PageArticle: { type: PageArticleSchema },
  },
  {
    timestamps: true,
  },
);

const PageManagementModel = model("PageManagement", PageManagementSchema);

export default PageManagementModel;
