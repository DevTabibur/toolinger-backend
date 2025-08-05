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
exports.MoreToolsController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const more_tools_service_1 = require("./more-tools.service");
// QR Code Scanner
const scanQRCode = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.scanQRCode(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "QR code scanned successfully",
        data: result,
    });
}));
// Roman Numerals Date Converter
const convertRomanNumeralsDate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.convertRomanNumeralsDate(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Roman numerals date converted successfully",
        data: result,
    });
}));
// Binary Translator
const translateBinary = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.translateBinary(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Binary translated successfully",
        data: result,
    });
}));
// Random Address Generator
const generateRandomAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.generateRandomAddress(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Random address generated successfully",
        data: result,
    });
}));
// Discount Calculator
const calculateDiscount = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculateDiscount(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Discount calculated successfully",
        data: result,
    });
}));
// Binary To Hex
const convertBinaryToHex = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.convertBinaryToHex(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Binary converted to hex successfully",
        data: result,
    });
}));
// Decimal To Octal
const convertDecimalToOctal = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.convertDecimalToOctal(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Decimal converted to octal successfully",
        data: result,
    });
}));
// Octal To Decimal
const convertOctalToDecimal = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.convertOctalToDecimal(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Octal converted to decimal successfully",
        data: result,
    });
}));
// HEX To RGB
const convertHEXToRGB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.convertHEXToRGB(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "HEX converted to RGB successfully",
        data: result,
    });
}));
// Octal Calculator
const calculateOctal = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculateOctal(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Octal calculation completed successfully",
        data: result,
    });
}));
// Percentage Calculator
const calculatePercentage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculatePercentage(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Percentage calculated successfully",
        data: result,
    });
}));
// Decimal to ASCII
const convertDecimalToASCII = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.convertDecimalToASCII(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Decimal converted to ASCII successfully",
        data: result,
    });
}));
// Text to HEX
const convertTextToHEX = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.convertTextToHEX(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Text converted to HEX successfully",
        data: result,
    });
}));
// Adsense Calculator
const calculateAdsense = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculateAdsense(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Adsense calculated successfully",
        data: result,
    });
}));
// Paypal Fee Calculator
const calculatePaypalFee = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculatePaypalFee(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "PayPal fee calculated successfully",
        data: result,
    });
}));
// Upside Down Text Generator
const generateUpsideDownText = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.generateUpsideDownText(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Upside down text generated successfully",
        data: result,
    });
}));
// Decimal To Binary
// const convertDecimalToBinary = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertDecimalToBinary(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Decimal converted to binary successfully",
//     data: result,
//   });
// });
// Cpc Calculator
// const calculateCPC = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.calculateCPC(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "CPC calculated successfully",
//     data: result,
//   });
// });
// Hex To Decimal
// const convertHexToDecimal = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertHexToDecimal(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Hex converted to decimal successfully",
//     data: result,
//   });
// });
// Hex To Binary
// const convertHexToBinary = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertHexToBinary(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Hex converted to binary successfully",
//     data: result,
//   });
// });
// Hex To Octal
// const convertHexToOctal = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertHexToOctal(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Hex converted to octal successfully",
//     data: result,
//   });
// });
// Octal To Hex
// const convertOctalToHex = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertOctalToHex(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Octal converted to hex successfully",
//     data: result,
//   });
// });
// Binary Calculator
// const calculateBinary = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.calculateBinary(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Binary calculation completed successfully",
//     data: result,
//   });
// });
// ASCII To Text
// const convertASCIIToText = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertASCIIToText(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "ASCII converted to text successfully",
//     data: result,
//   });
// });
// ASCII To Decimal
// const convertASCIIToDecimal = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertASCIIToDecimal(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "ASCII converted to decimal successfully",
//     data: result,
//   });
// });
// HEX to ASCII
// const convertHEXToASCII = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertHEXToASCII(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "HEX converted to ASCII successfully",
//     data: result,
//   });
// });
// Password Generator
const generatePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.generatePassword(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Password generated successfully",
        data: result,
    });
}));
// Reverse Text Generator
const generateReverseText = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.generateReverseText(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Reverse text generated successfully",
        data: result,
    });
}));
// Roman Numeral Converter
const convertRomanNumeral = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.convertRomanNumeral(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Roman numeral converted successfully",
        data: result,
    });
}));
// LTV Calculator
const calculateLTV = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculateLTV(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "LTV calculated successfully",
        data: result,
    });
}));
// Binary To Decimal
// const convertBinaryToDecimal = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertBinaryToDecimal(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Binary converted to decimal successfully",
//     data: result,
//   });
// });
// CPM Calculator
const calculateCPM = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculateCPM(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "CPM calculated successfully",
        data: result,
    });
}));
// Decimal To Hex
// const convertDecimalToHex = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertDecimalToHex(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Decimal converted to hex successfully",
//     data: result,
//   });
// });
// Binary To Octal
// const convertBinaryToOctal = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertBinaryToOctal(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Binary converted to octal successfully",
//     data: result,
//   });
// });
// Octal To Binary
// const convertOctalToBinary = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertOctalToBinary(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Octal converted to binary successfully",
//     data: result,
//   });
// });
// Case Converter
// const convertCase = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertCase(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Case converted successfully",
//     data: result,
//   });
// });
// HEX Calculator
// const calculateHEX = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.calculateHEX(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "HEX calculation completed successfully",
//     data: result,
//   });
// });
// Text To ASCII
// const convertTextToASCII = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertTextToASCII(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Text converted to ASCII successfully",
//     data: result,
//   });
// });
// ASCII to HEX
// const convertASCIIToHEX = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertASCIIToHEX(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "ASCII converted to HEX successfully",
//     data: result,
//   });
// });
// HEX to Text
// const convertHEXToText = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertHEXToText(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "HEX converted to text successfully",
//     data: result,
//   });
// });
// Fake Name Generator
// const generateFakeName = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.generateFakeName(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Fake name generated successfully",
//     data: result,
//   });
// });
// Text to HEX (duplicate - keeping for consistency)
const convertTextToHEX2 = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.convertTextToHEX(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Text converted to HEX successfully",
        data: result,
    });
}));
// Random Word Generator
const generateRandomWord = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.generateRandomWord(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Random word generated successfully",
        data: result,
    });
}));
// Earnings Per Share Calculator
const calculateEPS = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculateEPS(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "EPS calculated successfully",
        data: result,
    });
}));
// Sales Tax Calculator
const calculateSalesTax = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculateSalesTax(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Sales tax calculated successfully",
        data: result,
    });
}));
// Average Calculator
const calculateAverage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculateAverage(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Average calculated successfully",
        data: result,
    });
}));
// Words to Pages
// const convertWordsToPages = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertWordsToPages(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Words converted to pages successfully",
//     data: result,
//   });
// });
// Text to Handwriting
// const convertTextToHandwriting = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertTextToHandwriting(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Text converted to handwriting successfully",
//     data: result,
//   });
// });
// Online Text Editor
// const editTextOnline = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.editTextOnline(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Text edited successfully",
//     data: result,
//   });
// });
// Probability Calculator
const calculateProbability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculateProbability(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Probability calculated successfully",
        data: result,
    });
}));
// GST Calculator
const calculateGST = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculateGST(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "GST calculated successfully",
        data: result,
    });
}));
// Age Calculator
const calculateAge = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculateAge(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Age calculated successfully",
        data: result,
    });
}));
// JPG To Word
// const convertJPGToWord = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertJPGToWord(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "JPG converted to Word successfully",
//     data: result,
//   });
// });
// PDF to Word
// const convertPDFToWord = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertPDFToWord(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "PDF converted to Word successfully",
//     data: result,
//   });
// });
// Text to Image
// const convertTextToImage = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertTextToImage(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Text converted to image successfully",
//     data: result,
//   });
// });
// Margin Calculator
const calculateMargin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculateMargin(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Margin calculated successfully",
        data: result,
    });
}));
// Lower and Upper Bound Calculator
const calculateBounds = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculateBounds(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Bounds calculated successfully",
        data: result,
    });
}));
// Pre and Post Money Valuation
const calculateValuation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield more_tools_service_1.MoreToolsService.calculateValuation(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Valuation calculated successfully",
        data: result,
    });
}));
// PDF to Text
// const convertPDFToText = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertPDFToText(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "PDF converted to text successfully",
//     data: result,
//   });
// }); 
exports.MoreToolsController = {
    scanQRCode,
    convertRomanNumeralsDate,
    translateBinary,
    generateRandomAddress,
    calculateDiscount,
    convertBinaryToHex,
    convertDecimalToOctal,
    convertOctalToDecimal,
    convertHEXToRGB,
    calculateOctal,
    calculatePercentage,
    convertDecimalToASCII,
    convertTextToHEX,
    calculateAdsense,
    calculatePaypalFee,
    generateUpsideDownText,
    // convertDecimalToBinary,
    // calculateCPC,
    // convertHexToDecimal,
    // convertHexToBinary,
    // convertHexToOctal,
    // convertOctalToHex,
    // calculateBinary,
    // convertASCIIToText,
    // convertASCIIToDecimal,
    // convertHEXToASCII,
    generatePassword,
    generateReverseText,
    convertRomanNumeral,
    calculateLTV,
    calculateCPM,
    // convertBinaryToDecimal,
    // convertDecimalToHex,
    // convertBinaryToOctal,
    // convertOctalToBinary,
    // convertCase,
    // calculateHEX,
    // convertTextToASCII,
    // convertASCIIToHEX,
    // convertHEXToText,
    // generateFakeName,
    convertTextToHEX2,
    generateRandomWord,
    calculateEPS,
    calculateSalesTax,
    calculateAverage,
    // convertWordsToPages,
    // convertTextToHandwriting,
    // editTextOnline,
    calculateProbability,
    calculateGST,
    calculateAge,
    // convertJPGToWord,
    // convertPDFToWord,
    // convertTextToImage,
    calculateMargin,
    calculateBounds,
    calculateValuation,
    // convertPDFToText,
};
