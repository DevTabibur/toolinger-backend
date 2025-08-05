import httpstatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { PingService, ToolsService } from "./tools.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import ApiError from "../../../errors/ApiError";

const checkPlagiarism = catchAsync(async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    throw new Error("Text is required");
  }

  const result = await ToolsService.checkPlagiarism(text);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Plagiarism check completed",
    data: result,
  });
});

const BacklinkMaker = catchAsync(async (req: Request, res: Response) => {
  // const result = await ToolsService.BacklinkMaker(req.body);
  const result = "dummy";
  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Backlink successfully",
    data: result,
  });
});
const pingSubmit = catchAsync(async (req: Request, res: Response) => {
  const { blogUrl, updatedUrl, rssFeedUrl } = req.body;
  if (!blogUrl) throw new Error("blogUrl is required");

  const data = await PingService.sendPings({ blogUrl, updatedUrl, rssFeedUrl });

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Ping results",
    data,
  });
});

const LinkAnalyzer = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  const result = await ToolsService.LinkAnalyzer(url);

  sendSuccessResponse(res, {
    statusCode: 200,
    message: "Link Analysis Complete",
    data: result,
  });
});

const KeywordDensity = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;
  const result = await ToolsService.KeywordDensity(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Keyword density calculated successfully",
    data: result,
  });
});

const GoogleMalwareChecker = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;
  const result = await ToolsService.checkMalwareWithGoogle(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "URL is clean",
    data: result,
  });
});

const DomainToIP = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(httpstatus.BAD_REQUEST, "Domain is required");
  }

  const result = await ToolsService.DomainToIP(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Domain to IP lookup successful",
    data: result,
  });
});

const ServerStatusChecker = catchAsync(async (req: Request, res: Response) => {
  const { urls } = req.body;
  const result = await ToolsService.ServerStatusChecker(urls);
  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Server status fetched successfully",
    data: result,
  });
});

const PageSizeChecker = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;
  const result = await ToolsService.PageSizeChecker(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Page size fetched successfully",
    data: result,
  });
});

const BlacklistLookup = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(httpstatus.BAD_REQUEST, "URL is required");
  }

  const result = await ToolsService.BlacklistLookup(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Blacklist Report Found successfully",
    data: result,
  });
});

const checkSuspiciousDomains = catchAsync(
  async (req: Request, res: Response) => {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls)) {
      throw new ApiError(
        httpstatus.BAD_REQUEST,
        "Please provide an array of URLs."
      );
    }

    const result = await ToolsService.checkSuspiciousDomains(urls);

    sendSuccessResponse(res, {
      statusCode: httpstatus.OK,
      message: "Suspicious domain check completed.",
      data: result,
    });
  }
);

const CodeToTextRatioChecker = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ToolsService.CodeToCheckTextRatio(req.body);

    sendSuccessResponse(res, {
      statusCode: httpstatus.OK,
      message: "Code to text ratio calculated successfully.",
      data: result,
    });
  }
);

const LinkCountChecker = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    res.status(httpstatus.BAD_REQUEST).json({
      status: false,
      message: "Please provide a valid URL.",
    });
    return;
  }

  const result = await ToolsService.LinkCountChecker(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Website link count fetched successfully.",
    data: result,
  });
});

const EmailPrivacyChecker = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(httpstatus.BAD_REQUEST, "Please provide a valid URL.");
  }

  const result = await ToolsService.EmailPrivacycheck(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Email privacy check completed.",
    data: result,
  });
});

const MetaTagAnalyze = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(httpstatus.BAD_REQUEST, "Please provide a valid URL.");
  }

  const result = await ToolsService.MetaTagAnalyze(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Meta tags analyzed successfully.",
    data: result,
  });
});

const searchEngineSpiderSimulator = catchAsync(
  async (req: Request, res: Response) => {
    const { url } = req.body;

    if (!url) {
      throw new ApiError(httpstatus.BAD_REQUEST, "Please provide a valid URL.");
    }

    const result = await ToolsService.searchEngineSpiderSimulator(url);

    sendSuccessResponse(res, {
      statusCode: httpstatus.OK,
      message: "Spider simulation complete.",
      data: result,
    });
  }
);

