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
exports.BlogService = void 0;
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const blog_model_1 = __importDefault(require("./blog.model"));
const http_status_1 = __importDefault(require("http-status"));
const createBlogPost = (blogData, blogFeaturedImage) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const blog = {
        title: blogData === null || blogData === void 0 ? void 0 : blogData.title,
        slug: blogData === null || blogData === void 0 ? void 0 : blogData.slug,
        content: blogData === null || blogData === void 0 ? void 0 : blogData.content,
        status: blogData === null || blogData === void 0 ? void 0 : blogData.status,
        excerpt: blogData === null || blogData === void 0 ? void 0 : blogData.excerpt,
        author: blogData === null || blogData === void 0 ? void 0 : blogData.author,
        category: blogData === null || blogData === void 0 ? void 0 : blogData.category,
        tags: blogData === null || blogData === void 0 ? void 0 : blogData.tags,
        blogFeaturedImage: ((_b = (_a = blogFeaturedImage[0]) === null || _a === void 0 ? void 0 : _a.filename) === null || _b === void 0 ? void 0 : _b.replace(/\.(jpg|jpeg|png|pneg)$/i, ".webp")) || "",
        isAllowComments: blogData === null || blogData === void 0 ? void 0 : blogData.isAllowComments,
        isFeaturedPost: blogData === null || blogData === void 0 ? void 0 : blogData.isFeaturedPost,
        seoTitle: blogData === null || blogData === void 0 ? void 0 : blogData.seoTitle,
        seoDescription: blogData === null || blogData === void 0 ? void 0 : blogData.seoDescription,
        seoKeywords: blogData === null || blogData === void 0 ? void 0 : blogData.seoKeywords,
        seoImage: blogData === null || blogData === void 0 ? void 0 : blogData.seoImage,
    };
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
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.find();
    console.log("result", result);
    return result;
});
const deleteBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(blogId)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid Blog Id");
    }
    const result = yield blog_model_1.default.findByIdAndDelete(blogId);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blog Not Found");
    }
    return result;
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
