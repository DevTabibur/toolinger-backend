// seo/seo.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { SEOService } from "./seo.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";

const revalidateSEO = catchAsync(async (req: Request, res: Response) => {
  // Trigger revalidation on the frontend
  await fetch("http://localhost:3000/api/revalidate?tag=seo", {
    method: "POST",
  });

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "SEO cache revalidated successfully",
    data: null,
  });
});

const createSEO = catchAsync(async (req: Request, res: Response) => {
  const result = await SEOService.createSEO(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "SEO created successfully",
    data: result,
  });
});

const getSEOById = catchAsync(async (req: Request, res: Response) => {
  const { seoId } = req.params;
  const result = await SEOService.getSEOById(seoId);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "SEO data fetched successfully",
    data: result,
  });
});
const getSEOByPage = catchAsync(async (req: Request, res: Response) => {
  const { page } = req.params;
  const result = await SEOService.getSEOByPage(page);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "SEO data fetched successfully bg page",
    data: result,
  });
});

const getAllSEO = catchAsync(async (req: Request, res: Response) => {
  const result = await SEOService.getAllSEO();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "All SEO data fetched successfully",
    data: result,
  });
});

const updateSEO = catchAsync(async (req: Request, res: Response) => {
  const { seoId } = req.params;
  const seoData = req.body;
  const result = await SEOService.updateSEO(seoId, seoData);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "SEO updated successfully",
    data: result,
  });
});

const deleteSEO = catchAsync(async (req: Request, res: Response) => {
  const { seoId } = req.params;
  console.log("delete seo id", seoId);
  const result = await SEOService.deleteSEO(seoId);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "SEO deleted successfully",
    data: result,
  });
});

export const SEOController = {
  getSEOByPage,
  createSEO,
  getSEOById,
  getAllSEO,
  updateSEO,
  deleteSEO,
  revalidateSEO,
};
