"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsRoute = void 0;
const express_1 = require("express");
const tools_controller_1 = require("./tools.controller");
const router = (0, express_1.Router)();
// ❌  // ✅
// Domain Age Checker
router.post("/domain-age-checker", tools_controller_1.ToolsController.checkDomainAge);
// whois checker
router.post("/whois-check", tools_controller_1.ToolsController.checkWhois);
// Broken Link Checker
router.post("/broken-link-check", tools_controller_1.ToolsController.checkBrokenLink);
// Plagiarism Checker
router.post("/plagiarism-check", tools_controller_1.ToolsController.checkPlagiarism);
// Backlink Maker
router.post("/backlink-check", tools_controller_1.ToolsController.BacklinkMaker);
// online ping tool
router.post("/online-ping-check", tools_controller_1.ToolsController.pingSubmit);
// link analyzer external link or internal link
router.post("/link-analyzer", tools_controller_1.ToolsController.LinkAnalyzer);
// keyword density checker
router.post("/keyword-density", tools_controller_1.ToolsController.KeywordDensity);
// google malware checker
router.post("/google-malware-checker", tools_controller_1.ToolsController.GoogleMalwareChecker);
// Domain Info IP
router.post("/domain-info-ip", tools_controller_1.ToolsController.DomainToIP);
// Server Status Checker
router.post("/server-status", tools_controller_1.ToolsController.ServerStatusChecker);
// Page Size Checker
router.post("/page-size-checker", tools_controller_1.ToolsController.PageSizeChecker);
// Blacklist Lookup
router.post("/blacklist-lookup", tools_controller_1.ToolsController.BlacklistLookup);
// Suspicious Domain Checker
router.post("/suspicious-domain-checker", tools_controller_1.ToolsController.checkSuspiciousDomains);
// Code to Text Ratio Checker
router.post("/code-to-text-ratio", tools_controller_1.ToolsController.CodeToTextRatioChecker); // ✅
// Website Links Count Checker
router.post("/website-link-count-checker", tools_controller_1.ToolsController.LinkCountChecker);
// Email Privacy Checker
router.post("/email-privacy-checker", tools_controller_1.ToolsController.EmailPrivacyChecker);
// Meta Tags Analyzer
router.post("/meta-tag-analyzer", tools_controller_1.ToolsController.MetaTagAnalyze);
// Search Engine Spider Simulator
router.post("/search-engine-spider-simulator", tools_controller_1.ToolsController.searchEngineSpiderSimulator);
// Google Cache Checker
router.post("/google-cache-checker", tools_controller_1.ToolsController.googleCacheChecker);
// what is my browser
router.get("/browser-details", tools_controller_1.ToolsController.whatIsMyBrowser);
// Find DNS records
router.post("/find-dns-record", tools_controller_1.ToolsController.findDNSRecords);
// Online MD5 Generate
router.post("/hash-md5", tools_controller_1.ToolsController.generateMd5Hash);
// Class C IP checker
router.post("/class-c-ip-checker", tools_controller_1.ToolsController.classCChecker);
// Google index Checker
router.post("/google-index-checker", tools_controller_1.ToolsController.checkGoogleIndex);
// Get Source Code of Webpage
router.post("/source-code", tools_controller_1.ToolsController.getWebpageSource);
// URL Rewritting Tool
router.post("/rewrite-url", tools_controller_1.ToolsController.rewriteUrl);
// Robots.txt Generator
router.post("/generate-robots", tools_controller_1.ToolsController.generateRobotsTxt);
// XML Sitemap Generator
router.post("/generate-sitemap", tools_controller_1.ToolsController.generateSitemap);
exports.ToolsRoute = router;
