import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import { WebsiteManagementService } from "./website-management.service";

// DNS Records Checker
const checkDNSRecords = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.checkDNSRecords(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "DNS records checked successfully",
    data: result,
  });
});

// DNS Propagation Checker
const checkDNSPropagation = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.checkDNSPropagation(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "DNS propagation checked successfully",
    data: result,
  });
});

// IP Location
const getIPLocation = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.getIPLocation(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "IP location retrieved successfully",
    data: result,
  });
});

// Traceroute Tool
const performTraceroute = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.performTraceroute(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Traceroute completed successfully",
    data: result,
  });
});

// Google Index Checker
const checkGoogleIndex = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.checkGoogleIndex(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Google index checked successfully",
    data: result,
  });
});

// HTML Encoder Decoder
const encodeDecodeHTML = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.encodeDecodeHTML(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "HTML encoded/decoded successfully",
    data: result,
  });
});

// Favicon Generator
const generateFavicon = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.generateFavicon(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Favicon generated successfully",
    data: result,
  });
});

// Minify HTML
const minifyHTML = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.minifyHTML(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "HTML minified successfully",
    data: result,
  });
});

// JS Beautifier
const beautifyJS = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.beautifyJS(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "JavaScript beautified successfully",
    data: result,
  });
});

// PHP Beautifier
const beautifyPHP = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.beautifyPHP(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "PHP beautified successfully",
    data: result,
  });
});

// RGB to HEX
const convertRGBToHEX = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.convertRGBToHEX(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "RGB to HEX converted successfully",
    data: result,
  });
});

// Reverse NS Checker
const checkReverseNS = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.checkReverseNS(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Reverse NS checked successfully",
    data: result,
  });
});

// Server Port Scanner
const scanServerPorts = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.scanServerPorts(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Server ports scanned successfully",
    data: result,
  });
});

// Server Status Checker
const checkServerStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.checkServerStatus(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Server status checked successfully",
    data: result,
  });
});

// Spider Simulator
const simulateSpider = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.simulateSpider(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Spider simulation completed successfully",
    data: result,
  });
});

// Website Page Snooper
const snoopWebsitePage = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.snoopWebsitePage(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Website page snooped successfully",
    data: result,
  });
});

// Domain IP Lookup
const lookupDomainIP = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.lookupDomainIP(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Domain IP looked up successfully",
    data: result,
  });
});

// Minify CSS
const minifyCSS = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.minifyCSS(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "CSS minified successfully",
    data: result,
  });
});

// Minify JSON
const minifyJSON = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.minifyJSON(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "JSON minified successfully",
    data: result,
  });
});

// HTML Beautifier
const beautifyHTML = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.beautifyHTML(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "HTML beautified successfully",
    data: result,
  });
});

// XML Beautifier
const beautifyXML = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.beautifyXML(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "XML beautified successfully",
    data: result,
  });
});

// Website SEO Score Checker
const checkWebsiteSEOScore = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.checkWebsiteSEOScore(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Website SEO score checked successfully",
    data: result,
  });
});

// DNS Report Checker
const checkDNSReport = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.checkDNSReport(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "DNS report checked successfully",
    data: result,
  });
});

// Class C IP Checker
const checkClassCIP = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.checkClassCIP(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Class C IP checked successfully",
    data: result,
  });
});

// Different Locations Ping
const pingDifferentLocations = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.pingDifferentLocations(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Different locations pinged successfully",
    data: result,
  });
});

// Google Index Tool
const googleIndexTool = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.googleIndexTool(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Google index tool executed successfully",
    data: result,
  });
});

// URL Encoder Decoder
const encodeDecodeURL = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.encodeDecodeURL(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "URL encoded/decoded successfully",
    data: result,
  });
});

// Crop Image Online
const cropImageOnline = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.cropImageOnline(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Image cropped successfully",
    data: result,
  });
});

// Minify JS
const minifyJS = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.minifyJS(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "JavaScript minified successfully",
    data: result,
  });
});

// CSS Beautifier
const beautifyCSS = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.beautifyCSS(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "CSS beautified successfully",
    data: result,
  });
});

// JSON Beautifier
const beautifyJSON = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.beautifyJSON(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "JSON beautified successfully",
    data: result,
  });
});

// ICO Converter
const convertICO = catchAsync(async (req: Request, res: Response) => {
  const result = await WebsiteManagementService.convertICO(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "ICO converted successfully",
    data: result,
  });
});

export const WebsiteManagementController = {
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