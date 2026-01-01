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
exports.ToolsController = exports.findDNSRecords = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const tools_service_1 = require("./tools.service");
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const checkPlagiarism = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
        throw new Error("Text is required");
    }
    const result = yield tools_service_1.ToolsService.checkPlagiarism(text);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Plagiarism check completed",
        data: result,
    });
}));
const BacklinkMaker = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await ToolsService.BacklinkMaker(req.body);
    const result = "dummy";
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Backlink successfully",
        data: result,
    });
}));
const pingSubmit = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogUrl, updatedUrl, rssFeedUrl } = req.body;
    if (!blogUrl)
        throw new Error("blogUrl is required");
    const data = yield tools_service_1.PingService.sendPings({ blogUrl, updatedUrl, rssFeedUrl });
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Ping results",
        data,
    });
}));
const LinkAnalyzer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const result = yield tools_service_1.ToolsService.LinkAnalyzer(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: 200,
        message: "Link Analysis Complete",
        data: result,
    });
}));
const KeywordDensity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const result = yield tools_service_1.ToolsService.KeywordDensity(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Keyword density calculated successfully",
        data: result,
    });
}));
const GoogleMalwareChecker = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const result = yield tools_service_1.ToolsService.checkMalwareWithGoogle(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "URL is clean",
        data: result,
    });
}));
const DomainToIP = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Domain is required");
    }
    const result = yield tools_service_1.ToolsService.DomainToIP(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Domain to IP lookup successful",
        data: result,
    });
}));
const ServerStatusChecker = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { urls } = req.body;
    const result = yield tools_service_1.ToolsService.ServerStatusChecker(urls);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Server status fetched successfully",
        data: result,
    });
}));
const PageSizeChecker = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const result = yield tools_service_1.ToolsService.PageSizeChecker(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Page size fetched successfully",
        data: result,
    });
}));
const BlacklistLookup = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "URL is required");
    }
    const result = yield tools_service_1.ToolsService.BlacklistLookup(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Blacklist Report Found successfully",
        data: result,
    });
}));
const checkSuspiciousDomains = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide an array of URLs.");
    }
    const result = yield tools_service_1.ToolsService.checkSuspiciousDomains(urls);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Suspicious domain check completed.",
        data: result,
    });
}));
const CodeToTextRatioChecker = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tools_service_1.ToolsService.CodeToCheckTextRatio(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Code to text ratio calculated successfully.",
        data: result,
    });
}));
const LinkCountChecker = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        res.status(http_status_1.default.BAD_REQUEST).json({
            status: false,
            message: "Please provide a valid URL.",
        });
        return;
    }
    const result = yield tools_service_1.ToolsService.LinkCountChecker(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Website link count fetched successfully.",
        data: result,
    });
}));
const EmailPrivacyChecker = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide a valid URL.");
    }
    const result = yield tools_service_1.ToolsService.EmailPrivacycheck(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Email privacy check completed.",
        data: result,
    });
}));
const MetaTagAnalyze = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide a valid URL.");
    }
    const result = yield tools_service_1.ToolsService.MetaTagAnalyze(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Meta tags analyzed successfully.",
        data: result,
    });
}));
const searchEngineSpiderSimulator = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide a valid URL.");
    }
    const result = yield tools_service_1.ToolsService.searchEngineSpiderSimulator(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Spider simulation complete.",
        data: result,
    });
}));
const googleCacheChecker = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { urls } = req.body;
    if (!Array.isArray(urls) || urls.length === 0 || urls.length > 20) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide between 1 and 20 valid URLs.");
    }
    const results = yield Promise.all(urls.map((url) => tools_service_1.ToolsService.checkGoogleCache(url)));
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Google cache complete.",
        data: results,
    });
}));
const whatIsMyBrowser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const browserInfo = ToolsService.getBrowserInfo(req);
    const browserInfo = "browserInfo";
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Browser info retrieved successfully.",
        data: browserInfo,
    });
}));
exports.findDNSRecords = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide a valid Domain.");
    }
    const records = yield tools_service_1.ToolsService.findDNSRecords(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "DNS record find successfully",
        data: records,
    });
}));
const generateMd5Hash = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide a valid Text");
    }
    const md5Hash = tools_service_1.ToolsService.generateMD5(text);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "MD5 Generated successfully",
        data: {
            originalText: text,
            md5Hash,
        },
    });
}));
const classCChecker = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { urls } = req.body;
    if (!Array.isArray(urls) || urls.length === 0 || urls.length > 40) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide between 1 and 40 valid URLs.");
    }
    const results = yield tools_service_1.ToolsService.getClassCInfo(urls);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Class C IP founded successfully",
        data: results,
    });
}));
const checkGoogleIndex = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide a valid url");
    }
    const indexCount = yield tools_service_1.ToolsService.getGoogleIndexedPages(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Google index status founded successfully",
        data: {
            url,
            indexedPages: indexCount,
        },
    });
}));
const getWebpageSource = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide a valid url");
    }
    const source = yield tools_service_1.ToolsService.fetchPageSource(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Source code founded successfully",
        data: {
            url,
            sourceCode: source,
        },
    });
}));
const rewriteUrl = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide a valid url");
    }
    const result = tools_service_1.ToolsService.rewriteUrl(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "URL সফলভাবে রিরাইট করা হয়েছে",
        data: result,
    });
}));
const generateRobotsTxt = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const robotsTxt = tools_service_1.ToolsService.generateRobotsTxt(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "robots.txt ফাইল সফলভাবে তৈরি হয়েছে",
        data: { robotsTxt },
    });
}));
const generateSitemap = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const urls = req.body.urls;
    const xml = tools_service_1.ToolsService.generateSitemapXML(urls);
    res.set("Content-Type", "application/xml");
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "XML sitemap successfully generated",
        data: { sitemap: xml },
    });
}));
const checkBrokenLink = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url || typeof url !== "string") {
        throw new Error("A Valid URL is required");
    }
    const result = yield tools_service_1.ToolsService.checkBrokenLink(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Broken Link check completed",
        data: result,
    });
}));
const checkWhois = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url || typeof url !== "string") {
        throw new Error("valid Domain is required");
    }
    const result = yield tools_service_1.ToolsService.checkWhois(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Domain whois check successful",
        data: result,
    });
}));
const checkDomainAge = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url || typeof url !== "string") {
        throw new Error("valid Domain is required");
    }
    const result = yield tools_service_1.ToolsService.checkDomainAge(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Domain age check successful",
        data: result,
    });
}));
exports.ToolsController = {
    BacklinkMaker,
    pingSubmit,
    LinkAnalyzer,
    KeywordDensity,
    GoogleMalwareChecker,
    DomainToIP,
    ServerStatusChecker,
    PageSizeChecker,
    BlacklistLookup,
    checkSuspiciousDomains,
    CodeToTextRatioChecker,
    LinkCountChecker,
    EmailPrivacyChecker,
    MetaTagAnalyze,
    searchEngineSpiderSimulator,
    googleCacheChecker,
    whatIsMyBrowser,
    findDNSRecords: exports.findDNSRecords,
    generateMd5Hash,
    classCChecker,
    checkGoogleIndex,
    getWebpageSource,
    rewriteUrl,
    generateRobotsTxt,
    generateSitemap,
    checkPlagiarism,
    checkBrokenLink,
    checkWhois,
    checkDomainAge,
};
