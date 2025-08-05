import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AnalyticsService } from "./analytics.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";

const getAnalytics = catchAsync(async (req: Request, res: Response) => {
  const result = await AnalyticsService.getAnalytics();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Analytics fetched successfully",
    data: result,
  });
});

export const AnalyticsController = { getAnalytics };
