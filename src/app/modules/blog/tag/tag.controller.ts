import { paginationFields } from "../../../../constants/shared.constant";
import { IPaginationOption } from "../../../../interfaces/sharedInterface";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import { sendSuccessResponse } from "../../../../shared/sendSuccessResponse";
import httpStatus from "http-status";
import { TagService } from "./tag.service";
import { Request, Response } from "express";
import { TAG_FILTER_FIELDS } from "./tag.constant";

const createTag = catchAsync(async (req: Request, res: Response) => {
  //   console.log("role", req.user);
  const result = await TagService.createTag(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Tag Created Successfully",
    data: result,
  });
});

const getTagDetails = catchAsync(async (req: Request, res: Response) => {
  const { tagId } = req.params;
  const result = await TagService.getTagDetails(tagId);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Tag Details Fetched Successfully",
    data: result,
  });
});

const getAllTags = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm", ...TAG_FILTER_FIELDS]);
  const paginationOption: IPaginationOption = pick(req.query, paginationFields);
  const result = await TagService.getAllTags(filters, paginationOption);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Tags Fetched Successfully",
    data: result,
  });
});

const deleteTag = catchAsync(async (req: Request, res: Response) => {
  const { tagId } = req.params;
  const result = await TagService.deleteTag(tagId);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Tag Deleted Successfully",
    data: result,
  });
});

const getTagBySlug = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  console.log("slug", slug);
  const result = await TagService.getTagBySlug(slug);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Tag Fetched Successfully by Slug",
    data: result,
  });
});

const updateTag = catchAsync(async (req: Request, res: Response) => {
  const { tagId } = req.params;
  const updateData = req.body; // Fields to update

  const result = await TagService.updateTag(tagId, updateData);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Tag Updated Successfully",
    data: result,
  });
});

export const TagController = {
  createTag,
  getTagDetails,
  getAllTags,
  deleteTag,
  getTagBySlug,
  updateTag,
};
