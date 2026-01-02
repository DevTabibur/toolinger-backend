"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OTPSchema = new mongoose_1.Schema({
    otpType: {
        type: String,
        enum: ["SMS", "EMAIL"],
        default: "EMAIL",
        required: true,
    },
    otpDigitLimit: {
        type: Number,
        default: 4,
        required: true,
        min: 4,
        max: 8,
    },
    otpExpireTime: {
        type: Number,
        default: 5,
        required: true,
        min: 1,
        max: 60,
    },
}, {
    timestamps: true,
});
const OTPSettingsModel = (0, mongoose_1.model)("OTPSettings", OTPSchema);
exports.default = OTPSettingsModel;
