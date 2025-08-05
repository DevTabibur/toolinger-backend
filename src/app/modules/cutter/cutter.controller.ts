// import { Response, Request } from "express";
// import catchAsync from "../../../shared/catchAsync";
// import httpStatus from "http-status";
// import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
// import { CutterService } from "./cutter.service";
// import multer from "multer";
// import * as fs from "fs";
// import * as path from "path";
// // Multer configuration for file uploads
// const uploadDir = path.join(__dirname, "../../uploads");
// const upload = multer({ dest: uploadDir });

// // Ensure directories exist on server startup
// CutterService.ensureDirectoriesExist();

// // Controller function for trimming audio
// export const uploadAndTrim = async (req: Request, res: Response) => {
//   try {
//     const file = req.file;
//     const { startTime, endTime } = req.body;

//     if (!file || !startTime || !endTime) {
//       return res.status(400).json({
//         error: "Missing file or time parameters",
//       });
//     }

//     // Trim the audio
//     const trimmedFilePath = await CutterService.trimAudio(
//       file.path,
//       parseFloat(startTime),
//       parseFloat(endTime),
//     );

//     // Send the trimmed file as a response
//     res.download(trimmedFilePath, (err) => {
//       if (err) {
//         console.error("Error sending file:", err);
//         return res.status(500).json({ error: "Failed to send file" });
//       }

//       // Clean up temporary files
//       fs.unlinkSync(file.path);
//       fs.unlinkSync(trimmedFilePath);
//     });
//   } catch (error) {
//     console.error("Error processing audio:", error);
//     res.status(500).json({ error: "Failed to process audio" });
//   }
// };

// export const CutterController = {  uploadAndTrim };

import { Response, Request, NextFunction } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import { CutterService } from "./cutter.service";
import multer from "multer";
import * as fs from "fs";
import * as path from "path";

const uploadDir = path.join(__dirname, "../../uploads");
const upload = multer({ dest: uploadDir });

CutterService.ensureDirectoriesExist();

export const uploadAndTrim = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const file = req.file;
      const { startTime, endTime } = req.body;

      if (!file || !startTime || !endTime) {
        res.status(400).json({ error: "Missing file or time parameters" });
        return;
      }

      const trimmedFilePath = await CutterService.trimAudio(
        file.path,
        parseFloat(startTime),
        parseFloat(endTime),
      );

      res.download(trimmedFilePath, (err) => {
        if (err) {
          console.error("Error sending file:", err);
          return res.status(500).json({ error: "Failed to send file" });
        }

        fs.unlinkSync(file.path);
        fs.unlinkSync(trimmedFilePath);
      });

      return; // Ensure function always returns void
    } catch (error) {
      console.error("Error processing audio:", error);
      next(error);
    }
  },
);
