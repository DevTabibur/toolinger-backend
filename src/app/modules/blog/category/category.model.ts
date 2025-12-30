import { model, Schema, Types } from "mongoose";
import { ICategory, CategoryStatus } from "./category.interface";

// Only include fields defined in ICategory interface
const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      // unique: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(CategoryStatus),
      required: true,
      default: CategoryStatus.ACTIVE,
    },
    parentId: {
      type: Types.ObjectId,
      ref: "Category",
      default: null,
    },
    isSystem: {
      type: Boolean,
      default: false, // true for Uncategorized
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  },
);

CategorySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as any;

  const deletedAt = update?.deletedAt || update?.$set?.deletedAt;

  if (deletedAt) {
    const category = await this.model.findOne(this.getQuery());
    if (category?.isSystem) {
      throw new Error("System category cannot be deleted");
    }
  }

  next();
});

CategorySchema.pre("save", async function (next) {
  if (this.parentId) {
    const parent = await this.model("Category")
      .findById(this.parentId)
      .lean<ICategory>();

    if (parent?.parentId) {
      throw new Error("Only one level of sub-category allowed");
    }
  }
  next();
});

// Create the model
const CategoryModel = model<ICategory>("Category", CategorySchema);

export default CategoryModel;
