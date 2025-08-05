import { Router } from "express";
import { WebsiteManagementController } from "./website-management.controller";

const router = Router();


// ❌  // ✅


// Website Management Tools Routes

// dns-records tool
router.post("/dns-records", WebsiteManagementController.checkDNSRecords);   // ✅

// dns-propagation tool
router.post("/dns-propagation", WebsiteManagementController.checkDNSPropagation); // ✅ 

// ip-location tool
router.post("/ip-location", WebsiteManagementController.getIPLocation); // ✅ 

// traceroute tool
router.post("/traceroute", WebsiteManagementController.performTraceroute); // ❌

// google-index tool
router.post("/google-index", WebsiteManagementController.checkGoogleIndex); // ❌  1

// html-encoder-decoder tool
router.post("/html-encoder-decoder", WebsiteManagementController.encodeDecodeHTML);// ✅  50%

// favicon-generator tool
router.post("/favicon-generator", WebsiteManagementController.generateFavicon); // ❌ later need

// minify-html tool
router.post("/minify-html", WebsiteManagementController.minifyHTML); // ✅ 100%

// js-beautifier tool
router.post("/js-beautifier", WebsiteManagementController.beautifyJS); // ✅ 100%

// php-beautifier tool
router.post("/php-beautifier", WebsiteManagementController.beautifyPHP); // ✅ 100%

// rgb-to-hex tool 
router.post("/rgb-to-hex", WebsiteManagementController.convertRGBToHEX); // ✅ 100%

// reverse-ns tool
router.post("/reverse-ns", WebsiteManagementController.checkReverseNS); // ❌

// server-port-scanner tool
router.post("/server-port-scanner", WebsiteManagementController.scanServerPorts); // ✅ 100%

// server-status tool
router.post("/server-status", WebsiteManagementController.checkServerStatus); // ✅ 100%, takes 20 urls

// spider-simulator tool
router.post("/spider-simulator", WebsiteManagementController.simulateSpider); // ❌

// website-page-snooper tool ==> takes 20 urls, its actualy html viewer
router.post("/website-page-snooper", WebsiteManagementController.snoopWebsitePage); // ✅ 100%, takes 20 urls, its actualy html viewer

// domain-ip-lookup tool
router.post("/domain-ip-lookup", WebsiteManagementController.lookupDomainIP); // ✅ 100%, takes 20 urls

// minify-css tool
router.post("/minify-css", WebsiteManagementController.minifyCSS); // ✅ 100%,

// minify-json tool
router.post("/minify-json", WebsiteManagementController.minifyJSON); // ✅ 100%,

// html-beautifier tool
router.post("/html-beautifier", WebsiteManagementController.beautifyHTML);  // ✅ 100%,

// xml-beautifier tool
router.post("/xml-beautifier", WebsiteManagementController.beautifyXML);  // ✅ 100%,

// website-seo-score tool
router.post("/website-seo-score", WebsiteManagementController.checkWebsiteSEOScore); // ❌ Later need check

// dns-report tool
router.post("/dns-report", WebsiteManagementController.checkDNSReport); // ❌ Later need check

// class-c-ip tool
router.post("/class-c-ip", WebsiteManagementController.checkClassCIP); // ✅ 100%,

// different-locations-ping tool
router.post("/different-locations-ping", WebsiteManagementController.pingDifferentLocations); // ✅ 100%,

// google-index-tool tool
router.post("/google-index-tool", WebsiteManagementController.googleIndexTool);   // ✅ 100%,  but there is 2 tools same name. but work different, check later

// url-encoder-decoder tool
router.post("/url-encoder-decoder", WebsiteManagementController.encodeDecodeURL); // ✅ 100%,

// crop-image-online tool
router.post("/crop-image-online", WebsiteManagementController.cropImageOnline); // ❌ Later need check

// minify-js tool
router.post("/minify-js", WebsiteManagementController.minifyJS);  // ✅ 100%,

// css-beautifier tool
router.post("/css-beautifier", WebsiteManagementController.beautifyCSS);  // ✅ 100%,

// json-beautifier tool
router.post("/json-beautifier", WebsiteManagementController.beautifyJSON);   // ✅ 100%,

// ico-converter tool
router.post("/ico-converter", WebsiteManagementController.convertICO);   // // ❌ Later need check

export const WebsiteManagementRoute = router; 