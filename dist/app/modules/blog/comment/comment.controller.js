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
exports.CommentController = void 0;
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const sendSuccessResponse_1 = require("../../../../shared/sendSuccessResponse");
const http_status_1 = __importDefault(require("http-status"));
const comment_service_1 = require("./comment.service");
const pick_1 = __importDefault(require("../../../../shared/pick"));
const shared_constant_1 = require("../../../../constants/shared.constant");
const comment_constant_1 = require("./comment.constant");
const createComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ipAddress = req.ip || req.socket.remoteAddress;
    const userAgent = req.get("user-agent");
    const { blogId } = req.params;
    const result = yield comment_service_1.CommentService.createComment(blogId, req.body, ipAddress, userAgent);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        message: "Comment submitted successfully and is pending approval",
        data: result,
    });
}));
const getAllComments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.query", req.query);
    const filters = (0, pick_1.default)(req.query, ["searchTerm", ...comment_constant_1.COMMENT_FILTER_FIELDS]);
    const paginationOption = (0, pick_1.default)(req.query, shared_constant_1.paginationFields);
    const result = yield comment_service_1.CommentService.getAllComments(filters, paginationOption);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Comments fetched successfully",
        data: result.data,
        meta: result.meta,
    });
}));
const getCommentsByBlogPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogPostId } = req.params;
    console.log("blogPostId", blogPostId);
    const paginationOption = (0, pick_1.default)(req.query, shared_constant_1.paginationFields);
    const result = yield comment_service_1.CommentService.getCommentsByBlogPost(blogPostId, paginationOption);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Comments fetched successfully",
        data: result.data,
        meta: result.meta,
    });
}));
const getCommentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const result = yield comment_service_1.CommentService.getCommentById(commentId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Comment fetched successfully",
        data: result,
    });
}));
const updateCommentStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const { status } = req.body;
    const result = yield comment_service_1.CommentService.updateCommentStatus(commentId, status);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Comment status updated successfully",
        data: result,
    });
}));
const updateComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const commentInfo = req.body;
    const result = yield comment_service_1.CommentService.updateComment(commentId, commentInfo);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Comment updated successfully",
        data: result,
    });
}));
const deleteComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const result = yield comment_service_1.CommentService.deleteComment(commentId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Comment deleted successfully",
        data: result,
    });
}));
const likeComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const result = yield comment_service_1.CommentService.likeComment(commentId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Comment liked successfully",
        data: result,
    });
}));
const dislikeComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const result = yield comment_service_1.CommentService.dislikeComment(commentId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Comment disliked successfully",
        data: result,
    });
}));
const getCommentStats = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogPostId } = req.params;
    const result = yield comment_service_1.CommentService.getCommentStats(blogPostId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Comment statistics fetched successfully",
        data: result,
    });
}));
exports.CommentController = {
    createComment,
    getAllComments,
    getCommentsByBlogPost,
    getCommentById,
    updateCommentStatus,
    updateComment,
    deleteComment,
    likeComment,
    dislikeComment,
    getCommentStats,
};
