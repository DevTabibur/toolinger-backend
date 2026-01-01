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
exports.DynamicPagesArticleAndSeoController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pages_management_service_1 = require("./pages-management.service");
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const shared_constant_1 = require("../../../constants/shared.constant");
const pages_management_constant_1 = require("./pages-management.constant");
// Create a new dynamic page article with SEO
const createDynamicPagesArticleAndSeo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    let ogImageUrl;
    if (Array.isArray(files)) {
        ogImageUrl = files;
    }
    else if (files && typeof files === "object" && "ogImageUrl" in files) {
        ogImageUrl = files
            .ogImageUrl;
    }
    let twitterImageUrl;
    if (Array.isArray(files)) {
        twitterImageUrl = files;
    }
    else if (files &&
        typeof files === "object" &&
        "twitterImageUrl" in files) {
        twitterImageUrl = files.twitterImageUrl;
    }
    // console.log("ogImage", ogImage);
    // console.log("twitterImageUrl", twitterImageUrl);
    // console.log("req.body", req.body);
    const result = yield pages_management_service_1.DynamicPagesArticleAndSeoService.createDynamicPagesArticleAndSeo(req.body, ogImageUrl !== null && ogImageUrl !== void 0 ? ogImageUrl : [], twitterImageUrl !== null && twitterImageUrl !== void 0 ? twitterImageUrl : []);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        message: "Dynamic page article with SEO created successfully",
        data: result,
    });
}));
// Get all dynamic pages articles with SEO
const getAllDynamicPagesArticleAndSeo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, [
        "searchTerm",
        ...pages_management_constant_1.PAGE_MANAGEMENT_FILTER_FIELDS,
    ]);
    const paginationOptions = (0, pick_1.default)(req.query, shared_constant_1.paginationFields);
    const result = yield pages_management_service_1.DynamicPagesArticleAndSeoService.getAllDynamicPagesArticleAndSeo(filters, paginationOptions);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Dynamic pages articles with SEO fetched successfully",
        data: result,
    });
}));
// Get dynamic page article by ID
const getDynamicPagesArticleAndSeoById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield pages_management_service_1.DynamicPagesArticleAndSeoService.getDynamicPagesArticleAndSeoById(id);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Dynamic page article fetched successfully",
        data: result,
    });
}));
// Get dynamic page article by slug
const getDynamicPagesArticleAndSeoBySlug = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result = yield pages_management_service_1.DynamicPagesArticleAndSeoService.getDynamicPagesArticleAndSeoBySlug(slug);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Dynamic page article fetched successfully by slug",
        data: result,
    });
}));
// Update dynamic page article by ID
const updateDynamicPagesArticleAndSeo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield pages_management_service_1.DynamicPagesArticleAndSeoService.updateDynamicPagesArticleAndSeo(id, req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Dynamic page article updated successfully",
        data: result,
    });
}));
// Delete dynamic page article by ID
const deleteDynamicPagesData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield pages_management_service_1.DynamicPagesArticleAndSeoService.deleteDynamicPagesData(id);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Dynamic page SEO deleted successfully",
        data: result,
    });
}));
const GetAllSEOAndArticle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, type } = req.params;
    const result = yield pages_management_service_1.DynamicPagesArticleAndSeoService.GetAllSEOAndArticle(type);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: type === "seo"
            ? "Dynamic page SEO fetched successfully"
            : type === "article"
                ? "Dynamic page article fetched successfully"
                : "Dynamic page data fetched successfully",
        data: result,
    });
}));
exports.DynamicPagesArticleAndSeoController = {
    createDynamicPagesArticleAndSeo,
    getAllDynamicPagesArticleAndSeo,
    getDynamicPagesArticleAndSeoById,
    getDynamicPagesArticleAndSeoBySlug,
    updateDynamicPagesArticleAndSeo,
    deleteDynamicPagesData,
    GetAllSEOAndArticle,
};
