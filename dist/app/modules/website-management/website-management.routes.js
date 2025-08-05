"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteManagementRoute = void 0;
const express_1 = require("express");
const website_management_controller_1 = require("./website-management.controller");
const router = (0, express_1.Router)();
// ❌  // ✅
// Website Management Tools Routes
// dns-records tool
router.post("/dns-records", website_management_controller_1.WebsiteManagementController.checkDNSRecords); // ✅
// dns-propagation tool
router.post("/dns-propagation", website_management_controller_1.WebsiteManagementController.checkDNSPropagation); // ✅ 
// ip-location tool
router.post("/ip-location", website_management_controller_1.WebsiteManagementController.getIPLocation); // ✅ 
// traceroute tool
router.post("/traceroute", website_management_controller_1.WebsiteManagementController.performTraceroute); // ❌
// google-index tool
router.post("/google-index", website_management_controller_1.WebsiteManagementController.checkGoogleIndex); // ❌  1
// html-encoder-decoder tool
router.post("/html-encoder-decoder", website_management_controller_1.WebsiteManagementController.encodeDecodeHTML); // ✅  50%
// favicon-generator tool
router.post("/favicon-generator", website_management_controller_1.WebsiteManagementController.generateFavicon); // ❌ later need
// minify-html tool
router.post("/minify-html", website_management_controller_1.WebsiteManagementController.minifyHTML); // ✅ 100%
// js-beautifier tool
router.post("/js-beautifier", website_management_controller_1.WebsiteManagementController.beautifyJS); // ✅ 100%
// php-beautifier tool
router.post("/php-beautifier", website_management_controller_1.WebsiteManagementController.beautifyPHP); // ✅ 100%
// rgb-to-hex tool 
router.post("/rgb-to-hex", website_management_controller_1.WebsiteManagementController.convertRGBToHEX); // ✅ 100%
// reverse-ns tool
router.post("/reverse-ns", website_management_controller_1.WebsiteManagementController.checkReverseNS); // ❌
// server-port-scanner tool
router.post("/server-port-scanner", website_management_controller_1.WebsiteManagementController.scanServerPorts); // ✅ 100%
// server-status tool
router.post("/server-status", website_management_controller_1.WebsiteManagementController.checkServerStatus); // ✅ 100%, takes 20 urls
// spider-simulator tool
router.post("/spider-simulator", website_management_controller_1.WebsiteManagementController.simulateSpider); // ❌
// website-page-snooper tool ==> takes 20 urls, its actualy html viewer
router.post("/website-page-snooper", website_management_controller_1.WebsiteManagementController.snoopWebsitePage); // ✅ 100%, takes 20 urls, its actualy html viewer
// domain-ip-lookup tool
router.post("/domain-ip-lookup", website_management_controller_1.WebsiteManagementController.lookupDomainIP); // ✅ 100%, takes 20 urls
// minify-css tool
router.post("/minify-css", website_management_controller_1.WebsiteManagementController.minifyCSS); // ✅ 100%,
// minify-json tool
router.post("/minify-json", website_management_controller_1.WebsiteManagementController.minifyJSON); // ✅ 100%,
// html-beautifier tool
router.post("/html-beautifier", website_management_controller_1.WebsiteManagementController.beautifyHTML); // ✅ 100%,
// xml-beautifier tool
router.post("/xml-beautifier", website_management_controller_1.WebsiteManagementController.beautifyXML); // ✅ 100%,
// website-seo-score tool
router.post("/website-seo-score", website_management_controller_1.WebsiteManagementController.checkWebsiteSEOScore); // ❌ Later need check
// dns-report tool
router.post("/dns-report", website_management_controller_1.WebsiteManagementController.checkDNSReport); // ❌ Later need check
// class-c-ip tool
router.post("/class-c-ip", website_management_controller_1.WebsiteManagementController.checkClassCIP); // ✅ 100%,
// different-locations-ping tool
router.post("/different-locations-ping", website_management_controller_1.WebsiteManagementController.pingDifferentLocations); // ✅ 100%,
// google-index-tool tool
router.post("/google-index-tool", website_management_controller_1.WebsiteManagementController.googleIndexTool); // ✅ 100%,  but there is 2 tools same name. but work different, check later
// url-encoder-decoder tool
router.post("/url-encoder-decoder", website_management_controller_1.WebsiteManagementController.encodeDecodeURL); // ✅ 100%,
// crop-image-online tool
router.post("/crop-image-online", website_management_controller_1.WebsiteManagementController.cropImageOnline); // ❌ Later need check
// minify-js tool
router.post("/minify-js", website_management_controller_1.WebsiteManagementController.minifyJS); // ✅ 100%,
// css-beautifier tool
router.post("/css-beautifier", website_management_controller_1.WebsiteManagementController.beautifyCSS); // ✅ 100%,
// json-beautifier tool
router.post("/json-beautifier", website_management_controller_1.WebsiteManagementController.beautifyJSON); // ✅ 100%,
// ico-converter tool
router.post("/ico-converter", website_management_controller_1.WebsiteManagementController.convertICO); // // ❌ Later need check
exports.WebsiteManagementRoute = router;
