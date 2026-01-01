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
exports.CutterService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const analytics_model_1 = __importDefault(require("../analytics/analytics.model"));
// Set the path to the FFmpeg binary  ==> this is for windows
// ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe");  // Path for windows
fluent_ffmpeg_1.default.setFfmpegPath("/usr/bin/ffmpeg"); // Path for Ubuntu
const cutMp3File = (file, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { start, end } = body;
    if (!file) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "No file uploaded");
    }
    if (!start || !end) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Start and end times are required");
    }
    const inputFilePath = file.path;
    const outputFilePath = path_1.default.join(__dirname, `../uploads/cut_${Date.now()}.mp3`);
    return new Promise((resolve, reject) => {
        (0, fluent_ffmpeg_1.default)(inputFilePath)
            .setStartTime(start)
            .setDuration(end - start)
            .output(outputFilePath)
            .on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            // Clean up the original file after processing
            fs_1.default.unlinkSync(inputFilePath);
            // Update analytics in the database after trimming
            try {
                yield analytics_model_1.default.updateOne({}, {
                    $inc: { totalCutter: 1 },
                    $set: { lastUsedCutter: new Date().toISOString() },
                }, { upsert: true });
                resolve(outputFilePath); // Resolve the output file path after updating the DB
            }
            catch (error) {
                reject(error); // Reject if there is an error with the DB update
            }
        }))
            .on("error", (err) => {
            reject(err);
        })
            .run();
    });
});
const UPLOAD_DIR = path_1.default.join(__dirname, "../../uploads");
const OUTPUT_DIR = path_1.default.join(__dirname, "../../output");
// Ensure directories exist
const ensureDirectoriesExist = () => {
    if (!fs_1.default.existsSync(UPLOAD_DIR)) {
        fs_1.default.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
    if (!fs_1.default.existsSync(OUTPUT_DIR)) {
        fs_1.default.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
};
const trimAudio = (filePath, startTime, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    const outputFilePath = path_1.default.join(OUTPUT_DIR, `trimmed_${Date.now()}.mp3`);
    return new Promise((resolve, reject) => {
        (0, fluent_ffmpeg_1.default)(filePath)
            .setStartTime(startTime)
            .setDuration(endTime - startTime)
            .output(outputFilePath)
            .on("start", (commandLine) => {
            console.log("FFmpeg process started:", commandLine);
        })
            .on("progress", (progress) => {
            var _a;
            console.log(`Processing: ${Math.floor((_a = progress.percent) !== null && _a !== void 0 ? _a : 0)}% done`);
        })
            .on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Trimming completed successfully");
            // Update analytics in the database after trimming
            try {
                yield analytics_model_1.default.updateOne({}, {
                    $inc: { totalCutter: 1 },
                    $set: { lastUsedCutter: new Date().toISOString() },
                }, { upsert: true });
                resolve(outputFilePath); // Resolve the output file path after updating the DB
            }
            catch (error) {
                reject(error); // Reject if there is an error with the DB update
            }
        }))
            .on("error", (err) => {
            console.error("Error during trimming:", err.message);
            reject(err);
        })
            .run();
    });
});
exports.CutterService = { cutMp3File, ensureDirectoriesExist, trimAudio };
