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
exports.BlogService = void 0;
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const blog_model_1 = __importDefault(require("./blog.model"));
const http_status_1 = __importDefault(require("http-status"));
const blog_utils_1 = require("./blog.utils");
const trash_model_1 = __importDefault(require("../trash/trash.model"));
const blog_constant_1 = require("./blog.constant");
const paginationHelper_1 = __importDefault(require("../../helpers/paginationHelper"));
const createBlogPost = (blogData, blogFeaturedImage, seoImage) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    // console.log("blogData", blogData);
    const slug = (0, blog_utils_1.generateSlug)(blogData === null || blogData === void 0 ? void 0 : blogData.title);
    const excerpt = (blogData === null || blogData === void 0 ? void 0 : blogData.excerpt) || (0, blog_utils_1.generateExcerpt)(blogData === null || blogData === void 0 ? void 0 : blogData.content);
    const blog = {
        title: blogData === null || blogData === void 0 ? void 0 : blogData.title,
        slug: slug,
        content: blogData === null || blogData === void 0 ? void 0 : blogData.content,
        status: blogData === null || blogData === void 0 ? void 0 : blogData.status,
        excerpt: excerpt,
        author: blogData === null || blogData === void 0 ? void 0 : blogData.author,
        categories: blogData === null || blogData === void 0 ? void 0 : blogData.categories,
        tags: blogData === null || blogData === void 0 ? void 0 : blogData.tags,
        blogFeaturedImage: ((_b = (_a = blogFeaturedImage[0]) === null || _a === void 0 ? void 0 : _a.filename) === null || _b === void 0 ? void 0 : _b.replace(/\.(jpg|jpeg|png|pneg)$/i, ".webp")) || "",
        allowComments: blogData === null || blogData === void 0 ? void 0 : blogData.allowComments,
        isFeatured: blogData === null || blogData === void 0 ? void 0 : blogData.isFeatured,
        isSponsored: blogData === null || blogData === void 0 ? void 0 : blogData.isSponsored,
        sponsorName: blogData === null || blogData === void 0 ? void 0 : blogData.sponsorName,
        sponsorUrl: blogData === null || blogData === void 0 ? void 0 : blogData.sponsorUrl,
        // seo
        seo: {
            title: (_c = blogData === null || blogData === void 0 ? void 0 : blogData.seo) === null || _c === void 0 ? void 0 : _c.title,
            description: (_d = blogData === null || blogData === void 0 ? void 0 : blogData.seo) === null || _d === void 0 ? void 0 : _d.description,
            keywords: (_e = blogData === null || blogData === void 0 ? void 0 : blogData.seo) === null || _e === void 0 ? void 0 : _e.keywords,
            seoImage: ((_g = (_f = seoImage[0]) === null || _f === void 0 ? void 0 : _f.filename) === null || _g === void 0 ? void 0 : _g.replace(/(jpg|jpeg|png|pneg)$/i, ".webp")) || "",
        },
        // Analytics
        analytics: {
            views: (_h = blogData === null || blogData === void 0 ? void 0 : blogData.analytics) === null || _h === void 0 ? void 0 : _h.views,
            uniqueViews: (_j = blogData === null || blogData === void 0 ? void 0 : blogData.analytics) === null || _j === void 0 ? void 0 : _j.uniqueViews,
            readTime: (_k = blogData === null || blogData === void 0 ? void 0 : blogData.analytics) === null || _k === void 0 ? void 0 : _k.readTime,
            shares: (_l = blogData === null || blogData === void 0 ? void 0 : blogData.analytics) === null || _l === void 0 ? void 0 : _l.shares,
            lastViewedAt: (_m = blogData === null || blogData === void 0 ? void 0 : blogData.analytics) === null || _m === void 0 ? void 0 : _m.lastViewedAt,
        },
    };
    // console.log("blog ==>", blog);
    const result = yield blog_model_1.default.create(blog);
    return result;
});
const BlogDetails = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(blogId)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid Blog Id");
    }
    const result = yield blog_model_1.default.findById(blogId);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blog Not Found");
    }
    return result;
});
//
const getAllBlogs = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersFields = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: blog_constant_1.BLOG_POST_SEARCH__FIELDS.map((field) => ({
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
    const result = yield blog_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield blog_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const deleteBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(blogId)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid Blog Id");
    }
    const session = yield blog_model_1.default.startSession();
    session.startTransaction();
    try {
        // delete blog post
        const result = yield blog_model_1.default.findByIdAndDelete(blogId).session(session);
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
        }
        // Create trash record
        const trashRecord = new trash_model_1.default({
            model: "BlogPost",
            data: result,
            deletedAt: new Date(),
            expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiration
        });
        // Save the trash record (this is done in parallel)
        const trashSavePromise = trashRecord.save();
        // Commit the transaction
        yield Promise.all([trashSavePromise]);
        // Commit the session
        yield session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const updateBlogSEO = (blogId, seoData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(blogId)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid Blog Id");
    }
    const result = yield blog_model_1.default.findByIdAndUpdate(blogId, { $set: seoData }, { new: true });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blog Not Found");
    }
    return result;
});
const getBlogSEOAnalytics = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(blogId)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid Blog Id");
    }
    const blog = yield blog_model_1.default.findById(blogId);
    if (!blog) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blog Not Found");
    }
    // Mock SEO analytics (replace with actual analytics integration)
    const seoAnalytics = {
        pageViews: 1000, // Example: Fetch from Google Analytics
        timeOnPage: "3:45", // Example: Fetch from Google Analytics
        bounceRate: "45%", // Example: Fetch from Google Analytics
        keywordRankings: ["SEO tips", "Blog optimization"], // Example: Fetch from Ahrefs/SEMrush
        backlinks: 25, // Example: Fetch from Ahrefs/SEMrush
    };
    return seoAnalytics;
});
const getBlogBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findOne({ slug });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blog Not Found");
    }
    return result;
});
const getBlogsByCategories = (blogId, categories) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(blogId)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid Blog Id");
    }
    const blogs = yield blog_model_1.default.find({
        _id: { $ne: blogId },
        categories: { $in: categories },
    });
    return blogs;
});
const updateBlogPost = (blogId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(blogId)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid Blog Id");
    }
    const result = yield blog_model_1.default.findByIdAndUpdate(blogId, { $set: updateData }, { new: true, runValidators: true });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blog Not Found");
    }
    return result;
});
exports.BlogService = {
    createBlogPost,
    BlogDetails,
    getAllBlogs,
    deleteBlog,
    updateBlogSEO,
    getBlogSEOAnalytics,
    getBlogBySlug,
    getBlogsByCategories,
    updateBlogPost,
};
