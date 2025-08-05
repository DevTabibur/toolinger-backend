"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedToolsRoute = void 0;
const express_1 = require("express");
const advanced_tools_controller_1 = require("./advanced-tools.controller");
const router = (0, express_1.Router)();
// ❌  // ✅
// Advanced Tools Routes
// Image Resizer API
router.post("/image-resizer", advanced_tools_controller_1.AdvancedToolsController.resizeImage); // ❌, Later
// Video Cutter API
router.post("/video-cutter", advanced_tools_controller_1.AdvancedToolsController.cutVideo); // ❌, Later
// Grammar Checker API
router.post("/grammar-checker", advanced_tools_controller_1.AdvancedToolsController.checkGrammar); // ✅, 80% for basic grammer check. need to test it for more briefly
// Paraphraser API  
router.post("/paraphraser", advanced_tools_controller_1.AdvancedToolsController.paraphraseText); // ❌, Need AI.
// Competitors Analyzer API
router.post("/competitors-analyzer", advanced_tools_controller_1.AdvancedToolsController.analyzeCompetitors); // ❌, Later
// QR Code Generator API
router.post("/qr-code-generator", advanced_tools_controller_1.AdvancedToolsController.generateQRCode); // ❌, Later
// PDF Converter API
router.post("/pdf-converter", advanced_tools_controller_1.AdvancedToolsController.convertPDF); // ❌, Later
// Calculator API
router.post("/calculator", advanced_tools_controller_1.AdvancedToolsController.calculate);
// Timer API
router.post("/timer", advanced_tools_controller_1.AdvancedToolsController.startTimer);
// Calendar API
router.post("/calendar", advanced_tools_controller_1.AdvancedToolsController.getCalendar);
// Dictionary API
router.post("/dictionary", advanced_tools_controller_1.AdvancedToolsController.lookupWord);
// Interest Calculator API
router.post("/interest-calculator", advanced_tools_controller_1.AdvancedToolsController.calculateInterest);
// Currency Converter API
router.post("/currency-converter", advanced_tools_controller_1.AdvancedToolsController.convertCurrency);
// Website Backup API
router.post("/website-backup", advanced_tools_controller_1.AdvancedToolsController.backupWebsite);
// Website Migrator API
router.post("/website-migrator", advanced_tools_controller_1.AdvancedToolsController.migrateWebsite);
// Social Media Schedule API
router.post("/social-media-schedule", advanced_tools_controller_1.AdvancedToolsController.scheduleSocialMedia);
// Email Template Generator API
router.post("/email-template-generator", advanced_tools_controller_1.AdvancedToolsController.generateEmailTemplate);
// Detect CMS Tool API
router.post("/detect-cms", advanced_tools_controller_1.AdvancedToolsController.detectCMS); // ✅
exports.AdvancedToolsRoute = router;
