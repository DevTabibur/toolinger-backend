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
exports.ConvertService = void 0;
const axios_1 = __importDefault(require("axios"));
const validator_1 = __importDefault(require("validator"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const analytics_model_1 = __importDefault(require("../analytics/analytics.model"));
// Modify the function to handle conversion and return appropriate data
const convertURLToMP3orMP4 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { url, format } = data;
    if (!url || !format) {
        throw new ApiError_1.default(http_status_1.default.BAD_GATEWAY, "URL and Format are required");
    }
    // Validate the YouTube URL
    if (!validator_1.default.isURL(url, {
        protocols: ["http", "https"],
        require_protocol: true,
    })) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid YouTube URL.");
    }
    // Extract video ID from the YouTube URL using regex
    let videoId = null;
    // Handle regular YouTube video URLs
    const videoIdMatch = url.match(/[?&]v=([^&#]*)/);
    if (videoIdMatch) {
        videoId = videoIdMatch[1]; // Video ID is the first capturing group
    }
    // Handle YouTube Shorts URLs
    if (!videoId) {
        const shortsIdMatch = url.match(/\/shorts\/([^\/?&#]*)/);
        if (shortsIdMatch) {
            videoId = shortsIdMatch[1]; // Video ID is the first capturing group
        }
    }
    // Handle YouTube share URLs (e.g., https://youtu.be/fbMWLwACZss)
    if (!videoId) {
        const shareIdMatch = url.match(/youtu\.be\/([^\/?&#]*)/);
        if (shareIdMatch) {
            videoId = shareIdMatch[1]; // Video ID is the first capturing group
        }
    }
    // If no video ID is found, throw an error
    if (!videoId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Could not extract video ID from the URL.");
    }
    try {
        // Fetch MP4 metadata
        const mp4Response = yield axios_1.default.get("https://zylalabs.com/api/3219/youtube+mp4+video+downloader+api/5880/get+mp4", {
            headers: {
            // Authorization: `Bearer ${config.youtube_mp3_or_mp4_downlaod}`,
            },
            params: {
                id: videoId, // Send the extracted video ID
            },
        });
        // Check if the MP4 response contains an ID
        if (mp4Response.data.id) {
            const download = yield axios_1.default.get("https://zylalabs.com/api/3219/youtube+mp4+video+downloader+api/6812/youtube+downloader", {
                headers: {
                // Authorization: `Bearer ${config.youtube_mp3_or_mp4_downlaod}`,
                },
                params: {
                    videoId: (_a = mp4Response === null || mp4Response === void 0 ? void 0 : mp4Response.data) === null || _a === void 0 ? void 0 : _a.id, // Send the extracted video ID
                },
            });
            // Handling for MP3 format
            if (format === "mp3") {
                if (download.data &&
                    download.data.audios &&
                    download.data.audios.items &&
                    download.data.audios.items.length > 0) {
                    const mp3DownloadLink = download.data.audios.items[0].url; // MP3 download link
                    const audioLength = download.data.lengthSeconds; // Video length in seconds
                    // DB Update for MP3 format
                    yield analytics_model_1.default.updateOne({}, {
                        $inc: { totalMP3: 1 },
                        $set: { lastUsedMP3: new Date().toISOString() },
                    }, { upsert: true });
                    return {
                        downloadLink: mp3DownloadLink,
                        title: download.data.title,
                        viewCount: download.data.viewCount,
                        likeCount: download.data.likeCount,
                        commentCountText: download.data.commentCountText,
                        channel: download.data.channel,
                        publishedTimeText: download.data.publishedTimeText,
                        thumbnails: download.data.thumbnails,
                        audioLengthSeconds: audioLength, // Include video length in the response
                        format: "mp3",
                    };
                }
                else {
                    throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "MP3 download link not found.");
                }
            }
            // Handling for MP4 format
            if (format === "mp4") {
                if (download.data &&
                    download.data.videos &&
                    download.data.videos.items &&
                    download.data.videos.items.length > 0) {
                    const mp4DownloadLink = download.data.videos.items[0].url; // MP4 download link
                    const videoLength = download.data.lengthSeconds; // Video length in seconds
                    // DB Update for MP4 format
                    yield analytics_model_1.default.updateOne({}, {
                        $inc: { totalMP4: 1 },
                        $set: { lastUsedMP4: new Date().toISOString() },
                    }, { upsert: true });
                    return {
                        downloadLink: mp4DownloadLink,
                        title: download.data.title,
                        viewCount: download.data.viewCount,
                        likeCount: download.data.likeCount,
                        commentCountText: download.data.commentCountText,
                        channel: download.data.channel,
                        publishedTimeText: download.data.publishedTimeText,
                        thumbnails: download.data.thumbnails,
                        videoLengthSeconds: videoLength, // Include video length in the response
                        format: "mp4",
                    };
                }
                else {
                    throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "MP4 download link not found.");
                }
            }
            // If no format is specified or incorrect format
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please specify a valid format (mp3 or mp4).");
        }
        else {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No video ID found in the response.");
        }
    }
    catch (error) {
        // Handle any errors (API call issues, etc.)
        if (error.response) {
            // Server responded with an error status code
            throw new ApiError_1.default(http_status_1.default.BAD_GATEWAY, "Error fetching data from the API.");
        }
        else {
            // Handle any other errors (like network issues)
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "An unexpected error occurred.");
        }
    }
});
exports.ConvertService = {
    convertURLToMP3orMP4,
};
