import ApiError from "../../../errors/ApiError";
import { IShortenedURL } from "./shortener.interface";
import httpStatus from "http-status";
import ShortenedURLModel from "./shortener.model";
import { generateShortCode } from "./shortener.utils";
import config from "../../../config";
import AnalyticsModel from "../analytics/analytics.model";

const createShortUrl = async (
  shortenedData: IShortenedURL,
): Promise<IShortenedURL> => {
  const { originalUrl } = shortenedData;
  if (!originalUrl)
    throw new ApiError(httpStatus.BAD_REQUEST, "URL is required");

  const shortUrl = generateShortCode();
  if (!shortUrl) {
    throw new ApiError(httpStatus.BAD_GATEWAY, "Generating Short URL Failed!");
  }

  // Calculate the expiry time (48 hours from creation)
  const expiryTime = new Date();
  expiryTime.setHours(expiryTime.getHours() + 48);

  // Create the shortened URL with the expiry field
  const result = await ShortenedURLModel.create({
    originalUrl,
    shortUrl,
    clicks: 0,
    lastAccessed: null,
    expiry: expiryTime, // Store expiry time
  });

  // Increment total shortened URL count in the Analytics
  await AnalyticsModel.updateOne(
    {},
    {
      $inc: { totalShort: 1 },
      $set: { lastUsedShort: new Date().toISOString() },
    },
    { upsert: true },
  );

  return result;
};

// const redirectUrl = async (shortUrl: string): Promise<string | null> => {

//     if (!shortUrl) {
//         throw new ApiError(httpStatus.BAD_REQUEST, "Short URL is required")
//     }
//     const urlData = await ShortenedURLModel.findOne({ shortUrl });

//     if (!urlData) return null;

//     // Update analytics: Increase click count & update last accessed timestamp
//     urlData.clicks += 1;
//     urlData.lastAccessed = new Date();
//     await urlData.save();

//     return urlData.originalUrl;
// }

export const ShortenerService = {
  createShortUrl,
  // redirectUrl,
};
