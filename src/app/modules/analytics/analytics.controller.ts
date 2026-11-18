import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AnalyticsService } from "./analytics.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";

const getDashboardAnalytics = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AnalyticsService.getDashboardAnalytics();
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Dashboard analytics fetched successfully",
      data: result,
    });
  },
);

export const AnalyticsController = { getDashboardAnalytics };
