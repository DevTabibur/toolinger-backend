"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainToolsRoute = void 0;
const express_1 = require("express");
const domain_tools_controller_1 = require("./domain-tools.controller");
const router = (0, express_1.Router)();
// ❌  // ✅
// 1. Domain Authority Checker
router.post("/domain-authority-checker", domain_tools_controller_1.DomainToolsController.checkDomainAuthority); // ❌ , NOT WORKING
// 2. Domain IP History
router.post("/domain-ip-history", domain_tools_controller_1.DomainToolsController.getDomainIPHistory); // ❌ , NOT WORKING
// 3. XML Sitemap Generator
// router.post("/xml-sitemap-generator", DomainToolsController.generateXMLSitemap);   // ❌ , NOT WORKING
// 4. Compare Alexa Rank
// router.post("/compare-alexa-rank", DomainToolsController.compareAlexaRank);   // ❌ , NOT WORKING
// 5. Blog Search Tool
router.post("/blog-search-tool", domain_tools_controller_1.DomainToolsController.searchBlogs); // ❌ , NOT WORKING
// 6. Link Extractor
router.post("/link-extractor", domain_tools_controller_1.DomainToolsController.extractLinks); // ❌ , NOT WORKING
// 7. Domain Age Checker
router.post("/domain-age-checker", domain_tools_controller_1.DomainToolsController.checkDomainAge); // ❌ , ITs Duplicate. already there on ViserXTools in Postman...
// 8. Reverse IP Domains
router.post("/reverse-ip-domains", domain_tools_controller_1.DomainToolsController.getReverseIPDomains); // ❌ , NOT WORKING
// 9. Google Malware Checker
router.post("/google-malware-checker", domain_tools_controller_1.DomainToolsController.checkGoogleMalware); // ✅
// 10. Backlink Maker
router.post("/backlink-maker", domain_tools_controller_1.DomainToolsController.createBacklinks); // ❌ , ITs Duplicate. already there on ViserXTools in Postman...
// 11. Broken Links Checker
router.post("/broken-links-checker", domain_tools_controller_1.DomainToolsController.checkBrokenLinks); // ❌ , ITs Duplicate. already there on ViserXTools in Postman...
// 12. Google Indexer
router.post("/google-indexer", domain_tools_controller_1.DomainToolsController.checkGoogleIndex); // ❌ , ITs Duplicate. already there on ViserXTools in Postman...
// 13. Domain Whois Checker
// router.post("/domain-whois-checker", DomainToolsController.checkWhois);  // ❌ , ITs Duplicate. already there on ViserXTools in Postman...
// 14. Reverse Whois Checker
router.post("/reverse-whois-checker", domain_tools_controller_1.DomainToolsController.checkReverseWhois); // ❌ , ITs Duplicate. already there on ViserXTools in Postman...
// 15. Alexa Rank Checker
router.post("/alexa-rank-checker", domain_tools_controller_1.DomainToolsController.checkAlexaRank); // ❌ 
// 16. Social Media Counter
router.post("/social-media-counter", domain_tools_controller_1.DomainToolsController.countSocialMediaShares); // ❌ 
// 17. Google PR Checker
router.post("/google-pr-checker", domain_tools_controller_1.DomainToolsController.checkGooglePR); // ❌ 
exports.DomainToolsRoute = router;