const googleCacheChecker = catchAsync(async (req: Request, res: Response) => {
  const { urls } = req.body;

  if (!Array.isArray(urls) || urls.length === 0 || urls.length > 20) {
    throw new ApiError(
      httpstatus.BAD_REQUEST,
      "Please provide between 1 and 20 valid URLs."
    );
  }

  const results = await Promise.all(
    urls.map((url) => ToolsService.checkGoogleCache(url))
  );

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Google cache complete.",
    data: results,
  });
});

const whatIsMyBrowser = catchAsync(async (req: Request, res: Response) => {
  // const browserInfo = ToolsService.getBrowserInfo(req);
  const browserInfo ="browserInfo"

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Browser info retrieved successfully.",
    data: browserInfo,
  });
});

export const findDNSRecords = catchAsync(
  async (req: Request, res: Response) => {
    const { url } = req.body;
    if (!url) {
      throw new ApiError(
        httpstatus.BAD_REQUEST,
        "Please provide a valid Domain."
      );
    }

    const records = await ToolsService.findDNSRecords(url);

    sendSuccessResponse(res, {
      statusCode: httpstatus.OK,
      message: "DNS record find successfully",
      data: records,
    });
  }
);

const generateMd5Hash = catchAsync(async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    throw new ApiError(httpstatus.BAD_REQUEST, "Please provide a valid Text");
  }

  const md5Hash = ToolsService.generateMD5(text);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "MD5 Generated successfully",
    data: {
      originalText: text,
      md5Hash,
    },
  });
});

const classCChecker = catchAsync(async (req: Request, res: Response) => {
  const { urls } = req.body;

  if (!Array.isArray(urls) || urls.length === 0 || urls.length > 40) {
    throw new ApiError(
      httpstatus.BAD_REQUEST,
      "Please provide between 1 and 40 valid URLs."
    );
  }

  const results = await ToolsService.getClassCInfo(urls);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Class C IP founded successfully",
    data: results,
  });
});

const checkGoogleIndex = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(httpstatus.BAD_REQUEST, "Please provide a valid url");
  }

  const indexCount = await ToolsService.getGoogleIndexedPages(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Google index status founded successfully",
    data: {
      url,
      indexedPages: indexCount,
    },
  });
});

const getWebpageSource = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(httpstatus.BAD_REQUEST, "Please provide a valid url");
  }

  const source = await ToolsService.fetchPageSource(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Source code founded successfully",
    data: {
      url,
      sourceCode: source,
    },
  });
});

const rewriteUrl = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(httpstatus.BAD_REQUEST, "Please provide a valid url");
  }

  const result = ToolsService.rewriteUrl(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "URL সফলভাবে রিরাইট করা হয়েছে",
    data: result,
  });
});

const generateRobotsTxt = catchAsync(async (req: Request, res: Response) => {
  const robotsTxt = ToolsService.generateRobotsTxt(req.body);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "robots.txt ফাইল সফলভাবে তৈরি হয়েছে",
    data: { robotsTxt },
  });
});

const generateSitemap = catchAsync(async (req: Request, res: Response) => {
  const urls = req.body.urls;
  const xml = ToolsService.generateSitemapXML(urls);

  res.set("Content-Type", "application/xml");
  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "XML sitemap successfully generated",
    data: { sitemap: xml },
  });
});

const checkBrokenLink = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    throw new Error("A Valid URL is required");
  }

  const result = await ToolsService.checkBrokenLink(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Broken Link check completed",
    data: result,
  });
});

const checkWhois = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    throw new Error("valid Domain is required");
  }

  const result = await ToolsService.checkWhois(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Domain whois check successful",
    data: result,
  });
});

const checkDomainAge = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    throw new Error("valid Domain is required");
  }

  const result = await ToolsService.checkDomainAge(url);

  sendSuccessResponse(res, {
    statusCode: httpstatus.OK,
    message: "Domain age check successful",
    data: result,
  });
});

export const ToolsController = {
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
  findDNSRecords,
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
