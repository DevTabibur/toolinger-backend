import mongoose, { model, Schema, Types } from "mongoose";
import { IBlogPost } from "./blog.interface";
import { AUTHOR_ROLE, BLOG_STATUS } from "./blog.constant";
const BlogPostSchema = new Schema<IBlogPost>(
  {
    // CORE
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: BLOG_STATUS,
      default: "draft",
      required: true,
    },
    excerpt: {
      type: String,
      // required: true,
      maxlength: 160, // Limit to ensure SEO-friendly snippet
    },
    // Author
    // author: {
    //   id: {
    //     type: Types.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
    //   // name: {
    //   //   type: String,
    //   // },
    //   // email: {
    //   //   type: String,
    //   // },
    //   // role: {
    //   //   type: String,
    //   //   enum: AUTHOR_ROLE,
    //   //   default: "guest",
    //   //   required: true,
    //   // },
    //   profileUrl: {
    //     type: String,
    //   },
    // },

    // Taxonomy
    // categories: [
    //   {
    //     type: Types.ObjectId,
    //     ref: "Category",
    //     required: true,
    //     index: true,
    //   },
    // ],
    // categories: {
    //   type: [
    //     {
    //       type: Types.ObjectId,
    //       ref: "Category",
    //     },
    //   ],
    //   required: true,
    //   validate: {
    //     validator: function (v: Types.ObjectId[]) {
    //       return Array.isArray(v) && v.length > 0;
    //     },
    //     message: "At least one category is required",
    //   },
    // },

    primaryCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // secondaryCategories: [
    //   {
    //     type: Types.ObjectId,
    //     ref: "Category",
    //   },
    // ],

    tags: {
      type: [
        {
          // type: Types.ObjectId,
          type: String,

          ref: "Tag",
        },
      ],
      required: false,
      // validate: {
      //   validator: function (v: Types.ObjectId[]) {
      //     return Array.isArray(v) && v.length > 0;
      //   },
      //   message: "At least one tag is required",
      // },
    },

    // Media
    // blogFeaturedImage: {
    //   type: String,
    //   required: true,
    // },

    //Flags
    // allowComments: {
    //   type: Boolean,
    //   default: true,
    // },
    // isFeatured: {
    //   type: Boolean,
    //   default: false,
    // },
    // isSponsored: {
    //   type: Boolean,
    //   default: false,
    // },
    // sponsorName: {
    //   type: String,
    // },
    // sponsorUrl: {
    //   type: String,
    // },

    // seo
    seo: {
      title: {
        type: String,
        // required: true,
        maxlength: 70, // SEO title should be <= 70 characters
        default: function () {
          return this.title;
        },
      },
      description: {
        type: String,
        // required: true,
        maxlength: 160,
      },
      // keywords: {
      //   type: [String],
      // },
      // seoImage: {
      //   type: String,
      // },
      // canonicalUrl: String,
      // noIndex: { type: Boolean, default: false },
      // noFollow: { type: Boolean, default: false },
    },

    // Analytics
    // analytics: {
    //   views: {
    //     type: Number,
    //     default: 0,
    //   },
    //   uniqueViews: {
    //     type: Number,
    //     default: 0,
    //   },
    //   readTime: {
    //     type: Number,
    //     default: 0,
    //   },
    //   shares: {
    //     type: Number,
    //     default: 0,
    //   },
    //   lastViewedAt: {
    //     type: Date,
    //   },
    // },

    // Publishing
    // publishedAt: {
    //   type: Date,
    // },
    // scheduledAt: {
    //   type: Date,
    // },

    // Trash system
    // trashedAt: {
    //   type: Date,
    //   default: null,
    //   index: true,
    // },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

// BlogPostSchema.pre("validate", async function (next) {
//   if (!this.primaryCategory) {
//     const uncategorized = await mongoose
//       .model("Category")
//       .findOne({ slug: "uncategorized", deletedAt: null });

//     this.primaryCategory = uncategorized._id;
//   }
//   next();
// });

// Create the model
const BlogPostModel = model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPostModel;
