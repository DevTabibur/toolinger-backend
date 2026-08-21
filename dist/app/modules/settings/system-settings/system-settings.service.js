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
exports.SystemSettingsService = void 0;
const ApiError_1 = __importDefault(require("../../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const system_settings_model_1 = __importDefault(require("./system-settings.model"));
const getSystemSettings = () => __awaiter(void 0, void 0, void 0, function* () {
    let settings = yield system_settings_model_1.default.findOne();
    // If no settings exist, create default settings
    if (!settings) {
        settings = yield system_settings_model_1.default.create({
            otpType: "EMAIL",
            otpDigitLimit: 4,
            otpExpireTime: 5,
        });
    }
    return settings;
});
const updateSystemSettings = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    let settings = yield system_settings_model_1.default.findOne();
    // console.log("udpateData", updateData)
    // If no settings exist, create with provided data
    if (!settings) {
        settings = yield system_settings_model_1.default.create({
            otpType: updateData.otpType || "EMAIL",
            otpDigitLimit: updateData.otpDigitLimit || 4,
            otpExpireTime: updateData.otpExpireTime || 5,
        });
    }
    else {
        // Update existing settings
        settings = yield system_settings_model_1.default.findOneAndUpdate({}, updateData, {
            new: true,
            runValidators: true,
        });
        if (!settings) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to update OTP settings");
        }
    }
    return settings;
});
exports.SystemSettingsService = {
    getSystemSettings,
    updateSystemSettings,
};
