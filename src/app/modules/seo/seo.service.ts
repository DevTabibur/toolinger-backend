import { ISEO } from "./seo.interface";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import SEOModel from "./seo.model";
import { Types } from "mongoose";

const createSEO = async (payload: ISEO): Promise<ISEO> => {
  const existingSEO = await SEOModel.findOne({ page: payload.page });
  console.log("payload", payload);
  if (existingSEO) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "SEO for this page already exists",
    );
  }
  const res = await SEOModel.create(payload);
  return res;
};

const getSEOById = async (seoId: string): Promise<ISEO | null> => {
  const res = await SEOModel.findById(seoId);
  return res;
};

const getSEOByPage = async (page: string): Promise<ISEO | null> => {
  console.log("page", page);
  const res = await SEOModel.findOne({ page });
  return res;
};

const getAllSEO = async (): Promise<ISEO[]> => {
  const result = await SEOModel.find();
  return result;
};

const updateSEO = async (
  id: string,
  payload: Partial<ISEO>,
): Promise<ISEO | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid id provided");
  }
  console.log("payload", payload);
  const res = await SEOModel.findByIdAndUpdate(id, payload, { new: true });
  console.log("update seo", res);
  return res;
};

const deleteSEO = async (seoId: string): Promise<ISEO | null> => {
  const res = await SEOModel.findByIdAndDelete(seoId);
  return res;
};

export const SEOService = {
  createSEO,
  getSEOById,
  getAllSEO,
  updateSEO,
  deleteSEO,
  getSEOByPage,
};
