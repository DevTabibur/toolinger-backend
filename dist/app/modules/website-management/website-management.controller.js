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
exports.WebsiteManagementController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const website_management_service_1 = require("./website-management.service");
// DNS Records Checker
const checkDNSRecords = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.checkDNSRecords(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "DNS records checked successfully",
        data: result,
    });
}));
// DNS Propagation Checker
const checkDNSPropagation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.checkDNSPropagation(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "DNS propagation checked successfully",
        data: result,
    });
}));
// IP Location
const getIPLocation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.getIPLocation(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "IP location retrieved successfully",
        data: result,
    });
}));
// Traceroute Tool
const performTraceroute = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.performTraceroute(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Traceroute completed successfully",
        data: result,
    });
}));
// Google Index Checker
const checkGoogleIndex = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.checkGoogleIndex(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Google index checked successfully",
        data: result,
    });
}));
// HTML Encoder Decoder
const encodeDecodeHTML = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.encodeDecodeHTML(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "HTML encoded/decoded successfully",
        data: result,
    });
}));
// Favicon Generator
const generateFavicon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.generateFavicon(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Favicon generated successfully",
        data: result,
    });
}));
// Minify HTML
const minifyHTML = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.minifyHTML(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "HTML minified successfully",
        data: result,
    });
}));
// JS Beautifier
const beautifyJS = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.beautifyJS(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "JavaScript beautified successfully",
        data: result,
    });
}));
// PHP Beautifier
const beautifyPHP = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.beautifyPHP(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "PHP beautified successfully",
        data: result,
    });
}));
// RGB to HEX
const convertRGBToHEX = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.convertRGBToHEX(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "RGB to HEX converted successfully",
        data: result,
    });
}));
// Reverse NS Checker
const checkReverseNS = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.checkReverseNS(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Reverse NS checked successfully",
        data: result,
    });
}));
// Server Port Scanner
const scanServerPorts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.scanServerPorts(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Server ports scanned successfully",
        data: result,
    });
}));
// Server Status Checker
const checkServerStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.checkServerStatus(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Server status checked successfully",
        data: result,
    });
}));
// Spider Simulator
const simulateSpider = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.simulateSpider(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Spider simulation completed successfully",
        data: result,
    });
}));
// Website Page Snooper
const snoopWebsitePage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.snoopWebsitePage(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Website page snooped successfully",
        data: result,
    });
}));
// Domain IP Lookup
const lookupDomainIP = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.lookupDomainIP(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Domain IP looked up successfully",
        data: result,
    });
}));
// Minify CSS
const minifyCSS = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.minifyCSS(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "CSS minified successfully",
        data: result,
    });
}));
// Minify JSON
const minifyJSON = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.minifyJSON(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "JSON minified successfully",
        data: result,
    });
}));
// HTML Beautifier
const beautifyHTML = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.beautifyHTML(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "HTML beautified successfully",
        data: result,
    });
}));
// XML Beautifier
const beautifyXML = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.beautifyXML(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "XML beautified successfully",
        data: result,
    });
}));
// Website SEO Score Checker
const checkWebsiteSEOScore = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.checkWebsiteSEOScore(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Website SEO score checked successfully",
        data: result,
    });
}));
// DNS Report Checker
const checkDNSReport = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.checkDNSReport(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "DNS report checked successfully",
        data: result,
    });
}));
// Class C IP Checker
const checkClassCIP = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.checkClassCIP(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Class C IP checked successfully",
        data: result,
    });
}));
// Different Locations Ping
const pingDifferentLocations = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.pingDifferentLocations(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Different locations pinged successfully",
        data: result,
    });
}));
// Google Index Tool
const googleIndexTool = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.googleIndexTool(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Google index tool executed successfully",
        data: result,
    });
}));
// URL Encoder Decoder
const encodeDecodeURL = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.encodeDecodeURL(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "URL encoded/decoded successfully",
        data: result,
    });
}));
// Crop Image Online
const cropImageOnline = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.cropImageOnline(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Image cropped successfully",
        data: result,
    });
}));
// Minify JS
const minifyJS = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.minifyJS(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "JavaScript minified successfully",
        data: result,
    });
}));
// CSS Beautifier
const beautifyCSS = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.beautifyCSS(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "CSS beautified successfully",
        data: result,
    });
}));
// JSON Beautifier
const beautifyJSON = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.beautifyJSON(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "JSON beautified successfully",
        data: result,
    });
}));
// ICO Converter
const convertICO = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield website_management_service_1.WebsiteManagementService.convertICO(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "ICO converted successfully",
        data: result,
    });
}));
exports.WebsiteManagementController = {
    checkDNSRecords,
    checkDNSPropagation,
    getIPLocation,
    performTraceroute,
    checkGoogleIndex,
    encodeDecodeHTML,
    generateFavicon,
    minifyHTML,
    beautifyJS,
    beautifyPHP,
    convertRGBToHEX,
    checkReverseNS,
    scanServerPorts,
    checkServerStatus,
    simulateSpider,
    snoopWebsitePage,
    lookupDomainIP,
    minifyCSS,
    minifyJSON,
    beautifyHTML,
    beautifyXML,
    checkWebsiteSEOScore,
    checkDNSReport,
    checkClassCIP,
    pingDifferentLocations,
    googleIndexTool,
    encodeDecodeURL,
    cropImageOnline,
    minifyJS,
    beautifyCSS,
    beautifyJSON,
    convertICO,
};
