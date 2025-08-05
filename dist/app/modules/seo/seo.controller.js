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
exports.SEOController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const seo_service_1 = require("./seo.service");
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const http_status_1 = __importDefault(require("http-status"));
const revalidateSEO = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Trigger revalidation on the frontend
    yield fetch("http://localhost:3000/api/revalidate?tag=seo", {
        method: "POST",
    });
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "SEO cache revalidated successfully",
        data: null,
    });
}));
const createSEO = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield seo_service_1.SEOService.createSEO(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        message: "SEO created successfully",
        data: result,
    });
}));
const getSEOById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { seoId } = req.params;
    const result = yield seo_service_1.SEOService.getSEOById(seoId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "SEO data fetched successfully",
        data: result,
    });
}));
const getSEOByPage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.params;
    const result = yield seo_service_1.SEOService.getSEOByPage(page);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "SEO data fetched successfully bg page",
        data: result,
    });
}));
const getAllSEO = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield seo_service_1.SEOService.getAllSEO();
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "All SEO data fetched successfully",
        data: result,
    });
}));
const updateSEO = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { seoId } = req.params;
    const seoData = req.body;
    const result = yield seo_service_1.SEOService.updateSEO(seoId, seoData);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "SEO updated successfully",
        data: result,
    });
}));
const deleteSEO = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { seoId } = req.params;
    console.log("delete seo id", seoId);
    const result = yield seo_service_1.SEOService.deleteSEO(seoId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "SEO deleted successfully",
        data: result,
    });
}));
exports.SEOController = {
    getSEOByPage,
    createSEO,
    getSEOById,
    getAllSEO,
    updateSEO,
    deleteSEO,
    revalidateSEO,
};
