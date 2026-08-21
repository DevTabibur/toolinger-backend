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
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const user_service_1 = require("./user.service");
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const shared_constant_1 = require("../../../constants/shared.constant");
const user_constant_1 = require("./user.constant");
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ["searchTerm", ...user_constant_1.USER_FILTER_FIELDS]);
    const paginationOption = (0, pick_1.default)(req.query, shared_constant_1.paginationFields);
    const result = yield user_service_1.UserServices.getAllUser(filters, paginationOption);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "User list fetched successfully",
        data: result,
    });
}));
const updateProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req.params;
    const updateInfo = req.body;
    const files = req.files;
    console.log("userId =>>>", userId);
    console.log("files =>>>", files);
    console.log("req.body =>>>", req.body);
    const avatarFile = (_a = files === null || files === void 0 ? void 0 : files.avatar) === null || _a === void 0 ? void 0 : _a[0];
    // const updateInfoData = {
    //   ...updateInfo,
    //   avatar: avatarFile ? avatarFile.filename : undefined,
    // };
    // console.log("updateInfoData =>>>", updateInfoData);
    // const result = await UserServices.updateProfile(userId, updateInfoData);
    // sendSuccessResponse(res, {
    //   statusCode: httpStatus.OK,
    //   message: "Profile Created Successfully",
    //   data: result,
    // });
}));
const getSingleUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_service_1.UserServices.getSingleUserById(userId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "User fetched Successfully",
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_service_1.UserServices.deleteUser(userId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "User deleted Successfully",
        data: result,
    });
}));
exports.UserController = {
    updateProfile,
    getAllUser,
    getSingleUserById,
    deleteUser,
};
