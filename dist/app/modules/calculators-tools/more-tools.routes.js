"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoreToolsRoute = void 0;
const express_1 = require("express");
const more_tools_controller_1 = require("./more-tools.controller");
const router = (0, express_1.Router)();
// ❌  // ✅
// More Tools Routes
// qr-code-scanner tool
router.post("/qr-code-scanner", more_tools_controller_1.MoreToolsController.scanQRCode); // ❌, Later
// roman-numerals-date-converter tool
router.post("/roman-numerals-date-converter", more_tools_controller_1.MoreToolsController.convertRomanNumeralsDate); // ✅
// binary-translator tool
router.post("/binary-translator", more_tools_controller_1.MoreToolsController.translateBinary); // ✅ , cehck this link for frontend design https://www.prepostseo.com/tool/binary-translator
// random-address-generator tool
router.post("/random-address-generator", more_tools_controller_1.MoreToolsController.generateRandomAddress); // ✅
// discount-calculator tool
router.post("/discount-calculator", more_tools_controller_1.MoreToolsController.calculateDiscount); // ✅
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// binary-to-hex tool
router.post("/binary-to-hex", more_tools_controller_1.MoreToolsController.convertBinaryToHex);
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// decimal-to-octal tool
router.post("/decimal-to-octal", more_tools_controller_1.MoreToolsController.convertDecimalToOctal);
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// octal-to-decimal tool
router.post("/octal-to-decimal", more_tools_controller_1.MoreToolsController.convertOctalToDecimal);
//===================================THIS TOOL ALREADY THERE, RGB-TO-HEX, in WEBSITE==================================
// hex-to-rgb tool
router.post("/hex-to-rgb", more_tools_controller_1.MoreToolsController.convertHEXToRGB);
// octal-calculator tool
router.post("/octal-calculator", more_tools_controller_1.MoreToolsController.calculateOctal); // ✅
// percentage-calculator tool
router.post("/percentage-calculator", more_tools_controller_1.MoreToolsController.calculatePercentage); // // ❌ , Later
// decimal-to-ascii tool
router.post("/decimal-to-ascii", more_tools_controller_1.MoreToolsController.convertDecimalToASCII);
// text-to-hex tool
router.post("/text-to-hex", more_tools_controller_1.MoreToolsController.convertTextToHEX);
// adsense-calculator tool
router.post("/adsense-calculator", more_tools_controller_1.MoreToolsController.calculateAdsense); // ✅
// paypal-fee-calculator tool
router.post("/paypal-fee-calculator", more_tools_controller_1.MoreToolsController.calculatePaypalFee); // ✅
// upside-down-text-generator tool
router.post("/upside-down-text-generator", more_tools_controller_1.MoreToolsController.generateUpsideDownText); // ✅
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// decimal-to-binary tool
// router.post("/decimal-to-binary", MoreToolsController.convertDecimalToBinary); // ❌, Later
// cpc-calculator tool
// router.post("/cpc-calculator", MoreToolsController.calculateCPC); // ❌, Later
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// hex-to-decimal tool
// router.post("/hex-to-decimal", MoreToolsController.convertHexToDecimal); // ❌, Later
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// hex-to-binary tool
// router.post("/hex-to-binary", MoreToolsController.convertHexToBinary); // ❌, Later
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// hex-to-octal tool
// router.post("/hex-to-octal", MoreToolsController.convertHexToOctal); // ❌, Later
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// octal-to-hex tool
// router.post("/octal-to-hex", MoreToolsController.convertOctalToHex); // ❌, Later
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// binary-calculator tool
// router.post("/binary-calculator", MoreToolsController.calculateBinary); // ❌, Later
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// ascii-to-text tool
// router.post("/ascii-to-text", MoreToolsController.convertASCIIToText); // ❌, Later
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// ascii-to-decimal tool
// router.post("/ascii-to-decimal", MoreToolsController.convertASCIIToDecimal); // ❌, Later
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// hex-to-ascii tool
// router.post("/hex-to-ascii", MoreToolsController.convertHEXToASCII); // ❌, Later
// password-generator tool
router.post("/password-generator", more_tools_controller_1.MoreToolsController.generatePassword); // ✅
// reverse-text-generator tool
router.post("/reverse-text-generator", more_tools_controller_1.MoreToolsController.generateReverseText); // ✅
// roman-numeral-converter tool
router.post("/roman-numeral-converter", more_tools_controller_1.MoreToolsController.convertRomanNumeral); // ✅
// ltv-calculator tool
router.post("/ltv-calculator", more_tools_controller_1.MoreToolsController.calculateLTV); // ✅  80%
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// binary-to-decimal tool
// router.post("/binary-to-decimal", MoreToolsController.convertBinaryToDecimal); // ❌, Later
// cpm-calculator tool
router.post("/cpm-calculator", more_tools_controller_1.MoreToolsController.calculateCPM); // ✅
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// decimal-to-hex tool
// router.post("/decimal-to-hex", MoreToolsController.convertDecimalToHex); // ❌, Later
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// binary-to-octal tool
// router.post("/binary-to-octal", MoreToolsController.convertBinaryToOctal); // ❌, Later
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// octal-to-binary tool
// router.post("/octal-to-binary", MoreToolsController.convertOctalToBinary); // ❌, Later
// case-converter tool
// router.post("/case-converter", MoreToolsController.convertCase); // ❌, Later
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// hex-calculator tool
// router.post("/hex-calculator", MoreToolsController.calculateHEX); // ❌, Later
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// text-to-ascii tool
// router.post("/text-to-ascii", MoreToolsController.convertTextToASCII);
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// ascii-to-hex tool
// router.post("/ascii-to-hex", MoreToolsController.convertASCIIToHEX); // ❌, Later
//===================================THIS TOOL ALREADY THERE, NAME BINARY TRANSLATOR==================================
// hex-to-text tool
// router.post("/hex-to-text", MoreToolsController.convertHEXToText); // ❌, Later
// fake-name-generator tool
// router.post("/fake-name-generator", MoreToolsController.generateFakeName);  // ❌, Later
// text-to-hex-2 tool
router.post("/text-to-hex-2", more_tools_controller_1.MoreToolsController.convertTextToHEX2);
// random-word-generator tool
router.post("/random-word-generator", more_tools_controller_1.MoreToolsController.generateRandomWord); // ✅
// eps-calculator tool  => Earning per share
router.post("/eps-calculator", more_tools_controller_1.MoreToolsController.calculateEPS); // ✅
// sales-tax-calculator tool
router.post("/sales-tax-calculator", more_tools_controller_1.MoreToolsController.calculateSalesTax); // ✅
// average-calculator tool
router.post("/average-calculator", more_tools_controller_1.MoreToolsController.calculateAverage); // ✅
// words-to-pages tool
// router.post("/words-to-pages", MoreToolsController.convertWordsToPages); // ❌, Later
// text-to-handwriting tool
// router.post("/text-to-handwriting", MoreToolsController.convertTextToHandwriting); // ❌, Later
// online-text-editor tool
// router.post("/online-text-editor", MoreToolsController.editTextOnline); // ❌, Later
// probability-calculator tool
router.post("/probability-calculator", more_tools_controller_1.MoreToolsController.calculateProbability); // ✅
// gst-calculator tool
router.post("/gst-calculator", more_tools_controller_1.MoreToolsController.calculateGST); // ✅
// age-calculator tool
router.post("/age-calculator", more_tools_controller_1.MoreToolsController.calculateAge); // ✅
// jpg-to-word tool
// router.post("/jpg-to-word", MoreToolsController.convertJPGToWord); // ❌, Later
// pdf-to-word tool
// router.post("/pdf-to-word", MoreToolsController.convertPDFToWord); // ❌, Later
// text-to-image tool
// router.post("/text-to-image", MoreToolsController.convertTextToImage); // ❌, Later
// margin-calculator tool
router.post("/margin-calculator", more_tools_controller_1.MoreToolsController.calculateMargin); // ✅ , Need to Check the frontend later
// bounds-calculator tool // lower and upper
router.post("/bounds-calculator", more_tools_controller_1.MoreToolsController.calculateBounds); // ✅
// valuation-calculator tool
router.post("/valuation-calculator", more_tools_controller_1.MoreToolsController.calculateValuation); // ✅
// pdf-to-text tool
// router.post("/pdf-to-text", MoreToolsController.convertPDFToText); // ❌, Later
exports.MoreToolsRoute = router;
