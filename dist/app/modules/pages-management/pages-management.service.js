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
exports.DynamicPagesArticleAndSeoService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const pages_management_constant_1 = require("./pages-management.constant");
const pages_management_model_1 = __importDefault(require("./pages-management.model"));
const paginationHelper_1 = __importDefault(require("../../helpers/paginationHelper"));
// Create a new dynamic page article with SEO
const createDynamicPagesArticleAndSeo = (payload, ogImage) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { slug } = payload;
    let PageSEO;
    let PageArticle;
    // seo
    if (payload.metaTitle && payload.metaDescription) {
        PageSEO = {
            // =================================basic seo
            metaTitle: payload.metaTitle,
            metaDescription: payload.metaDescription,
            keywords: payload.keywords,
            noindex: payload.noindex,
            canonicalUrl: payload.canonicalUrl,
            ogTitle: payload.ogTitle,
            ogDescription: payload.ogDescription,
            //=======================================social media
            ogImageUrl: ((_b = (_a = ogImage[0]) === null || _a === void 0 ? void 0 : _a.filename) === null || _b === void 0 ? void 0 : _b.replace(/\.(jpg|jpeg|png|pneg)$/i, ".webp")) || "",
            ogType: payload.ogType,
            ogSiteName: payload.ogSiteName,
            ogLocale: payload.ogLocale,
            twitterCard: payload.twitterCard,
            twitterSite: payload.twitterSite,
            twitterCreator: payload.twitterCreator,
            twitterImageUrl: payload.twitterImageUrl,
            // ===================================================Technical
            changefreq: payload.changefreq,
            priority: payload.priority,
            //===========================================Schema
            schemas: payload.schemas,
        };
    }
    // article
    if (payload.content) {
        PageArticle = {
            content: payload.content,
        };
    }
    if (!slug) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Slug is required.");
    }
    // Find if a page with this slug already exists
    const existingPage = yield pages_management_model_1.default.findOne({ slug });
    // Logic 1: User wants to create PageArticle
    if (PageArticle && !PageSEO) {
        // If a page with this slug exists and already has PageArticle, throw error
        if (existingPage &&
            existingPage.PageArticle &&
            existingPage.PageArticle.content) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "PageArticle already exists for this Page.");
        }
        // If page exists but no PageArticle, update it with PageArticle
        if (existingPage) {
            existingPage.PageArticle = PageArticle;
            yield existingPage.save();
            return existingPage;
        }
        // If page does not exist, create new with PageArticle
        const result = yield pages_management_model_1.default.create({
            slug,
            PageArticle,
        });
        return result;
    }
    // Logic 2: User wants to create PageSEO
    if (PageSEO && !PageArticle) {
        // If a page with this slug exists and already has PageSEO, throw error
        if (existingPage &&
            existingPage.PageSEO &&
            existingPage.PageSEO.metaTitle) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "PageSEO already exists for this Page.");
        }
        // If page exists but no PageSEO, update it with PageSEO
        if (existingPage) {
            existingPage.PageSEO = PageSEO;
            yield existingPage.save();
            return existingPage;
        }
        // If page does not exist, create new with PageSEO
        const result = yield pages_management_model_1.default.create({
            slug,
            PageSEO,
        });
        return result;
    }
    // If both PageArticle and PageSEO are provided, handle both
    if (PageArticle && PageSEO) {
        // If a page with this slug exists, check for both
        if (existingPage) {
            // If both already exist, throw error
            if (existingPage.PageArticle &&
                existingPage.PageArticle.content &&
                existingPage.PageSEO &&
                existingPage.PageSEO.metaTitle) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Both PageArticle and PageSEO already exist for this Page.");
            }
            // If only one exists, update the missing one
            if (!existingPage.PageArticle || !existingPage.PageArticle.content) {
                existingPage.PageArticle = PageArticle;
            }
            if (!existingPage.PageSEO || !existingPage.PageSEO.metaTitle) {
                existingPage.PageSEO = PageSEO;
            }
            yield existingPage.save();
            return existingPage;
        }
        // If page does not exist, create new with both
        const result = yield pages_management_model_1.default.create({
            slug,
            PageArticle,
            PageSEO,
        });
        return result;
    }
    // If neither PageArticle nor PageSEO is provided, throw error
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "At least one of PageArticle or PageSEO must be provided.");
});
// Get all dynamic pages articles with SEO
const getAllDynamicPagesArticleAndSeo = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersFields = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: pages_management_constant_1.PAGE_MANAGEMENT_SEO_SEARCH__FIELDS.map((field) => ({
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
    const result = yield pages_management_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield pages_management_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// Get dynamic page article by ID
const getDynamicPagesArticleAndSeoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid ID");
    }
    const result = yield pages_management_model_1.default.findById(id);
    return result;
});
// Get dynamic page article by slug
const getDynamicPagesArticleAndSeoBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pages_management_model_1.default.findOne({
        slug,
    });
    return result;
});
// Update dynamic page article by ID
const updateDynamicPagesArticleAndSeo = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Prevent updating the slug field
    if ("slug" in payload) {
        delete payload.slug;
    }
    const result = yield pages_management_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete only the PageSEO or PageArticle data from the model, not the whole document
const deleteDynamicPagesData = (id, type) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid ID");
    }
    if (!type) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide type");
    }
    let unsetField = null;
    if (type === "seo") {
        unsetField = "PageSEO";
    }
    else if (type === "article") {
        unsetField = "PageArticle";
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid type provided");
    }
    const result = yield pages_management_model_1.default.findByIdAndUpdate(id, {
        $unset: { [unsetField]: "" },
    });
    return result;
});
const GetAllSEOAndArticle = (type) => __awaiter(void 0, void 0, void 0, function* () {
    if (!type) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide type");
    }
    let projection = {};
    if (type === "seo") {
        projection = { slug: 1, PageSEO: 1, _id: 1 };
    }
    else if (type === "article") {
        projection = { slug: 1, PageArticle: 1, _id: 1 };
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid type provided");
    }
    const result = yield pages_management_model_1.default.find({}, projection).lean();
    return result;
});
exports.DynamicPagesArticleAndSeoService = {
    createDynamicPagesArticleAndSeo,
    getAllDynamicPagesArticleAndSeo,
    getDynamicPagesArticleAndSeoById,
    getDynamicPagesArticleAndSeoBySlug,
    updateDynamicPagesArticleAndSeo,
    deleteDynamicPagesData,
    GetAllSEOAndArticle,
};
