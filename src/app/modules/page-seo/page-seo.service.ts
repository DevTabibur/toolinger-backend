import { IPageSEO } from "./page-seo.interface";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import PageSEOModel from "./page-seo.model";
import { Types } from "mongoose";

const createPageSEO = async (payload: IPageSEO): Promise<IPageSEO> => {
  const existingPageSEO = await PageSEOModel.findOne({ page: payload.page });

  if (existingPageSEO) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Page SEO for this page already exists",
    );
  }

  const result = await PageSEOModel.create(payload);
  return result;
};

const getPageSEOById = async (pageSEOId: string): Promise<IPageSEO | null> => {
  if (!Types.ObjectId.isValid(pageSEOId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ID provided");
  }

  const result = await PageSEOModel.findById(pageSEOId);
  return result;
};

const getPageSEOByPage = async (page: string): Promise<IPageSEO | null> => {
  const result = await PageSEOModel.findOne({ page });
  return result;
};

const getAllPageSEO = async (): Promise<IPageSEO[]> => {
  const result = await PageSEOModel.find().sort({ createdAt: -1 });
  return result;
};

const updatePageSEO = async (
  id: string,
  payload: Partial<IPageSEO>,
): Promise<IPageSEO | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ID provided");
  }

  const result = await PageSEOModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Page SEO not found");
  }

  return result;
};

const deletePageSEO = async (pageSEOId: string): Promise<IPageSEO | null> => {
  if (!Types.ObjectId.isValid(pageSEOId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ID provided");
  }

  const result = await PageSEOModel.findByIdAndDelete(pageSEOId);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Page SEO not found");
  }

  return result;
};

const getAvailablePages = async (): Promise<string[]> => {
  const pages = await PageSEOModel.distinct("page");
  return pages;
};

export const PageSEOService = {
  createPageSEO,
  getPageSEOById,
  getPageSEOByPage,
  getAllPageSEO,
  updatePageSEO,
  deletePageSEO,
  getAvailablePages,
};
