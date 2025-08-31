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
exports.PageSEOService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const page_seo_model_1 = __importDefault(require("./page-seo.model"));
const mongoose_1 = require("mongoose");
const createPageSEO = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPageSEO = yield page_seo_model_1.default.findOne({ page: payload.page });
    if (existingPageSEO) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Page SEO for this page already exists");
    }
    const result = yield page_seo_model_1.default.create(payload);
    return result;
});
const getPageSEOById = (pageSEOId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(pageSEOId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid ID provided");
    }
    const result = yield page_seo_model_1.default.findById(pageSEOId);
    return result;
});
const getPageSEOByPage = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield page_seo_model_1.default.findOne({ page });
    return result;
});
const getAllPageSEO = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield page_seo_model_1.default.find().sort({ createdAt: -1 });
    return result;
});
const updatePageSEO = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid ID provided");
    }
    const result = yield page_seo_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Page SEO not found");
    }
    return result;
});
const deletePageSEO = (pageSEOId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(pageSEOId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid ID provided");
    }
    const result = yield page_seo_model_1.default.findByIdAndDelete(pageSEOId);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Page SEO not found");
    }
    return result;
});
const getAvailablePages = () => __awaiter(void 0, void 0, void 0, function* () {
    const pages = yield page_seo_model_1.default.distinct("page");
    return pages;
});
exports.PageSEOService = {
    createPageSEO,
    getPageSEOById,
    getPageSEOByPage,
    getAllPageSEO,
    updatePageSEO,
    deletePageSEO,
    getAvailablePages,
};
