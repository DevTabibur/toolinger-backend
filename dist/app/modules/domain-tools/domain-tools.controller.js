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
exports.DomainToolsController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const domain_tools_service_1 = require("./domain-tools.service");
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
// 1. Domain Authority Checker
const checkDomainAuthority = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { domain } = req.body;
    if (!domain) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Domain is required");
    }
    const result = yield domain_tools_service_1.DomainToolsService.checkDomainAuthority(domain);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Domain authority checked successfully",
        data: result,
    });
}));
// 2. Domain IP History
const getDomainIPHistory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { domain } = req.body;
    if (!domain) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Domain is required");
    }
    const result = yield domain_tools_service_1.DomainToolsService.getDomainIPHistory(domain);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Domain IP history retrieved successfully",
        data: result,
    });
}));
// 3. XML Sitemap Generator
// const generateXMLSitemap = catchAsync(async (req: Request, res: Response) => {
//   const { domain } = req.body;
//   if (!domain) {
//     throw new ApiError(httpstatus.BAD_REQUEST, "Domain is required");
//   }
//   const result = await DomainToolsService.generateXMLSitemap(domain);
//   sendSuccessResponse(res, {
//     statusCode: httpstatus.OK,
//     message: "XML sitemap generated successfully",
//     data: result,
//   });
// });
// 4. Compare Alexa Rank
// const compareAlexaRank = catchAsync(async (req: Request, res: Response) => {
//   const result = await DomainToolsService.compareAlexaRank(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpstatus.OK,
//     message: "Alexa ranks compared successfully",
//     data: result,
//   });
// });
// 5. Blog Search Tool
const searchBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield domain_tools_service_1.DomainToolsService.searchBlogs(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Blog search completed successfully",
        data: result,
    });
}));
// 6. Link Extractor
const extractLinks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "URL is required");
    }
    const result = yield domain_tools_service_1.DomainToolsService.extractLinks(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Links extracted successfully",
        data: result,
    });
}));
// 7. Domain Age Checker
const checkDomainAge = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { domain } = req.body;
    if (!domain) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Domain is required");
    }
    const result = yield domain_tools_service_1.DomainToolsService.checkDomainAge(domain);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Domain age checked successfully",
        data: result,
    });
}));
// 8. Reverse IP Domains
const getReverseIPDomains = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ip } = req.body;
    if (!ip) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "IP address is required");
    }
    const result = yield domain_tools_service_1.DomainToolsService.getReverseIPDomains(ip);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Reverse IP domains retrieved successfully",
        data: result,
    });
}));
// 9. Google Malware Checker
const checkGoogleMalware = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "URL is required");
    }
    const result = yield domain_tools_service_1.DomainToolsService.checkGoogleMalware(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Google malware check completed successfully",
        data: result,
    });
}));
// 10. Backlink Maker
const createBacklinks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "URL is required");
    }
    const result = yield domain_tools_service_1.DomainToolsService.createBacklinks(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Backlinks created successfully",
        data: result,
    });
}));
// 11. Broken Links Checker
const checkBrokenLinks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "URL is required");
    }
    const result = yield domain_tools_service_1.DomainToolsService.checkBrokenLinks(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Broken links check completed successfully",
        data: result,
    });
}));
// 12. Google Indexer
const checkGoogleIndex = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "URL is required");
    }
    const result = yield domain_tools_service_1.DomainToolsService.checkGoogleIndex(url);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Google index check completed successfully",
        data: result,
    });
}));
// 13. Domain Whois Checker
// const checkWhois = catchAsync(async (req: Request, res: Response) => {
//   const { domain } = req.body;
//   if (!domain) {
//     throw new ApiError(httpstatus.BAD_REQUEST, "Domain is required");
//   }
//   const result = await DomainToolsService.checkWhois(domain);
//   sendSuccessResponse(res, {
//     statusCode: httpstatus.OK,
//     message: "WHOIS check completed successfully",
//     data: result,
//   });
// });
// 14. Reverse Whois Checker
const checkReverseWhois = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Email is required");
    }
    const result = yield domain_tools_service_1.DomainToolsService.checkReverseWhois(email);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Reverse WHOIS check completed successfully",
        data: result,
    });
}));
// 15. Alexa Rank Checker
const checkAlexaRank = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { domain } = req.body;
    if (!domain) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Domain is required");
    }
    const result = yield domain_tools_service_1.DomainToolsService.checkAlexaRank(domain);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Alexa rank checked successfully",
        data: result,
    });
}));
// 16. Social Media Counter
const countSocialMediaShares = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield domain_tools_service_1.DomainToolsService.countSocialMediaShares(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Social media shares counted successfully",
        data: result,
    });
}));
// 17. Google PR Checker
const checkGooglePR = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { domain } = req.body;
    if (!domain) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Domain is required");
    }
    const result = yield domain_tools_service_1.DomainToolsService.checkGooglePR(domain);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Google PR checked successfully",
        data: result,
    });
}));
exports.DomainToolsController = {
    checkDomainAuthority,
    getDomainIPHistory,
    // generateXMLSitemap,
    // compareAlexaRank,
    // checkWhois,
    searchBlogs,
    extractLinks,
    checkDomainAge,
    getReverseIPDomains,
    checkGoogleMalware,
    createBacklinks,
    checkBrokenLinks,
    checkGoogleIndex,
    checkReverseWhois,
    checkAlexaRank,
    countSocialMediaShares,
    checkGooglePR,
};
