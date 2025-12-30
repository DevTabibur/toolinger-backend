import { model, Schema, Types } from "mongoose";
import { ITag, TagStatus } from "./tag.interface";

const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: TagStatus,
      default: TagStatus.PENDING,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false, // guest allowed
    },
    isSystem: { type: Boolean, default: false },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const TagModel = model<ITag>("Tag", TagSchema);
export default TagModel;
