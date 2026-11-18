import { Types } from "mongoose";
import { AuthorRole, BlogStatus } from "./blog.constant";

export interface IBlogSEO {
  title: string;
  description: string;
  // keywords?: string[];
  // seoImage?: string;
  // canonicalUrl?: string;
  // noIndex?: boolean;
  // noFollow?: boolean;
}

export interface IBlogAnalytics {
  views: number;
  uniqueViews: number;
  readTime: number; // minutes
  shares: number;
  lastViewedAt?: Date;
}

export interface IBlogAuthor {
  id: Types.ObjectId;
  // name: string;
  // email?: string;
  // role: AuthorRole;
  profileUrl?: string; // guest author page
}

export interface IBlogPost {
  // Core
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: BlogStatus;

  // Author
  // author: IBlogAuthor;

  // Taxonomy
  // categories: Types.ObjectId[];
  primaryCategory: Types.ObjectId;
  // secondaryCategories: Types.ObjectId[];
  tags: Types.ObjectId[];

  // Media
  blogFeaturedImage?: string;
  // galleryImages?: string[];

  // Flags
  // allowComments?: boolean;
  // isFeatured?: boolean;
  // isSponsored?: boolean; // guest post monetization
  // sponsorName?: string;
  // sponsorUrl?: string;

  // SEO
  seo: IBlogSEO;

  // Analytics
  // analytics: IBlogAnalytics;

  // Publishing
  publishedAt?: Date;
  scheduledAt?: Date;

  // Trash system
  trashedAt?: Date | null;

  // System
  // createdAt?: Date;
  // updatedAt?: Date;
}
