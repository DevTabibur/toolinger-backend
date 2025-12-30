import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserServices } from "./user.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { IPaginationOption } from "../../../interfaces/sharedInterface";
import { paginationFields } from "../../../constants/shared.constant";
import { USER_FILTER_FIELDS, USER_SEARCH_FIELDS } from "./user.constant";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm", ...USER_SEARCH_FIELDS]);
  const paginationOption: IPaginationOption = pick(req.query, paginationFields);
  const result = await UserServices.getAllUser(filters, paginationOption);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "User list fetched successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updateInfo = req.body;
  const result = await UserServices.updateProfile(userId, updateInfo);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Profile Created Successfully",
    data: result,
  });
});

const getSingleUserById = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await UserServices.getSingleUserById(userId);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "User fetched Successfully",
    data: result,
  });
});

export const UserController = {
  updateProfile,
  getAllUser,
  getSingleUserById,
};
