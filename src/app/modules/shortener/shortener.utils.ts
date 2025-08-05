import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status"
import ShortenedURLModel from "./shortener.model";

export const generateShortCode = (length = 6): string => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let shortCode = "";
    for (let i = 0; i < length; i++) {
        shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return shortCode;
};



export const redirectUrl = async (shortUrl: string): Promise<string | null> => {
    if (!shortUrl) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Short URL is required");
    }

    const urlData = await ShortenedURLModel.findOne({ shortUrl });

    if (!urlData) return null;

    // Update analytics: Increase click count & update last accessed timestamp
    urlData.clicks += 1;
    urlData.lastAccessed = new Date();
    await urlData.save();

    return urlData.originalUrl;
};
