import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import SentMessageModel from "./sent-message.model";
import { ISendEmailRequest, ISentMessage } from "./sent-message.interface";
import { sendZeptoMail } from "../../helpers/sendZeptoMail";
import {
  IMessageFilters,
  MESSAGE_SEARCH_FIELDS,
} from "./sent-message.constant";
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from "../../../interfaces/sharedInterface";
import { SortOrder } from "mongoose";
import paginationHelper from "../../helpers/paginationHelper";

export const sendEmail = async (emailData: ISendEmailRequest) => {
  const { from, name, to, subject, htmlBody } = emailData;

  const res = await sendZeptoMail({
    to,
    subject,
    htmlBody,
    fromName: name,
    fromEmail: from,
  });
  // console.log("res", res);
  if (res?.message === "OK") {
    const storeInDB = await SentMessageModel.insertMany(
      to.map((r) => ({
        recipientEmail: r.email,
        recipientName: r.name,
        subject,
        content: htmlBody,
        status: "sent",
        sentAt: new Date(),
      })),
    );
    // console.log("storeInDB", storeInDB);

    return storeInDB;
  }
  // console.log("storeInDB", storeInDB)
};

const getAllSentMessages = async (
  filters: IMessageFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<ISentMessage[]>> => {
  const { searchTerm, ...filtersFields } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: MESSAGE_SEARCH_FIELDS.map((field) => ({
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

  const result = await SentMessageModel.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number);

  const total = await SentMessageModel.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteSentMessage = async (id: string) => {
  const result = await SentMessageModel.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Message log not found");
  }
  return result;
};

export const SentMessageService = {
  sendEmail,
  getAllSentMessages,
  deleteSentMessage,
};
