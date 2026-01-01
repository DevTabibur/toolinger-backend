"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const http_status_1 = __importDefault(require("http-status"));
const contact_service_1 = require("./contact.service");
const sendEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_service_1.contactService.sendEmail(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Mail Sent Successfully!",
        data: result,
    });
}));
const getAllMails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const filters = pick(req.query, ["searchTerm", ...CONTACT_FILTER_FIELDS]);
    // const pagination: IPaginationOption = pick(req.query, paginationFields);
    // const result = await contactService.getAllMails(filters, pagination);
    const result = yield contact_service_1.contactService.getAllMails();
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "All Mail fetched Successfully!",
        data: result,
    });
}));
const deleteMailById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mailId } = req.params;
    const result = yield contact_service_1.contactService.deleteMailById(mailId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Mail Deleted Successfully!",
        data: result,
    });
}));
const deleteAllMails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_service_1.contactService.deleteAllMails();
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "All Mail Deleted Successfully!",
        data: result,
    });
}));
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
exports.contactController = {
    sendEmail,
    getAllMails,
    deleteMailById,
    deleteAllMails,
    // deleteSelectedMails,
};
