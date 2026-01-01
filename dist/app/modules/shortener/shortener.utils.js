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
exports.redirectUrl = exports.generateShortCode = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const shortener_model_1 = __importDefault(require("./shortener.model"));
const generateShortCode = (length = 6) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let shortCode = "";
    for (let i = 0; i < length; i++) {
        shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return shortCode;
};
exports.generateShortCode = generateShortCode;
const redirectUrl = (shortUrl) => __awaiter(void 0, void 0, void 0, function* () {
    if (!shortUrl) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Short URL is required");
    }
    const urlData = yield shortener_model_1.default.findOne({ shortUrl });
    if (!urlData)
        return null;
    // Update analytics: Increase click count & update last accessed timestamp
    urlData.clicks += 1;
    urlData.lastAccessed = new Date();
    yield urlData.save();
    return urlData.originalUrl;
});
exports.redirectUrl = redirectUrl;
