import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";
import { contactService } from "./contact.service";
import pick from "../../../shared/pick";
import { CONTACT_FILTER_FIELDS } from "./contact.contant";
import { IPaginationOption } from "../../../interfaces/sharedInterface";
import { paginationFields } from "../../../constants/shared.constant";

const sendEmail = catchAsync(async (req: Request, res: Response) => {
  const result = await contactService.sendEmail(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Mail Sent Successfully!",
    data: result,
  });
});

const getAllMails = catchAsync(async (req: Request, res: Response) => {
  // const filters = pick(req.query, ["searchTerm", ...CONTACT_FILTER_FIELDS]);
  // const pagination: IPaginationOption = pick(req.query, paginationFields);
  // const result = await contactService.getAllMails(filters, pagination);
  const result = await contactService.getAllMails();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "All Mail fetched Successfully!",
    data: result,
  });
});

const deleteMailById = catchAsync(async (req: Request, res: Response) => {
  const { mailId } = req.params;
  const result = await contactService.deleteMailById(mailId);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Mail Deleted Successfully!",
    data: result,
  });
});
const deleteAllMails = catchAsync(async (req: Request, res: Response) => {
  const result = await contactService.deleteAllMails();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "All Mail Deleted Successfully!",
    data: result,
  });
});

// const deleteSelectedMails = catchAsync(async (req: Request, res: Response) => {
//   const { mailIds } = req.body; // Extract mailIds from request body

//   // Ensure the payload contains the mailIds field
//   if (!mailIds || !Array.isArray(mailIds)) {
//     return res.status(400).json({ message: "mailIds must be an array" });
//   }

//   const result = await contactService.deleteSelectedMails(mailIds);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Selected Mail Deleted!",
//     data: result,
//   });
// });

export const contactController = {
  sendEmail,
  getAllMails,
  deleteMailById,
  deleteAllMails,
  // deleteSelectedMails,
};
