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
exports.SEOService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const seo_model_1 = __importDefault(require("./seo.model"));
const mongoose_1 = require("mongoose");
const createSEO = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingSEO = yield seo_model_1.default.findOne({ page: payload.page });
    console.log("payload", payload);
    if (existingSEO) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "SEO for this page already exists");
    }
    const res = yield seo_model_1.default.create(payload);
    return res;
});
const getSEOById = (seoId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield seo_model_1.default.findById(seoId);
    return res;
});
const getSEOByPage = (page) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("page", page);
    const res = yield seo_model_1.default.findOne({ page });
    return res;
});
const getAllSEO = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield seo_model_1.default.find();
    return result;
});
const updateSEO = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid id provided");
    }
    console.log("payload", payload);
    const res = yield seo_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    console.log("update seo", res);
    return res;
});
const deleteSEO = (seoId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield seo_model_1.default.findByIdAndDelete(seoId);
    return res;
});
exports.SEOService = {
    createSEO,
    getSEOById,
    getAllSEO,
    updateSEO,
    deleteSEO,
    getSEOByPage,
};
