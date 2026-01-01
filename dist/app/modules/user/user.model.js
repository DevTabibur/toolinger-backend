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
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_constant_1 = require("./user.constant");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
            },
            message: "Please enter a valid email address.",
        },
    },
    password: {
        type: String,
        required: false,
        minlength: 6,
        // select: 0,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: "user",
    },
    status: {
        type: String,
        enum: Object.values(user_constant_1.USER_STATUS),
        default: user_constant_1.USER_STATUS.ACTIVE,
    },
    avatar: {
        type: String,
    },
    rememberMe: {
        type: Boolean,
        default: false,
    },
    phoneNo: {
        type: String,
    },
}, {
    timestamps: true,
});
//! Hash the password before saving
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (this.isModified("password")) {
                const hashedPassword = yield bcryptjs_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_round));
                this.password = hashedPassword;
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
//! Check if user exists
userSchema.statics.isUserExist = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ userId });
        return !!user;
    });
};
//! Check if the password is matched
userSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return bcryptjs_1.default.compare(givenPassword, savedPassword);
};
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
