import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import { ConvertService } from "./converter.service";

// Convert URL to MP3 or MP4 and update stats
const convertURLToMP3orMP4 = catchAsync(async (req: Request, res: Response) => {
  const result = await ConvertService.convertURLToMP3orMP4(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "URL converted successfully",
    data: result,
  });
});

export const ConvertController = {
  convertURLToMP3orMP4,
};
