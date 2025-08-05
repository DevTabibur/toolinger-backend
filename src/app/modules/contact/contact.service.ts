import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IContactFilters, IContactMail } from "./contact.interface";
import { SortOrder, Types } from "mongoose";
import ContactMailModel from "./contact.model";
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from "../../../interfaces/sharedInterface";
import paginationHelper from "../../helpers/paginationHelper";
import { CONTACT_SEARCH_FIELDS } from "./contact.contant";

// Define the business logic for sending an email
const sendEmail = async (mailData: IContactMail): Promise<IContactMail> => {
  const { name, message, email, subject } = mailData;

  // Validate input data
  if (!name || !message || !email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Data is required");
  }

  const result = await ContactMailModel.create(mailData);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Mail sent unsuccessful!");
  }
  return result;
};

// Get all emails with pagination and filtering
const getAllMails = async () =>
  // filters: IContactFilters,
  // paginationOption: IPaginationOption,
  {
    // // Promise<IGenericDataWithMeta<IContactMail[]>>
    // const { searchTerm, ...filtersFields } = filters;

    // const andConditions = [];

    // if (searchTerm) {
    //   andConditions.push({
    //     $or: CONTACT_SEARCH_FIELDS.map((field) => ({
    //       [field]: new RegExp(searchTerm, "i"),
    //     })),
    //   });
    // }

    // if (Object.keys(filtersFields).length) {
    //   const fieldConditions = Object.entries(filtersFields).map(
    //     ([key, value]) => ({
    //       [key]: value,
    //     }),
    //   );

    //   andConditions.push({
    //     $and: fieldConditions,
    //   });
    // }

    // const whereCondition = andConditions.length ? { $and: andConditions } : {};

    // const { page, limit, skip, sortBy, sortOrder } =
    //   paginationHelper(paginationOption);

    // const sortCondition: { [key: string]: SortOrder } = {};

    // if (sortBy && sortOrder) {
    //   sortCondition[sortBy] = sortOrder;
    // }

    // const result = await ContactMailModel.find(whereCondition)
    //   .sort(sortCondition)
    //   .skip(skip)
    //   .limit(limit as number);
    // const total = await ContactMailModel.countDocuments();

    // const responseData = {
    //   meta: {
    //     page,
    //     limit,
    //     total,
    //   },
    //   data: result,
    // };

    // return responseData;

    const result = await ContactMailModel.find();
    return result;
  };

// Delete a single mail by ID
const deleteMailById = async (mailId: string) => {
  if (!Types.ObjectId.isValid(mailId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Mail not found");
  }
  const result = await ContactMailModel.findByIdAndDelete(mailId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Mail not found, to delete");
  }
  return result;
};

// ** New Business Logic: Delete all emails
const deleteAllMails = async () => {
  const result = await ContactMailModel.deleteMany({});
  if (result.deletedCount === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No emails found to delete");
  }
  return result;
};

// ** New Business Logic: Delete selected mails by IDs
const deleteSelectedMails = async (mailIds: string[]) => {
  const invalidIds = mailIds.filter((id) => !Types.ObjectId.isValid(id));
  if (invalidIds.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid mail IDs provided");
  }

  const result = await ContactMailModel.deleteMany({
    _id: { $in: mailIds },
  });

  if (result.deletedCount === 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "No selected emails found to delete",
    );
  }

  return result;
};

export const contactService = {
  sendEmail,
  getAllMails,
  deleteMailById,
  deleteAllMails,
  deleteSelectedMails,
};
