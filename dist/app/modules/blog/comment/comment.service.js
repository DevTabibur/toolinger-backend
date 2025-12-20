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
exports.CommentService = void 0;
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const comment_model_1 = __importDefault(require("./comment.model"));
const comment_interface_1 = require("./comment.interface");
const paginationHelper_1 = __importDefault(require("../../../helpers/paginationHelper"));
const comment_constant_1 = require("./comment.constant");
const blog_model_1 = __importDefault(require("../blog.model"));
// Create a new comment
const createComment = (blogId, commentData, ipAddress, userAgent) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("commentData", commentData);
    // console.log("ipAddress", ipAddress);
    // console.log("userAgent", userAgent);
    // Verify blog post exists
    const blogPost = yield blog_model_1.default.findById(blogId);
    if (!blogPost) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blog post not found");
    }
    // Check if blog allows comments
    if (!blogPost.allowComments) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Comments are disabled for this blog post");
    }
    // If parent comment exists, verify it
    if (commentData.parentComment) {
        const parentComment = yield comment_model_1.default.findById(commentData.parentComment);
        if (!parentComment) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Parent comment not found");
        }
        // Ensure parent comment belongs to the same blog post
        if (parentComment.blogPost.toString() !== commentData.blogPost.toString()) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Parent comment does not belong to this blog post");
        }
    }
    const comment = Object.assign(Object.assign({}, commentData), { blogPost: blogId, ipAddress,
        userAgent, status: comment_interface_1.CommentStatus.PENDING });
    const result = yield comment_model_1.default.create(comment);
    return result;
});
// Get all comments with filters and pagination
const getAllComments = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersFields = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: comment_constant_1.COMMENT_SEARCH_FIELDS.map((field) => ({
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
    else {
        sortCondition.createdAt = "desc"; // Default sort by newest
    }
    const result = yield comment_model_1.default.find(whereCondition)
        .populate("author.user", "name email")
        .populate("blogPost", "title slug")
        .populate("parentComment")
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield comment_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// Get comments by blog post ID
const getCommentsByBlogPost = (blogPostId, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(blogPostId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid blog post ID");
    }
    const { page, limit, skip } = (0, paginationHelper_1.default)(paginationOption);
    // Only get approved comments for public view
    const result = yield comment_model_1.default.find({
        blogPost: blogPostId,
        status: comment_interface_1.CommentStatus.APPROVED,
        parentComment: null, // Only get top-level comments
    })
        .populate("author.user", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    // Get replies for each comment
    const commentsWithReplies = yield Promise.all(result.map((comment) => __awaiter(void 0, void 0, void 0, function* () {
        const replies = yield comment_model_1.default.find({
            parentComment: comment._id,
            status: comment_interface_1.CommentStatus.APPROVED,
        })
            .populate("author.user", "name")
            .sort({ createdAt: 1 });
        return Object.assign(Object.assign({}, comment.toObject()), { replies });
    })));
    const total = yield comment_model_1.default.countDocuments({
        blogPost: blogPostId,
        status: comment_interface_1.CommentStatus.APPROVED,
        parentComment: null,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: commentsWithReplies,
    };
});
// Get comment by ID
const getCommentById = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(commentId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid comment ID");
    }
    const result = yield comment_model_1.default.findById(commentId)
        .populate("author.user", "name email")
        .populate("blogPost", "title slug")
        .populate("parentComment");
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
    }
    return result;
});
// Update comment status (approve, reject, spam)
const updateCommentStatus = (commentId, status) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(commentId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid comment ID");
    }
    const result = yield comment_model_1.default.findByIdAndUpdate(commentId, { status }, { new: true });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
    }
    return result;
});
// Update comment content
const updateComment = (commentId, commentInfo) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(commentId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid comment ID");
    }
    const result = yield comment_model_1.default.findOneAndUpdate({ _id: commentId }, Object.assign(Object.assign({}, commentInfo), { isEdited: true, editedAt: new Date() }), { new: true });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
    }
    return result;
});
// Delete comment
const deleteComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(commentId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid comment ID");
    }
    // Also delete all replies to this comment
    yield comment_model_1.default.deleteMany({ parentComment: commentId });
    const result = yield comment_model_1.default.findByIdAndDelete(commentId);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
    }
    return result;
});
// Like a comment
const likeComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(commentId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid comment ID");
    }
    const result = yield comment_model_1.default.findByIdAndUpdate(commentId, { $inc: { likes: 1 } }, { new: true });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
    }
    return result;
});
// Dislike a comment
const dislikeComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(commentId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid comment ID");
    }
    const result = yield comment_model_1.default.findByIdAndUpdate(commentId, { $inc: { dislikes: 1 } }, { new: true });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
    }
    return result;
});
// Get comment statistics for a blog post
const getCommentStats = (blogPostId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(blogPostId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid blog post ID");
    }
    const stats = yield comment_model_1.default.aggregate([
        { $match: { blogPost: new mongoose_1.Types.ObjectId(blogPostId) } },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 },
            },
        },
    ]);
    const total = yield comment_model_1.default.countDocuments({ blogPost: blogPostId });
    return {
        total,
        byStatus: stats.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {}),
    };
});
exports.CommentService = {
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
