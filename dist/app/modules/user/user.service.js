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
exports.UserServices = void 0;
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = __importDefault(require("../../helpers/paginationHelper"));
const user_constant_1 = require("./user.constant");
const user_model_1 = __importDefault(require("./user.model"));
const getAllCarOwner = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersFields = __rest(filters, ["searchTerm"]);
    const andConditions = [
        { role: "car_owner" }, // Ensure only car owners are retrieved
    ];
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.CAR_OWNER_SEARCH__FIELDS.map((field) => ({
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
    const result = yield user_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getAllMechanic = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersFields = __rest(filters, ["searchTerm"]);
    const andConditions = [
        { role: "mechanic" }, // Ensure only car owners are retrieved
    ];
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.MECHANIC_FILTER_FIELDS.map((field) => ({
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
    const result = yield user_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateProfile = (userId, profileData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(userId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User ID is not valid");
    }
    // Define restricted fields to prevent updates
    const restrictedFields = new Set(["phoneNo", "_id", "role"]);
    if (Object.keys(profileData).some((field) => restrictedFields.has(field))) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Restricted fields cannot be updated");
    }
    // Validate `status`
    if (profileData.status &&
        !["active", "inactive"].includes(profileData.status)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid status. Allowed values: active, inactive");
    }
    // Perform a single DB query instead of two
    const updatedUser = yield user_model_1.default.findOneAndUpdate({ _id: userId }, profileData, {
        new: true, // Return updated document
        runValidators: true, // Apply schema validation
        projection: {
            _id: 1,
            phoneNo: 1,
            role: 1,
            status: 1,
            isVerified: 1,
            profilePic: 1,
            createdAt: 1,
            updatedAt: 1,
            address: 1,
            dob: 1,
            fullName: 1,
        }, // Fetch only necessary fields
    }).lean(); // Convert Mongoose doc to plain object for faster performance
    if (!updatedUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found or update failed!");
    }
    return updatedUser;
});
const getSingleUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("userId", userId); // userId 67bf008287820d633d918dc1
    if (!mongoose_1.Types.ObjectId.isValid(userId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User ID is not valid");
    }
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found. Please try another!");
    }
    return user;
});
exports.UserServices = {
    getAllMechanic,
    updateProfile,
    getAllCarOwner,
    getSingleUserById,
};
