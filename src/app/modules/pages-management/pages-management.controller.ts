import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { DynamicPagesArticleAndSeoService } from "./pages-management.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";

// Create a new dynamic page article with SEO
const createDynamicPagesArticleAndSeo = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await DynamicPagesArticleAndSeoService.createDynamicPagesArticleAndSeo(
        req.body,
      );
    sendSuccessResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "Dynamic page article with SEO created successfully",
      data: result,
    });
  },
);

// Get all dynamic pages articles with SEO
const getAllDynamicPagesArticleAndSeo = catchAsync(
  async (req: Request, res: Response) => {
    const filters = req.query;
    const paginationOptions = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as string,
    };

    const result = await DynamicPagesArticleAndSeoService
      .getAllDynamicPagesArticleAndSeo
      // filters,
      // paginationOptions
      ();

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Dynamic pages articles with SEO fetched successfully",
      data: result.data,
      meta: result.meta,
    });
  },
);

// Get dynamic page article by ID
const getDynamicPagesArticleAndSeoById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await DynamicPagesArticleAndSeoService.getDynamicPagesArticleAndSeoById(
        id,
      );

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Dynamic page article fetched successfully",
      data: result,
    });
  },
);

// Get dynamic page article by slug
const getDynamicPagesArticleAndSeoBySlug = catchAsync(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    const result =
      await DynamicPagesArticleAndSeoService.getDynamicPagesArticleAndSeoBySlug(
        slug,
      );

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Dynamic page article fetched successfully by slug",
      data: result,
    });
  },
);

// Update dynamic page article by ID
const updateDynamicPagesArticleAndSeo = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await DynamicPagesArticleAndSeoService.updateDynamicPagesArticleAndSeo(
        id,
        req.body,
      );

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Dynamic page article updated successfully",
      data: result,
    });
  },
);

// Delete dynamic page article by ID
const deleteDynamicPagesArticleAndSeo = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await DynamicPagesArticleAndSeoService.deleteDynamicPagesArticleAndSeo(
        id,
      );

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Dynamic page article deleted successfully",
      data: result,
    });
  },
);

export const DynamicPagesArticleAndSeoController = {
  createDynamicPagesArticleAndSeo,
  getAllDynamicPagesArticleAndSeo,
  getDynamicPagesArticleAndSeoById,
  getDynamicPagesArticleAndSeoBySlug,
  updateDynamicPagesArticleAndSeo,
  deleteDynamicPagesArticleAndSeo,
};
