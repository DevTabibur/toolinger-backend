import { Types } from "mongoose";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import TrashModel from "./trash.model";
import { ITrash } from "./trash.interface";
import BlogPostModel from "../blog/blog.model";

// Get All Trash Items
export const getAllTrashItems = async () => {
  return await TrashModel.find();
};

// Get Trash Item by ID
const getTrashItemById = async (trashId: string): Promise<ITrash | null> => {
  if (!Types.ObjectId.isValid(trashId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Trash is invalid");
  }
  const result = await TrashModel.findOne({ _id: trashId });

  return result;
};

// DELETE Trash Item by ID
const deleteTrashItem = async (trashId: string): Promise<ITrash | null> => {
  if (!Types.ObjectId.isValid(trashId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Trash is invalid");
  }
  const result = await TrashModel.findByIdAndDelete({ _id: trashId });
  return result;
};

// ALL Trash DELETED
const deleteAllTrashItems = async () => {
  return await TrashModel.deleteMany({});
};

// RESTORE Items from Trash
const restoreItemFromTrash = async (model: string, trashId: string) => {
  // Find the deleted item in Trash based on model and itemId
  // console.log('model', model)
  // console.log('trashId', trashId)
  const trashItem = await TrashModel.findOne({
    _id: trashId,
    model,
  });

  // console.log('trashItem', trashItem)

  if (!trashItem) {
    throw new ApiError(httpStatus.BAD_GATEWAY, "Item not found in trash");
  }

  let restoredItem;

  // Dynamically restore the item based on the model type
  switch (model) {
    case "BlogPost":
      restoredItem = new BlogPostModel(trashItem.data);
      await restoredItem.save();
      break;

    // case "profile":
    //   restoredItem = new ProfileModel(trashItem.data);
    //   await restoredItem.save();
    //   break;

    default:
      throw new ApiError(httpStatus.BAD_GATEWAY, "Invalid model type");
  }

  // Remove the item from the Trash collection after restoring
  await TrashModel.deleteOne({ _id: trashId, model });

  return restoredItem;
};

export const TrashService = {
  getAllTrashItems,
  getTrashItemById,
  deleteTrashItem,
  deleteAllTrashItems,
  restoreItemFromTrash,
};
