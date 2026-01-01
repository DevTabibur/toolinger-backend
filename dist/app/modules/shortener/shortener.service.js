"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const shortener_model_1 = __importDefault(require("./shortener.model"));
const shortener_utils_1 = require("./shortener.utils");
const analytics_model_1 = __importDefault(require("../analytics/analytics.model"));
const createShortUrl = (shortenedData) => __awaiter(void 0, void 0, void 0, function* () {
    const { originalUrl } = shortenedData;
    if (!originalUrl)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "URL is required");
    const shortUrl = (0, shortener_utils_1.generateShortCode)();
    if (!shortUrl) {
        throw new ApiError_1.default(http_status_1.default.BAD_GATEWAY, "Generating Short URL Failed!");
    }
    // Calculate the expiry time (48 hours from creation)
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 48);
    // Create the shortened URL with the expiry field
    const result = yield shortener_model_1.default.create({
        originalUrl,
        shortUrl,
        clicks: 0,
        lastAccessed: null,
        expiry: expiryTime, // Store expiry time
    });
    // Increment total shortened URL count in the Analytics
    yield analytics_model_1.default.updateOne({}, {
        $inc: { totalShort: 1 },
        $set: { lastUsedShort: new Date().toISOString() },
    }, { upsert: true });
    return result;
});
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
exports.ShortenerService = {
    createShortUrl,
    // redirectUrl,
};
