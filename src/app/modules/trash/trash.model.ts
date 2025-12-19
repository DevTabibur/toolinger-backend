import { Schema, Document, model } from "mongoose";
import { ITrash } from "./trash.interface";

const TrashSchema: Schema = new Schema<ITrash>(
  {
    model: {
      type: String,
      required: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
    deletedAt: {
      type: Date,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

// Create TTL index on `expireAt` field to delete documents after 30 days
TrashSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const TrashModel = model<ITrash & Document>("Trash", TrashSchema);

export default TrashModel;
