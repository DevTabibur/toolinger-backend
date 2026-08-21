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
exports.CategoryController = void 0;
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const category_service_1 = require("./category.service");
const sendSuccessResponse_1 = require("../../../../shared/sendSuccessResponse");
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../../shared/pick"));
const category_constant_1 = require("./category.constant");
const shared_constant_1 = require("../../../../constants/shared.constant");
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryService.createCategory(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Category Created Successfully",
        data: result,
    });
}));
const getCategoryDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const result = yield category_service_1.CategoryService.getCategoryDetails(categoryId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Category Details Fetched Successfully",
        data: result,
    });
}));
const getAllCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ["searchTerm", ...category_constant_1.CATEGORY_FILTER_FIELDS]);
    const paginationOption = (0, pick_1.default)(req.query, shared_constant_1.paginationFields);
    const result = yield category_service_1.CategoryService.getAllCategories(filters, paginationOption);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Categories Fetched Successfully",
        data: result,
    });
}));
const deleteCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const result = yield category_service_1.CategoryService.deleteCategory(categoryId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Category Deleted Successfully",
        data: result,
    });
}));
const getCategoryBySlug = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    console.log("slug", slug);
    const result = yield category_service_1.CategoryService.getCategoryBySlug(slug);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Category Fetched Successfully by Slug",
        data: result,
    });
}));
const updateCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const updateData = req.body; // Fields to update
    const result = yield category_service_1.CategoryService.updateCategory(categoryId, updateData);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Category Updated Successfully",
        data: result,
    });
}));
exports.CategoryController = {
    createCategory,
    getCategoryDetails,
    getAllCategories,
    deleteCategory,
    getCategoryBySlug,
    updateCategory,
};
