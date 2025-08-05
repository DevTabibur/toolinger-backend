import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import { AdvancedToolsService } from "./advanced-tools.service";

// Image Resizer
const resizeImage = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.resizeImage(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Image resized successfully",
    data: result,
  });
});

// Video Cutter
const cutVideo = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.cutVideo(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Video cut successfully",
    data: result,
  });
});

// Grammar Checker
const checkGrammar = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.checkGrammar(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Grammar checked successfully",
    data: result,
  });
});

// Paraphraser Tools
const paraphraseText = catchAsync(async (req: Request, res: Response) => {
  // const result = await AdvancedToolsService.paraphraseText(req.body);
  const result = "dummy"
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Text paraphrased successfully",
    data: result,
  });
});

// Competitors Analyser
const analyzeCompetitors = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.analyzeCompetitors(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Competitors analyzed successfully",
    data: result,
  });
});

// QR Code Generator
const generateQRCode = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.generateQRCode(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "QR code generated successfully",
    data: result,
  });
});

// PDF Converter
const convertPDF = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.convertPDF(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "PDF converted successfully",
    data: result,
  });
});



// Calculator
const calculate = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.calculate(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Calculation completed successfully",
    data: result,
  });
});

// Timer
const startTimer = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.startTimer(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Timer started successfully",
    data: result,
  });
});

// Calendar
const getCalendar = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.getCalendar(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Calendar retrieved successfully",
    data: result,
  });
});

// Dictionary
const lookupWord = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.lookupWord(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Word looked up successfully",
    data: result,
  });
});

// Mudduddra Mullo (Interest Calculator)
const calculateInterest = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.calculateInterest(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Interest calculated successfully",
    data: result,
  });
});

// Unite Rupontarkari (Currency Converter)
const convertCurrency = catchAsync(async (req: Request, res: Response) => {
  // const result = await AdvancedToolsService.convertCurrency(req.body);
  const result = "dummy"
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Currency converted successfully",
    data: result,
  });
});

// Website Backup
const backupWebsite = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.backupWebsite(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Website backup created successfully",
    data: result,
  });
});

// Website Migrator
const migrateWebsite = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.migrateWebsite(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Website migration completed successfully",
    data: result,
  });
});

// Social Media Schedule
const scheduleSocialMedia = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.scheduleSocialMedia(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Social media post scheduled successfully",
    data: result,
  });
});

// Email Template Generator
const generateEmailTemplate = catchAsync(async (req: Request, res: Response) => {
  // const result = await AdvancedToolsService.generateEmailTemplate(req.body);
  const result = "dummy"
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Email template generated successfully",
    data: result,
  });
});


// Detect CMS Tool
const detectCMS = catchAsync(async (req: Request, res: Response) => {
  const result = await AdvancedToolsService.detectCMS(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "CMS detected successfully",
    data: result,
  });
});


export const AdvancedToolsController = {
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
  detectCMS
}; 