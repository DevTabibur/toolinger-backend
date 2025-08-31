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
exports.AdvancedToolsController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const advanced_tools_service_1 = require("./advanced-tools.service");
// Image Resizer
const resizeImage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.resizeImage(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Image resized successfully",
        data: result,
    });
}));
// Video Cutter
const cutVideo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.cutVideo(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Video cut successfully",
        data: result,
    });
}));
// Grammar Checker
const checkGrammar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.checkGrammar(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Grammar checked successfully",
        data: result,
    });
}));
// Paraphraser Tools
const paraphraseText = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await AdvancedToolsService.paraphraseText(req.body);
    const result = "dummy";
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Text paraphrased successfully",
        data: result,
    });
}));
// Competitors Analyser
const analyzeCompetitors = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.analyzeCompetitors(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Competitors analyzed successfully",
        data: result,
    });
}));
// QR Code Generator
const generateQRCode = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.generateQRCode(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "QR code generated successfully",
        data: result,
    });
}));
// PDF Converter
const convertPDF = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.convertPDF(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "PDF converted successfully",
        data: result,
    });
}));
// Calculator
const calculate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.calculate(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Calculation completed successfully",
        data: result,
    });
}));
// Timer
const startTimer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.startTimer(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Timer started successfully",
        data: result,
    });
}));
// Calendar
const getCalendar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.getCalendar(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Calendar retrieved successfully",
        data: result,
    });
}));
// Dictionary
const lookupWord = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.lookupWord(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Word looked up successfully",
        data: result,
    });
}));
// Mudduddra Mullo (Interest Calculator)
const calculateInterest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.calculateInterest(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Interest calculated successfully",
        data: result,
    });
}));
// Unite Rupontarkari (Currency Converter)
const convertCurrency = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await AdvancedToolsService.convertCurrency(req.body);
    const result = "dummy";
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Currency converted successfully",
        data: result,
    });
}));
// Website Backup
const backupWebsite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.backupWebsite(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Website backup created successfully",
        data: result,
    });
}));
// Website Migrator
const migrateWebsite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.migrateWebsite(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Website migration completed successfully",
        data: result,
    });
}));
// Social Media Schedule
const scheduleSocialMedia = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.scheduleSocialMedia(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Social media post scheduled successfully",
        data: result,
    });
}));
// Email Template Generator
const generateEmailTemplate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await AdvancedToolsService.generateEmailTemplate(req.body);
    const result = "dummy";
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Email template generated successfully",
        data: result,
    });
}));
// Detect CMS Tool
const detectCMS = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield advanced_tools_service_1.AdvancedToolsService.detectCMS(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "CMS detected successfully",
        data: result,
    });
}));
exports.AdvancedToolsController = {
    resizeImage,
    cutVideo,
    checkGrammar,
    paraphraseText,
    analyzeCompetitors,
    generateQRCode,
    convertPDF,
    calculate,
    startTimer,
    getCalendar,
    lookupWord,
    calculateInterest,
    convertCurrency,
    backupWebsite,
    migrateWebsite,
    scheduleSocialMedia,
    generateEmailTemplate,
    detectCMS,
};
