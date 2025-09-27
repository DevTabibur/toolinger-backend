import { model, Schema } from "mongoose";
import { IPageManagement } from "./pages-management.interface";

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
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "static",
        "text",
        "image",
        "developers",
        "converters",
        "generators",
        "calculators",
        "websiteManagemet",
        "other",
      ],
    },

    //=========================================Article===============================
    pageContent: {
      type: String,
      required: false,
    },
    //============================================ Basic SEO=============================================================
    metaTitle: { type: String, trim: true, maxlength: 70 },
    metaDescription: {
      type: String,

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
    ogLocale: {
      type: String,
      trim: true,
      enum: ["en_US", "en_GB", "es", "fr", "de"],
      default: "en_US",
    },

    // ====================================================Twitter Card======================================================
    twitterCard: {
      type: String,
      enum: ["summary", "summary_large_image", "app", "player"],
      default: "summary",
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
      enum: [
        "always",
        "hourly",
        "daily",
        "weekly",
        "monthly",
        "yearly",
        "never",
      ],
      default: "weekly",
    },
    priority: { type: Number, min: 0.0, max: 1.0, default: 0.5 },
  },
  {
    timestamps: true,
  },
);

const PageManagementModel = model("PageManagement", PageManagementSchema);

export default PageManagementModel;
