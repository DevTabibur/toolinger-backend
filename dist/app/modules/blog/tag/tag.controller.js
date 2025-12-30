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
exports.TagController = void 0;
const shared_constant_1 = require("../../../../constants/shared.constant");
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../../shared/pick"));
const sendSuccessResponse_1 = require("../../../../shared/sendSuccessResponse");
const http_status_1 = __importDefault(require("http-status"));
const tag_service_1 = require("./tag.service");
const tag_constant_1 = require("./tag.constant");
const createTag = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log("role", req.user);
    const result = yield tag_service_1.TagService.createTag(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Tag Created Successfully",
        data: result,
    });
}));
const getTagDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tagId } = req.params;
    const result = yield tag_service_1.TagService.getTagDetails(tagId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Tag Details Fetched Successfully",
        data: result,
    });
}));
const getAllTags = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ["searchTerm", ...tag_constant_1.TAG_FILTER_FIELDS]);
    const paginationOption = (0, pick_1.default)(req.query, shared_constant_1.paginationFields);
    const result = yield tag_service_1.TagService.getAllTags(filters, paginationOption);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Tags Fetched Successfully",
        data: result,
    });
}));
const deleteTag = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tagId } = req.params;
    const result = yield tag_service_1.TagService.deleteTag(tagId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Tag Deleted Successfully",
        data: result,
    });
}));
const getTagBySlug = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    console.log("slug", slug);
    const result = yield tag_service_1.TagService.getTagBySlug(slug);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Tag Fetched Successfully by Slug",
        data: result,
    });
}));
const updateTag = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tagId } = req.params;
    const updateData = req.body; // Fields to update
    const result = yield tag_service_1.TagService.updateTag(tagId, updateData);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Tag Updated Successfully",
        data: result,
    });
}));
exports.TagController = {
    createTag,
    getTagDetails,
    getAllTags,
    deleteTag,
    getTagBySlug,
    updateTag,
};
