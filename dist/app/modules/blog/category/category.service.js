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
exports.CategoryService = void 0;
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../../errors/ApiError"));
const category_model_1 = __importDefault(require("./category.model"));
const http_status_1 = __importDefault(require("http-status"));
const category_constant_1 = require("./category.constant");
const paginationHelper_1 = __importDefault(require("../../../helpers/paginationHelper"));
const createCategory = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.default.create(categoryData);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Category Creation Failed");
    }
    return result;
});
const getCategoryDetails = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(categoryId)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid Category Id");
    }
    const result = yield category_model_1.default.findById(categoryId);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category Not Found");
    }
    return result;
});
// working already
const getAllCategories = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersFields = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: category_constant_1.CATEGORY_SEARCH_FIELDS.map((field) => ({
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
    const result = yield category_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield category_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(categoryId)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid Category Id");
    }
    const result = yield category_model_1.default.findByIdAndDelete(categoryId);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category Not Found");
    }
    return result;
});
const getCategoryBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.default.findOne({ slug });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category Not Found");
    }
    return result;
});
const updateCategory = (categoryId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("updateCategory", updateData);
    console.log("categoryId", categoryId);
    if (!mongoose_1.Types.ObjectId.isValid(categoryId)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid Category Id");
    }
    const result = yield category_model_1.default.findByIdAndUpdate(categoryId, updateData, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category Not Found");
    }
    return result;
});
exports.CategoryService = {
    createCategory,
    getCategoryDetails,
    getAllCategories,
    deleteCategory,
    getCategoryBySlug,
    updateCategory,
};
