import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { SentMessageService } from "./sent-message.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { MESSAGE_FILTER_FIELDS } from "./sent-message.constant";
import { IPaginationOption } from "../../../interfaces/sharedInterface";
import { paginationFields } from "../../../constants/shared.constant";

const sendEmail = catchAsync(async (req: Request, res: Response) => {
  const result = await SentMessageService.sendEmail(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Email sent successfully",
    data: result,
  });
});

const getAllSentMessages = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm", ...MESSAGE_FILTER_FIELDS]);
  const paginationOption: IPaginationOption = pick(req.query, paginationFields);

  const result = await SentMessageService.getAllSentMessages(
    filters,
    paginationOption,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Sent messages retrieved successfully",
    data: result,
  });
});

const deleteSentMessage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SentMessageService.deleteSentMessage(id);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Sent message log deleted successfully",
    data: result,
  });
});

export const SentMessageController = {
  sendEmail,
  getAllSentMessages,
  deleteSentMessage,
};
