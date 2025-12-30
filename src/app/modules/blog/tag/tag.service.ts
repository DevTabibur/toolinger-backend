import ApiError from "../../../../errors/ApiError";
import httpStatus from "http-status";
import { ITag } from "./tag.interface";
import TagModel from "./tag.model";
import { SortOrder, Types } from "mongoose";
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from "../../../../interfaces/sharedInterface";
import paginationHelper from "../../../helpers/paginationHelper";
import { ITagFilters, TAG_SEARCH_FIELDS } from "./tag.constant";

const createTag = async (categoryData: ITag): Promise<ITag> => {
  const result = await TagModel.create(categoryData);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Tag Creation Failed");
  }
  return result;
};

const getTagDetails = async (tagId: string): Promise<ITag> => {
  if (!Types.ObjectId.isValid(tagId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Tag Id");
  }
  const result = await TagModel.findById(tagId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tag Not Found");
  }
  return result;
};

const getAllTags = async (
  filters: ITagFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<ITag[]>> => {
  const { searchTerm, ...filtersFields } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: TAG_SEARCH_FIELDS.map((field) => ({
        [field]: new RegExp(searchTerm, "i"),
      })),
    });
  }

  if (Object.keys(filtersFields).length) {
    const fieldConditions = Object.entries(filtersFields).map(
      ([key, value]) => ({
        [key]: value,
      }),
    );
    andConditions.push({ $and: fieldConditions });
  }

  const whereCondition = andConditions.length ? { $and: andConditions } : {};

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOption);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await TagModel.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number);

  const total = await TagModel.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteTag = async (tagId: string): Promise<ITag> => {
  if (!Types.ObjectId.isValid(tagId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Tag Id");
  }
  const result = await TagModel.findByIdAndDelete(tagId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tag Not Found");
  }
  return result;
};

const getTagBySlug = async (slug: string): Promise<ITag> => {
  const result = await TagModel.findOne({ slug });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tag Not Found");
  }
  return result;
};

const updateTag = async (
  tagId: string,
  updateData: Partial<ITag>,
): Promise<ITag> => {
  //   console.log("updateCategory", updateData);
  //   console.log("tagId", tagId);
  if (!Types.ObjectId.isValid(tagId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Tag Id");
  }

  const result = await TagModel.findByIdAndUpdate(tagId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tag Not Found");
  }

  return result;
};

export const TagService = {
  createTag,
  getTagDetails,
  getAllTags,
  deleteTag,
  getTagBySlug,
  updateTag,
};
