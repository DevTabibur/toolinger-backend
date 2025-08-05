import httpstatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { DomainToolsService } from "./domain-tools.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import ApiError from "../../../errors/ApiError";

// 1. Domain Authority Checker
const checkDomainAuthority = catchAsync(async (req: Request, res: Response) => {
  const { domain } = req.body;

  if (!domain) {
    throw new ApiError(httpstatus.BAD_REQUEST, "Domain is required");
  }

  const result = await DomainToolsService.checkDomainAuthority(domain);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Domain authority checked successfully",
    data: result,
  });
});

// 2. Domain IP History
const getDomainIPHistory = catchAsync(async (req: Request, res: Response) => {
  const { domain } = req.body;

  if (!domain) {
    throw new ApiError(httpstatus.BAD_REQUEST, "Domain is required");
  }

  const result = await DomainToolsService.getDomainIPHistory(domain);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Domain IP history retrieved successfully",
    data: result,
  });
});

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
const searchBlogs = catchAsync(async (req: Request, res: Response) => {


  const result = await DomainToolsService.searchBlogs(req.body);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Blog search completed successfully",
    data: result,
  });
});

// 6. Link Extractor
const extractLinks = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(httpstatus.BAD_REQUEST, "URL is required");
  }

  const result = await DomainToolsService.extractLinks(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Links extracted successfully",
    data: result,
  });
});

// 7. Domain Age Checker
const checkDomainAge = catchAsync(async (req: Request, res: Response) => {
  const { domain } = req.body;

  if (!domain) {
    throw new ApiError(httpstatus.BAD_REQUEST, "Domain is required");
  }

  const result = await DomainToolsService.checkDomainAge(domain);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Domain age checked successfully",
    data: result,
  });
});

// 8. Reverse IP Domains
const getReverseIPDomains = catchAsync(async (req: Request, res: Response) => {
  const { ip } = req.body;

  if (!ip) {
    throw new ApiError(httpstatus.BAD_REQUEST, "IP address is required");
  }

  const result = await DomainToolsService.getReverseIPDomains(ip);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Reverse IP domains retrieved successfully",
    data: result,
  });
});

// 9. Google Malware Checker
const checkGoogleMalware = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(httpstatus.BAD_REQUEST, "URL is required");
  }

  const result = await DomainToolsService.checkGoogleMalware(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Google malware check completed successfully",
    data: result,
  });
});

// 10. Backlink Maker
const createBacklinks = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(httpstatus.BAD_REQUEST, "URL is required");
  }

  const result = await DomainToolsService.createBacklinks(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Backlinks created successfully",
    data: result,
  });
});

// 11. Broken Links Checker
const checkBrokenLinks = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(httpstatus.BAD_REQUEST, "URL is required");
  }

  const result = await DomainToolsService.checkBrokenLinks(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Broken links check completed successfully",
    data: result,
  });
});

// 12. Google Indexer
const checkGoogleIndex = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(httpstatus.BAD_REQUEST, "URL is required");
  }

  const result = await DomainToolsService.checkGoogleIndex(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Google index check completed successfully",
    data: result,
  });
});

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
const checkReverseWhois = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(httpstatus.BAD_REQUEST, "Email is required");
  }

  const result = await DomainToolsService.checkReverseWhois(email);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Reverse WHOIS check completed successfully",
    data: result,
  });
});

// 15. Alexa Rank Checker
const checkAlexaRank = catchAsync(async (req: Request, res: Response) => {
  const { domain } = req.body;

  if (!domain) {
    throw new ApiError(httpstatus.BAD_REQUEST, "Domain is required");
  }

  const result = await DomainToolsService.checkAlexaRank(domain);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Alexa rank checked successfully",
    data: result,
  });
});

// 16. Social Media Counter
const countSocialMediaShares = catchAsync(async (req: Request, res: Response) => {


  const result = await DomainToolsService.countSocialMediaShares(req.body);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Social media shares counted successfully",
    data: result,
  });
});

// 17. Google PR Checker
const checkGooglePR = catchAsync(async (req: Request, res: Response) => {
  const { domain } = req.body;

  if (!domain) {
    throw new ApiError(httpstatus.BAD_REQUEST, "Domain is required");
  }

  const result = await DomainToolsService.checkGooglePR(domain);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Google PR checked successfully",
    data: result,
  });
});

export const DomainToolsController = {
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