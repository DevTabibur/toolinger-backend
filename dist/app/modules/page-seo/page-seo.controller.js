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
exports.PageSEOController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const page_seo_service_1 = require("./page-seo.service");
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const http_status_1 = __importDefault(require("http-status"));
const createPageSEO = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield page_seo_service_1.PageSEOService.createPageSEO(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        message: "Page SEO created successfully",
        data: result,
    });
}));
const getPageSEOById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSEOId } = req.params;
    const result = yield page_seo_service_1.PageSEOService.getPageSEOById(pageSEOId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Page SEO data fetched successfully",
        data: result,
    });
}));
const getPageSEOByPage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.params;
    const result = yield page_seo_service_1.PageSEOService.getPageSEOByPage(page);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Page SEO data fetched successfully by page",
        data: result,
    });
}));
const getAllPageSEO = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield page_seo_service_1.PageSEOService.getAllPageSEO();
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "All Page SEO data fetched successfully",
        data: result,
    });
}));
const updatePageSEO = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSEOId } = req.params;
    const pageSEOData = req.body;
    const result = yield page_seo_service_1.PageSEOService.updatePageSEO(pageSEOId, pageSEOData);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Page SEO updated successfully",
        data: result,
    });
}));
const deletePageSEO = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSEOId } = req.params;
    const result = yield page_seo_service_1.PageSEOService.deletePageSEO(pageSEOId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Page SEO deleted successfully",
        data: result,
    });
}));
const getAvailablePages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield page_seo_service_1.PageSEOService.getAvailablePages();
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Available pages fetched successfully",
        data: result,
    });
}));
exports.PageSEOController = {
    createPageSEO,
    getPageSEOById,
    getPageSEOByPage,
    getAllPageSEO,
    updatePageSEO,
    deletePageSEO,
    getAvailablePages,
};
