import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";
import { BrokenLinkService } from "./url-encoder-decoder.service";

const checkURL = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    throw new Error("A Valid URL is required");
  }

  const result = await BrokenLinkService.checkBrokenLink(url);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Broken Link check completed",
    data: result,
  });
});

export const URLEncoderDecoderController = { checkURL };
