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
// Create or update a dynamic page article with SEO
const createDynamicPagesArticleAndSeo = (payload, ogImageUrl, twitterImageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { slug, title, type } = payload;
    const missingFields = [];
    if (!slug)
        missingFields.push("slug");
    if (!title)
        missingFields.push("title");
    if (!type)
        missingFields.push("type");
    if (missingFields.length > 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Missing required field${missingFields.length > 1 ? "s" : ""}: ${missingFields.join(", ")}.`);
    }
    // Check if a page with this slug already exists
    const existingPage = yield pages_management_model_1.default.findOne({ slug, title, type });
    // console.log("existing page", existingPage)
    if (existingPage) {
        if (payload.pageContent) {
            existingPage.pageContent = payload.pageContent;
        }
        if (payload.metaTitle) {
            //===================================Basic SEO
            existingPage.metaTitle = payload.metaTitle;
            existingPage.metaDescription = payload.metaDescription;
            existingPage.keywords = payload.keywords;
            existingPage.canonicalUrl = payload.canonicalUrl;
            existingPage.noindex = payload.noindex;
            //=============================Open Graph
            existingPage.ogTitle = payload.ogTitle;
            existingPage.ogDescription = payload.ogDescription;
            existingPage.ogImageUrl =
                ogImageUrl && ((_a = ogImageUrl[0]) === null || _a === void 0 ? void 0 : _a.filename)
                    ? ogImageUrl[0].filename.replace(/\.(jpg|jpeg|png|pneg)$/i, ".webp")
                    : "";
            existingPage.ogType = payload.ogType;
            existingPage.ogSiteName = payload.ogSiteName;
            existingPage.ogLocale = payload.ogLocale;
            //=============================Twitter Card
            existingPage.twitterCard = payload.twitterCard;
            existingPage.twitterSite = payload.twitterSite;
            existingPage.twitterCreator = payload.twitterCreator;
            existingPage.twitterImageUrl =
                twitterImageUrl && ((_b = twitterImageUrl[0]) === null || _b === void 0 ? void 0 : _b.filename)
                    ? twitterImageUrl[0].filename.replace(/\.(jpg|jpeg|png|pneg)$/i, ".webp")
                    : "";
            //=============================Hreflang / Alternates
            ((existingPage.alternates = payload.keywords),
                // =============================Sitemap helpers
                (existingPage.changefreq = payload.changefreq));
            existingPage.priority = payload.priority;
            // =============================Schema
            existingPage.schemas = payload.schemas;
        }
        yield existingPage.save();
        return existingPage;
    }
    // If page does not exist, create new
    if (!existingPage) {
        if (ogImageUrl && ((_c = ogImageUrl[0]) === null || _c === void 0 ? void 0 : _c.filename)) {
            payload.ogImageUrl = ogImageUrl[0].filename.replace(/\.(jpg|jpeg|png|pneg)$/i, ".webp");
        }
        if (twitterImageUrl && ((_d = twitterImageUrl[0]) === null || _d === void 0 ? void 0 : _d.filename)) {
            payload.twitterImageUrl = twitterImageUrl[0].filename.replace(/\.(jpg|jpeg|png|pneg)$/i, ".webp");
        }
        const result = yield pages_management_model_1.default.create(payload);
        return result;
    }
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
    if (!slug) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Slug is required");
    }
    const result = yield pages_management_model_1.default.findOne({
        slug: `/${slug}`,
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
const deleteDynamicPagesData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid ID");
    }
    const result = yield pages_management_model_1.default.findByIdAndDelete(id);
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
