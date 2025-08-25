import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PageSEOService } from "./page-seo.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";

const createPageSEO = catchAsync(async (req: Request, res: Response) => {
  const result = await PageSEOService.createPageSEO(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Page SEO created successfully",
    data: result,
  });
});

const getPageSEOById = catchAsync(async (req: Request, res: Response) => {
  const { pageSEOId } = req.params;
  const result = await PageSEOService.getPageSEOById(pageSEOId);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Page SEO data fetched successfully",
    data: result,
  });
});

const getPageSEOByPage = catchAsync(async (req: Request, res: Response) => {
  const { page } = req.params;
  const result = await PageSEOService.getPageSEOByPage(page);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Page SEO data fetched successfully by page",
    data: result,
  });
});

const getAllPageSEO = catchAsync(async (req: Request, res: Response) => {
  const result = await PageSEOService.getAllPageSEO();

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "All Page SEO data fetched successfully",
    data: result,
  });
});

const updatePageSEO = catchAsync(async (req: Request, res: Response) => {
  const { pageSEOId } = req.params;
  const pageSEOData = req.body;
  const result = await PageSEOService.updatePageSEO(pageSEOId, pageSEOData);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Page SEO updated successfully",
    data: result,
  });
});

const deletePageSEO = catchAsync(async (req: Request, res: Response) => {
  const { pageSEOId } = req.params;
  const result = await PageSEOService.deletePageSEO(pageSEOId);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Page SEO deleted successfully",
    data: result,
  });
});

const getAvailablePages = catchAsync(async (req: Request, res: Response) => {
  const result = await PageSEOService.getAvailablePages();

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Available pages fetched successfully",
    data: result,
  });
});

export const PageSEOController = {
  createPageSEO,
  getPageSEOById,
  getPageSEOByPage,
  getAllPageSEO,
  updatePageSEO,
  deletePageSEO,
  getAvailablePages,
};
