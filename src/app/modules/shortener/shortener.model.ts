import { Schema, model } from "mongoose";
import { IShortenedURL } from "./shortener.interface";

const UrlSchema: Schema = new Schema<IShortenedURL>(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 }, // Ensure clicks defaults to 0
    lastAccessed: { type: Date, default: null }, // Track last visit
    expiry: { type: Date, required: true }, // Expiry time of the URL
  },
  { timestamps: true },
);

// Set TTL index on the 'expiry' field with 48 hours expiration time
UrlSchema.index({ expiry: 1 }, { expireAfterSeconds: 0 });

const ShortenedURLModel = model<IShortenedURL>("ShortenedURL", UrlSchema);
export default ShortenedURLModel;
