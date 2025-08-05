import { Router } from "express";
import { ToolsController } from "./tools.controller";

const router = Router();



// ❌  // ✅

// Domain Age Checker
router.post("/domain-age-checker", ToolsController.checkDomainAge);

// whois checker
router.post("/whois-check", ToolsController.checkWhois);

// Broken Link Checker
router.post("/broken-link-check", ToolsController.checkBrokenLink);

// Plagiarism Checker
router.post("/plagiarism-check", ToolsController.checkPlagiarism);

// Backlink Maker
router.post("/backlink-check", ToolsController.BacklinkMaker);

// online ping tool

router.post("/online-ping-check", ToolsController.pingSubmit);

// link analyzer external link or internal link
router.post("/link-analyzer", ToolsController.LinkAnalyzer);

// keyword density checker
router.post("/keyword-density", ToolsController.KeywordDensity);

// google malware checker
router.post("/google-malware-checker", ToolsController.GoogleMalwareChecker);

// Domain Info IP
router.post("/domain-info-ip", ToolsController.DomainToIP);

// Server Status Checker
router.post("/server-status", ToolsController.ServerStatusChecker);

// Page Size Checker
router.post("/page-size-checker", ToolsController.PageSizeChecker);

// Blacklist Lookup

router.post("/blacklist-lookup", ToolsController.BlacklistLookup);

// Suspicious Domain Checker
router.post(
  "/suspicious-domain-checker",
  ToolsController.checkSuspiciousDomains
);

// Code to Text Ratio Checker
router.post("/code-to-text-ratio", ToolsController.CodeToTextRatioChecker);  // ✅

// Website Links Count Checker
router.post("/website-link-count-checker", ToolsController.LinkCountChecker);

// Email Privacy Checker
router.post("/email-privacy-checker", ToolsController.EmailPrivacyChecker);

// Meta Tags Analyzer
router.post("/meta-tag-analyzer", ToolsController.MetaTagAnalyze);

// Search Engine Spider Simulator

router.post(
  "/search-engine-spider-simulator",
  ToolsController.searchEngineSpiderSimulator
);

// Google Cache Checker
router.post("/google-cache-checker", ToolsController.googleCacheChecker);

// what is my browser
router.get("/browser-details", ToolsController.whatIsMyBrowser);

// Find DNS records
router.post("/find-dns-record", ToolsController.findDNSRecords);

// Online MD5 Generate
router.post("/hash-md5", ToolsController.generateMd5Hash);

// Class C IP checker
router.post("/class-c-ip-checker", ToolsController.classCChecker);

// Google index Checker
router.post("/google-index-checker", ToolsController.checkGoogleIndex);

// Get Source Code of Webpage
router.post("/source-code", ToolsController.getWebpageSource);

// URL Rewritting Tool
router.post("/rewrite-url", ToolsController.rewriteUrl);

// Robots.txt Generator
router.post("/generate-robots", ToolsController.generateRobotsTxt);

// XML Sitemap Generator
router.post("/generate-sitemap", ToolsController.generateSitemap);

export const ToolsRoute = router;
