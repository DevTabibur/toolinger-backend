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
exports.contactService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const contact_model_1 = __importDefault(require("./contact.model"));
// Define the business logic for sending an email
const sendEmail = (mailData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, message, email, subject } = mailData;
    // Validate input data
    if (!name || !message || !email) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Data is required");
    }
    const result = yield contact_model_1.default.create(mailData);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Mail sent unsuccessful!");
    }
    return result;
});
// Get all emails with pagination and filtering
const getAllMails = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield contact_model_1.default.find();
    return result;
});
// Delete a single mail by ID
const deleteMailById = (mailId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(mailId)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Mail not found");
    }
    const result = yield contact_model_1.default.findByIdAndDelete(mailId);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Mail not found, to delete");
    }
    return result;
});
// ** New Business Logic: Delete all emails
const deleteAllMails = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_model_1.default.deleteMany({});
    if (result.deletedCount === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No emails found to delete");
    }
    return result;
});
// ** New Business Logic: Delete selected mails by IDs
const deleteSelectedMails = (mailIds) => __awaiter(void 0, void 0, void 0, function* () {
    const invalidIds = mailIds.filter((id) => !mongoose_1.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid mail IDs provided");
    }
    const result = yield contact_model_1.default.deleteMany({
        _id: { $in: mailIds },
    });
    if (result.deletedCount === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No selected emails found to delete");
    }
    return result;
});
exports.contactService = {
    sendEmail,
    getAllMails,
    deleteMailById,
    deleteAllMails,
    deleteSelectedMails,
};
