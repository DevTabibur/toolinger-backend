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
exports.BlogController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const blog_service_1 = require("./blog.service");
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const shared_constant_1 = require("../../../constants/shared.constant");
const blog_constant_1 = require("./blog.constant");
const createBlogPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    let blogFeaturedImage;
    let seoImage;
    if (Array.isArray(files)) {
        blogFeaturedImage = files;
        seoImage = files;
    }
    else if ((files && typeof files === "object" && "blogFeaturedImage" in files) ||
        (files && typeof files === "object" && "seoImage" in files)) {
        blogFeaturedImage = files.blogFeaturedImage;
        seoImage = files
            .seoImage;
    }
    const result = yield blog_service_1.BlogService.createBlogPost(req.body, blogFeaturedImage !== null && blogFeaturedImage !== void 0 ? blogFeaturedImage : [], seoImage !== null && seoImage !== void 0 ? seoImage : []);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Blog Created Successfully",
        data: result,
    });
}));
const BlogDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const result = yield blog_service_1.BlogService.BlogDetails(blogId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Blog Details Fetched Successfully",
        data: result,
    });
}));
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ["searchTerm", ...blog_constant_1.BLOG_POST_FILTER_FIELDS]);
    const paginationOption = (0, pick_1.default)(req.query, shared_constant_1.paginationFields);
    const result = yield blog_service_1.BlogService.getAllBlogs(filters, paginationOption);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Blogs Fetched Successfully",
        data: result,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    console.log(blogId);
    const result = yield blog_service_1.BlogService.deleteBlog(blogId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Blog Deleted Successfully",
        data: result,
    });
}));
const updateBlogSEO = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const seoData = req.body; // SEO fields to update
    const result = yield blog_service_1.BlogService.updateBlogSEO(blogId, seoData);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "SEO Fields Updated Successfully",
        data: result,
    });
}));
const getBlogSEOAnalytics = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const result = yield blog_service_1.BlogService.getBlogSEOAnalytics(blogId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "SEO Analytics Fetched Successfully",
        data: result,
    });
}));
const getBlogBySlug = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result = yield blog_service_1.BlogService.getBlogBySlug(slug);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Blog Fetched Successfully by Slug",
        data: result,
    });
}));
const getBlogsByCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const { categories } = req.body; // Array of categories to filter by
    if (!Array.isArray(categories) || categories.length === 0) {
        (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            message: "Categories must be an array of strings",
        });
    }
    const blogs = yield blog_service_1.BlogService.getBlogsByCategories(blogId, categories);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Blogs Fetched Successfully by Categories",
        data: blogs,
    });
}));
const updateBlogPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const updateData = req.body; // Fields to update
    const result = yield blog_service_1.BlogService.updateBlogPost(blogId, updateData);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Blog Post Updated Successfully",
        data: result,
    });
}));
exports.BlogController = {
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
