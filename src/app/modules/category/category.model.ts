import { model, Schema } from "mongoose";
import { ICategory, CategoryStatus } from "./category.interface";

// Only include fields defined in ICategory interface
const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  },
);

// Create the model
const CategoryModel = model<ICategory>("Category", CategorySchema);

export default CategoryModel;
