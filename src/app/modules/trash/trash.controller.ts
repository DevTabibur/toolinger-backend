import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";
import { TrashService } from "./trash.service";

const getAllTrashItems = catchAsync(async (req: Request, res: Response) => {
  const result = await TrashService.getAllTrashItems();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Trash retrieved successfully",
    data: result,
  });
});

const getTrashItemById = catchAsync(async (req: Request, res: Response) => {
  const { trashId } = req.params;
  const result = await TrashService.getTrashItemById(trashId);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Trash is fetched successfully",
    data: result,
  });
});

const deleteTrashItem = catchAsync(async (req: Request, res: Response) => {
  const { trashId } = req.params;
  const result = await TrashService.deleteTrashItem(trashId);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Trash deleted successfully",
    data: result,
  });
});

const deleteAllTrashItems = catchAsync(async (req: Request, res: Response) => {
  const result = await TrashService.deleteAllTrashItems();

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "All Trash deleted successfully",
    data: result,
  });
});

// restore items
const restoreItemFromTrash = catchAsync(async (req: Request, res: Response) => {
  const { trashId } = req.params;
  const { model } = req.body;
  const result = await TrashService.restoreItemFromTrash(model, trashId);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Trash Item Restored successfully",
    data: result,
  });
});

export const TrashController = {
  getAllTrashItems,
  getTrashItemById,
  deleteTrashItem,
  deleteAllTrashItems,
  restoreItemFromTrash,
};
