"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OTPModelSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otpCode: {
        type: String,
        required: true,
    },
    expireTime: {
        type: Date,
        required: true,
        index: { expires: 0 },
    },
}, {
    timestamps: true,
});
const OTPModel = (0, mongoose_1.model)("OTPModel", OTPModelSchema);
exports.default = OTPModel;
