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
exports.ShortenerController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const http_status_1 = __importDefault(require("http-status"));
const shortener_service_1 = require("./shortener.service");
const createShortUrl = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shortener_service_1.ShortenerService.createShortUrl(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "URL Shortened Successfully",
        data: result,
    });
}));
// const redirectUrl = catchAsync(async (req: Request, res: Response) => {
//     const { shortUrl } = req.params
//     const result = await ShortenerService.redirectUrl(shortUrl)
//     sendSuccessResponse(res, {
//         statusCode: httpStatus.OK,
//         message: "URL Redirected Successfully",
//         data: result
//     })
// })
// const redirectUrl = catchAsync(async (req: Request, res: Response) => {
//     const { shortUrl } = req.params;
//     console.log('shortUrl', shortUrl)
//     const originalUrl = await ShortenerService.redirectUrl(shortUrl);
//     if (!originalUrl) {
//         throw new ApiError(httpStatus.NOT_FOUND, "Short URL not found")
//     }
//     // // Redirect to the original URL
//     return res.redirect(originalUrl as unknown as string);
// });
exports.ShortenerController = {
    createShortUrl,
    // redirectUrl,
};
