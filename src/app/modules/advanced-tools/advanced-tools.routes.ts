import { Router } from "express";
import { AdvancedToolsController } from "./advanced-tools.controller";

const router = Router();


// ❌  // ✅
// Advanced Tools Routes

// Image Resizer API
router.post("/image-resizer", AdvancedToolsController.resizeImage);  // ❌, Later

// Video Cutter API
router.post("/video-cutter", AdvancedToolsController.cutVideo);  // ❌, Later

// Grammar Checker API
router.post("/grammar-checker", AdvancedToolsController.checkGrammar);  // ✅, 80% for basic grammer check. need to test it for more briefly

// Paraphraser API  
router.post("/paraphraser", AdvancedToolsController.paraphraseText);   // ❌, Need AI.

// Competitors Analyzer API
router.post("/competitors-analyzer", AdvancedToolsController.analyzeCompetitors);  // ❌, Later

// QR Code Generator API
router.post("/qr-code-generator", AdvancedToolsController.generateQRCode);   // ❌, Later


// PDF Converter API
router.post("/pdf-converter", AdvancedToolsController.convertPDF);  // ❌, Later


// Calculator API
router.post("/calculator", AdvancedToolsController.calculate);

// Timer API
router.post("/timer", AdvancedToolsController.startTimer);

// Calendar API
router.post("/calendar", AdvancedToolsController.getCalendar);

// Dictionary API
router.post("/dictionary", AdvancedToolsController.lookupWord);

// Interest Calculator API
router.post("/interest-calculator", AdvancedToolsController.calculateInterest);

// Currency Converter API
router.post("/currency-converter", AdvancedToolsController.convertCurrency);

// Website Backup API
router.post("/website-backup", AdvancedToolsController.backupWebsite);

// Website Migrator API
router.post("/website-migrator", AdvancedToolsController.migrateWebsite);

// Social Media Schedule API
router.post("/social-media-schedule", AdvancedToolsController.scheduleSocialMedia);

// Email Template Generator API
router.post("/email-template-generator", AdvancedToolsController.generateEmailTemplate);

// Detect CMS Tool API
router.post("/detect-cms", AdvancedToolsController.detectCMS);   // ✅

export const AdvancedToolsRoute = router; 