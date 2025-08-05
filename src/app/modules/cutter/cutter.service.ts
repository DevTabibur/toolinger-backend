import httpStatus from "http-status";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";
import ApiError from "../../../errors/ApiError";
import AnalyticsModel from "../analytics/analytics.model";

// Set the path to the FFmpeg binary  ==> this is for windows
// ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe");  // Path for windows

ffmpeg.setFfmpegPath("/usr/bin/ffmpeg"); // Path for Ubuntu

const cutMp3File = async (file: Express.Multer.File, body: any) => {
  const { start, end } = body;
  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No file uploaded");
  }
  if (!start || !end) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Start and end times are required",
    );
  }
  const inputFilePath = file.path;
  const outputFilePath = path.join(
    __dirname,
    `../uploads/cut_${Date.now()}.mp3`,
  );

  return new Promise<string>((resolve, reject) => {
    ffmpeg(inputFilePath)
      .setStartTime(start)
      .setDuration(end - start)
      .output(outputFilePath)
      .on("end", async () => {
        // Clean up the original file after processing
        fs.unlinkSync(inputFilePath);

        // Update analytics in the database after trimming
        try {
          await AnalyticsModel.updateOne(
            {},
            {
              $inc: { totalCutter: 1 },
              $set: { lastUsedCutter: new Date().toISOString() },
            },
            { upsert: true },
          );
          resolve(outputFilePath); // Resolve the output file path after updating the DB
        } catch (error) {
          reject(error); // Reject if there is an error with the DB update
        }
      })
      .on("error", (err) => {
        reject(err);
      })
      .run();
  });
};

const UPLOAD_DIR = path.join(__dirname, "../../uploads");
const OUTPUT_DIR = path.join(__dirname, "../../output");

// Ensure directories exist
const ensureDirectoriesExist = () => {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
};

const trimAudio = async (
  filePath: string,
  startTime: number,
  endTime: number,
): Promise<string> => {
  const outputFilePath = path.join(OUTPUT_DIR, `trimmed_${Date.now()}.mp3`);

  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .setStartTime(startTime)
      .setDuration(endTime - startTime)
      .output(outputFilePath)
      .on("start", (commandLine) => {
        console.log("FFmpeg process started:", commandLine);
      })
      .on("progress", (progress) => {
        console.log(`Processing: ${Math.floor(progress.percent ?? 0)}% done`);
      })
      .on("end", async () => {
        console.log("Trimming completed successfully");

        // Update analytics in the database after trimming
        try {
          await AnalyticsModel.updateOne(
            {},
            {
              $inc: { totalCutter: 1 },
              $set: { lastUsedCutter: new Date().toISOString() },
            },
            { upsert: true },
          );
          resolve(outputFilePath); // Resolve the output file path after updating the DB
        } catch (error) {
          reject(error); // Reject if there is an error with the DB update
        }
      })
      .on("error", (err) => {
        console.error("Error during trimming:", err.message);
        reject(err);
      })
      .run();
  });
};

export const CutterService = { cutMp3File, ensureDirectoriesExist, trimAudio };
