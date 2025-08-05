import { Router } from "express";
import { DomainToolsController } from "./domain-tools.controller";
 
const router = Router();


// ❌  // ✅

// 1. Domain Authority Checker
router.post("/domain-authority-checker", DomainToolsController.checkDomainAuthority);   // ❌ , NOT WORKING

// 2. Domain IP History
router.post("/domain-ip-history", DomainToolsController.getDomainIPHistory);  // ❌ , NOT WORKING

// 3. XML Sitemap Generator
// router.post("/xml-sitemap-generator", DomainToolsController.generateXMLSitemap);   // ❌ , NOT WORKING

// 4. Compare Alexa Rank
// router.post("/compare-alexa-rank", DomainToolsController.compareAlexaRank);   // ❌ , NOT WORKING

// 5. Blog Search Tool
router.post("/blog-search-tool", DomainToolsController.searchBlogs);  // ❌ , NOT WORKING

// 6. Link Extractor
router.post("/link-extractor", DomainToolsController.extractLinks);  // ❌ , NOT WORKING

// 7. Domain Age Checker
router.post("/domain-age-checker", DomainToolsController.checkDomainAge);  // ❌ , ITs Duplicate. already there on ViserXTools in Postman...

// 8. Reverse IP Domains
router.post("/reverse-ip-domains", DomainToolsController.getReverseIPDomains);  // ❌ , NOT WORKING

// 9. Google Malware Checker
router.post("/google-malware-checker", DomainToolsController.checkGoogleMalware);   // ✅

// 10. Backlink Maker
router.post("/backlink-maker", DomainToolsController.createBacklinks);  // ❌ , ITs Duplicate. already there on ViserXTools in Postman...

// 11. Broken Links Checker
router.post("/broken-links-checker", DomainToolsController.checkBrokenLinks);   // ❌ , ITs Duplicate. already there on ViserXTools in Postman...

// 12. Google Indexer
router.post("/google-indexer", DomainToolsController.checkGoogleIndex);  // ❌ , ITs Duplicate. already there on ViserXTools in Postman...

// 13. Domain Whois Checker
// router.post("/domain-whois-checker", DomainToolsController.checkWhois);  // ❌ , ITs Duplicate. already there on ViserXTools in Postman...

// 14. Reverse Whois Checker
router.post("/reverse-whois-checker", DomainToolsController.checkReverseWhois);  // ❌ , ITs Duplicate. already there on ViserXTools in Postman...

// 15. Alexa Rank Checker
router.post("/alexa-rank-checker", DomainToolsController.checkAlexaRank); // ❌ 

// 16. Social Media Counter
router.post("/social-media-counter", DomainToolsController.countSocialMediaShares); // ❌ 

// 17. Google PR Checker
router.post("/google-pr-checker", DomainToolsController.checkGooglePR); // ❌ 

export const DomainToolsRoute = router; 