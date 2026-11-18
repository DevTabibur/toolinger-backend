import { FilterQuery, SortOrder, Types } from "mongoose";
import ApiError from "../../../../errors/ApiError";
import { ICategory } from "./category.interface";
import CategoryModel from "./category.model";
import httpStatus from "http-status";
import { CATEGORY_SEARCH_FIELDS, ICategoryFilters } from "./category.constant";
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from "../../../../interfaces/sharedInterface";
import paginationHelper from "../../../helpers/paginationHelper";

const createCategory = async (categoryData: ICategory): Promise<ICategory> => {
  const result = await CategoryModel.create(categoryData);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Category Creation Failed");
  }
  return result;
};

const getCategoryDetails = async (categoryId: string): Promise<ICategory> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Category Id");
  }
  const result = await CategoryModel.findById(categoryId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  }
  return result;
};
// working already
const getAllCategories = async (
  filters: ICategoryFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<ICategory[]>> => {
  const { searchTerm, ...filtersFields } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: CATEGORY_SEARCH_FIELDS.map((field) => ({
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

  const result = await CategoryModel.find(whereCondition)
    .populate("parentId", " name")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number);

  const total = await CategoryModel.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteCategory = async (categoryId: string): Promise<ICategory> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Category Id");
  }
  const result = await CategoryModel.findByIdAndDelete(categoryId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  }
  return result;
};

// delete for trash records
// const deleteVehicle = async (vehicleId: string): Promise<IVehicle | null> => {
//   if (!Types.ObjectId.isValid(vehicleId)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'invalid Vehicle id provided')
//   }

//   const session = await VehicleModel.startSession()
//   session.startTransaction()

//   try {
//     // Delete data
//     const result =
//       await VehicleModel.findByIdAndDelete(vehicleId).session(session)
//     if (!result) {
//       throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found')
//     }
//     // Create trash record
//     const trashRecord = new TrashModel({
//       model: 'Vehicle',
//       data: result,
//       deletedAt: new Date(),
//       expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiration
//     })

//     // Save the trash record (this is done in parallel)
//     const trashSavePromise = trashRecord.save()

//     // Commit the transaction
//     await Promise.all([trashSavePromise])

//     // Commit the session
//     await session.commitTransaction()
//     session.endSession()

//     return result
//   } catch (error) {
//     // If any error occurs, abort the transaction
//     await session.abortTransaction()
//     session.endSession()
//     throw error
//   }
// }

const getCategoryBySlug = async (slug: string): Promise<ICategory> => {
  const result = await CategoryModel.findOne({ slug });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  }
  return result;
};

const updateCategory = async (
  categoryId: string,
  updateData: Partial<ICategory>,
): Promise<ICategory> => {
  console.log("updateCategory", updateData);
  console.log("categoryId", categoryId);
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Category Id");
  }

  const result = await CategoryModel.findByIdAndUpdate(categoryId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  }

  return result;
};

export const CategoryService = {
  createCategory,
  getCategoryDetails,
  getAllCategories,
  deleteCategory,
  getCategoryBySlug,
  updateCategory,
};
