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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentMessageService = exports.sendEmail = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const sent_message_model_1 = __importDefault(require("./sent-message.model"));
const sendZeptoMail_1 = require("../../helpers/sendZeptoMail");
const sent_message_constant_1 = require("./sent-message.constant");
const paginationHelper_1 = __importDefault(require("../../helpers/paginationHelper"));
const sendEmail = (emailData) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, name, to, subject, htmlBody } = emailData;
    const res = yield (0, sendZeptoMail_1.sendZeptoMail)({
        to,
        subject,
        htmlBody,
        fromName: name,
        fromEmail: from,
    });
    // console.log("res", res);
    if ((res === null || res === void 0 ? void 0 : res.message) === "OK") {
        const storeInDB = yield sent_message_model_1.default.insertMany(to.map((r) => ({
            recipientEmail: r.email,
            recipientName: r.name,
            subject,
            content: htmlBody,
            status: "sent",
            sentAt: new Date(),
        })));
        // console.log("storeInDB", storeInDB);
        return storeInDB;
    }
    // console.log("storeInDB", storeInDB)
});
exports.sendEmail = sendEmail;
const getAllSentMessages = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersFields = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: sent_message_constant_1.MESSAGE_SEARCH_FIELDS.map((field) => ({
                [field]: new RegExp(searchTerm, "i"),
            })),
        });
    }
    if (Object.keys(filtersFields).length) {
        const fieldConditions = Object.entries(filtersFields).map(([key, value]) => ({
            [key]: value,
        }));
        andConditions.push({ $and: fieldConditions });
    }
    const whereCondition = andConditions.length ? { $and: andConditions } : {};
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.default)(paginationOption);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const result = yield sent_message_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield sent_message_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const deleteSentMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sent_message_model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Message log not found");
    }
    return result;
});
exports.SentMessageService = {
    sendEmail: exports.sendEmail,
    getAllSentMessages,
    deleteSentMessage,
};
