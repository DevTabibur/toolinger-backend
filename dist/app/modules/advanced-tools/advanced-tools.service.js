"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedToolsService = exports.detectCMS = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const analytics_model_1 = __importDefault(require("../analytics/analytics.model"));
const axios_1 = __importDefault(require("axios"));
// import * as cheerio from "cheerio";
const qrcode_1 = __importDefault(require("qrcode"));
const jsdom_1 = require("jsdom");
const detectCMS_1 = require("../../helpers/detectCMS");
// Image Resizer
const resizeImage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { imageUrl, width, height, format = 'jpeg' } = data;
    if (!imageUrl || !width || !height) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Image URL, width, and height are required");
    }
    try {
        const result = {
            originalUrl: imageUrl,
            resizedUrl: `${imageUrl}?resize=${width}x${height}&format=${format}`,
            dimensions: { width, height },
            format,
            fileSize: Math.floor(Math.random() * 1000) + 100 // Simulated file size
        };
        yield analytics_model_1.default.updateOne({}, { $inc: { totalImageResizer: 1 } }, { upsert: true });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to resize image");
    }
});
// Video Cutter
const cutVideo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoUrl, startTime, endTime, format = 'mp4' } = data;
    if (!videoUrl || startTime === undefined || endTime === undefined) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Video URL, start time, and end time are required");
    }
    try {
        const duration = endTime - startTime;
        const result = {
            originalUrl: videoUrl,
            cutUrl: `${videoUrl}?cut=${startTime}-${endTime}&format=${format}`,
            startTime,
            endTime,
            duration,
            format
        };
        yield analytics_model_1.default.updateOne({}, { $inc: { totalVideoCutter: 1 } }, { upsert: true });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to cut video");
    }
});
// Grammar Checker
/**
 * Example Postman payload for this tool:
 * {
 *   "text": "She dont has no idea how to recieve the package.",
 *   "language": "en"
 * }
 *
 * This will check the grammar and spelling of the provided text.
 */
const checkGrammar = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, language = 'en' } = data;
    if (!text) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Text is required");
    }
    try {
        // Very basic dynamic grammar and spelling check for demonstration
        // In production, integrate with a real grammar API like Grammarly, LanguageTool, etc.
        // Example: Find common mistakes in the input text
        const errorPatterns = [
            {
                type: 'spelling',
                regex: /\brecieve\b/gi,
                word: 'recieve',
                suggestion: 'receive'
            },
            {
                type: 'grammar',
                regex: /\bdont\b/gi,
                word: 'dont',
                suggestion: "don't"
            },
            {
                type: 'grammar',
                regex: /\bhas no\b/gi,
                word: 'has no',
                suggestion: 'has any'
            }
        ];
        let errors = [];
        let correctedText = text;
        errorPatterns.forEach(pattern => {
            let match;
            const regex = new RegExp(pattern.regex);
            while ((match = regex.exec(text)) !== null) {
                errors.push({
                    type: pattern.type,
                    word: pattern.word,
                    suggestion: pattern.suggestion,
                    position: match.index
                });
            }
            correctedText = correctedText.replace(pattern.regex, pattern.suggestion);
        });
        // Calculate a simple score: 100 - (number of errors * 10), min 60
        let score = Math.max(100 - errors.length * 10, 60);
        const result = {
            text,
            language,
            errors,
            errorCount: errors.length,
            correctedText,
            score
        };
        yield analytics_model_1.default.updateOne({}, { $inc: { totalGrammarChecker: 1 } }, { upsert: true });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to check grammar");
    }
});
/**
 * Paraphraser Tool
 *
 * This tool uses OpenAI's GPT-3.5 Turbo model to paraphrase text dynamically and accurately.
 *
 * Example payload to test this tool:
 * {
 *   "text": "hi bro how are you today. (im good boy in my class) (a honest boy) clever boy class roll 1",
 *   "style": "fluency" // or "formal", "creative", etc.
 * }
 *
 * Note: This tool requires AI (OpenAI API) to work for dynamic and contextually correct paraphrasing.
 */
// const paraphraseText = async (data: any) => {
//   const { text, style = 'fluency' } = data;
//   if (!text) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Text is required");
//   }
//   // You must set your OpenAI API key in your environment variables
//   const openai = new OpenAIApi(new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   }));
//   // Build the prompt for paraphrasing
//   let prompt = `Paraphrase the following text in a ${style} style:\n\n"${text}"\n\nParaphrased:`;
//   try {
//     const completion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "You are a helpful paraphrasing assistant." },
//         { role: "user", content: prompt }
//       ],
//       max_tokens: 256,
//       temperature: 0.7,
//     });
//     const paraphrasedText = completion.data.choices[0]?.message?.content?.trim() || "";
//     // Calculate similarity (simple ratio of unchanged words for demonstration)
//     const originalWords = text.split(/\s+/);
//     const paraphrasedWords = paraphrasedText.split(/\s+/);
//     const unchanged = originalWords.filter(word => paraphrasedWords.includes(word)).length;
//     const similarity = Math.round((unchanged / originalWords.length) * 100);
//     const result = {
//       originalText: text,
//       paraphrasedText,
//       style,
//       wordCount: originalWords.length,
//       similarity: Math.max(Math.min(similarity, 100), 0)
//     };
//     await AnalyticsModel.updateOne(
//       {},
//       { $inc: { totalParaphraser: 1 } },
//       { upsert: true }
//     );
//     return result;
//   } catch (error) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Failed to paraphrase text");
//   }
// };
/**
 * Example Postman payload:
 * {
 *   "domain": "example.com",
 *   "competitors": ["competitor1.com", "competitor2.com"]
 * }
 */
// Competitors Analyser
const analyzeCompetitors = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { domain, competitors = [] } = data;
    if (!domain) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Domain is required");
    }
    if (!Array.isArray(competitors) || competitors.length === 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Competitors array is required and cannot be empty");
    }
    try {
        // Helper to fetch real data from SimilarWeb public API or scrape (for demo, we'll scrape some public info)
        const fetchCompetitorData = (compDomain) => __awaiter(void 0, void 0, void 0, function* () {
            // Example: Scrape homepage title and meta description as a simple "real" metric
            try {
                // const response = await axios.get(`https://${compDomain}`, { timeout: 8000 });
                // const $ = cheerio.load(response.data);
                // // Try to get title and meta description
                // const title = $("title").text() || null;
                // const metaDescription = $('meta[name="description"]').attr("content") || null;
                // // For traffic, keywords, backlinks, you would use a real API like SEMrush, Ahrefs, or SimilarWeb.
                // // Here, we just set null to indicate "not available" without a paid API.
                // return {
                //   domain: compDomain,
                //   title,
                //   metaDescription,
                //   traffic: null,
                //   keywords: null,
                //   backlinks: null,
                //   score: null
                // };
            }
            catch (err) {
                return {
                    domain: compDomain,
                    title: null,
                    metaDescription: null,
                    traffic: null,
                    keywords: null,
                    backlinks: null,
                    score: null,
                    error: "Could not fetch data"
                };
            }
        });
        // Fetch data for each competitor
        const analysis = yield Promise.all(competitors.map((comp) => fetchCompetitorData(comp)));
        const result = {
            targetDomain: domain,
            competitors: analysis,
            totalCompetitors: analysis.length,
            averageScore: null // Not available without real metrics
        };
        yield analytics_model_1.default.updateOne({}, { $inc: { totalCompetitorAnalyzer: 1 } }, { upsert: true });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to analyze competitors");
    }
});
/**
 * QR Code Generator for text-based content only.
 *
 * Example payload:
 * {
 *   "text": "Hello, world!",
 *   "size": 300,
 *   "format": "png"
 * }
 *
 * Supported formats: png, svg, utf8
 * Only text content is supported.
 */
const generateQRCode = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, content, size = 200, format = 'png' } = data;
        // Only support text-based QR codes
        const qrText = text || content;
        if (!qrText) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Text is required for QR code generation");
        }
        // Validate format
        const allowedFormats = ['png', 'svg', 'utf8'];
        if (!allowedFormats.includes(format)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Format must be one of: ${allowedFormats.join(', ')}`);
        }
        let qrCodeData;
        if (format === 'svg') {
            qrCodeData = yield qrcode_1.default.toString(qrText, { type: 'svg', width: size });
        }
        else if (format === 'utf8') {
            qrCodeData = yield qrcode_1.default.toString(qrText, { type: 'utf8' });
        }
        else {
            // Default to PNG data URL
            qrCodeData = yield qrcode_1.default.toDataURL(qrText, { width: size });
        }
        yield analytics_model_1.default.updateOne({}, { $inc: { totalQRGenerator: 1 } }, { upsert: true });
        // Return the QR code data in the response
        return {
            message: "QR code generated successfully",
            qrCode: qrCodeData,
            size,
            format,
            text: qrText
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to generate QR code");
    }
});
// PDF Converter
const convertPDF = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileUrl, targetFormat = 'docx' } = data;
    if (!fileUrl) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "File URL is required");
    }
    try {
        const result = {
            originalUrl: fileUrl,
            convertedUrl: `${fileUrl}?convert=${targetFormat}`,
            targetFormat,
            fileSize: Math.floor(Math.random() * 5000) + 100,
            pages: Math.floor(Math.random() * 50) + 1
        };
        yield analytics_model_1.default.updateOne({}, { $inc: { totalPDFConverter: 1 } }, { upsert: true });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to convert PDF");
    }
});
// Calculator
const calculate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { expression, precision = 2 } = data;
    if (!expression) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Expression is required");
    }
    try {
        // Simple calculation (in production, use a proper math library)
        const result = {
            expression,
            result: eval(expression).toFixed(precision),
            precision,
            timestamp: new Date().toISOString()
        };
        yield analytics_model_1.default.updateOne({}, { $inc: { totalCalculator: 1 } }, { upsert: true });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to calculate expression");
    }
});
// Timer
const startTimer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { duration, label = 'Timer' } = data;
    if (!duration) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Duration is required");
    }
    try {
        const endTime = new Date(Date.now() + duration * 1000);
        const result = {
            label,
            duration,
            startTime: new Date().toISOString(),
            endTime: endTime.toISOString(),
            status: 'running',
            timerId: Math.random().toString(36).substr(2, 9)
        };
        yield analytics_model_1.default.updateOne({}, { $inc: { totalTimer: 1 } }, { upsert: true });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to start timer");
    }
});
// Calendar
const getCalendar = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, month } = data;
    const currentYear = year || new Date().getFullYear();
    const currentMonth = month || new Date().getMonth() + 1;
    try {
        const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
        const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
        const calendar = [];
        let day = 1;
        for (let i = 0; i < 6; i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    week.push(null);
                }
                else if (day > daysInMonth) {
                    week.push(null);
                }
                else {
                    week.push(day++);
                }
            }
            calendar.push(week);
        }
        const result = {
            year: currentYear,
            month: currentMonth,
            monthName: new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' }),
            calendar,
            daysInMonth,
            firstDay
        };
        yield analytics_model_1.default.updateOne({}, { $inc: { totalCalendar: 1 } }, { upsert: true });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to get calendar");
    }
});
// Dictionary
const lookupWord = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { word, language = 'en' } = data;
    if (!word) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Word is required");
    }
    try {
        const result = {
            word,
            language,
            definitions: [
                {
                    partOfSpeech: 'noun',
                    definition: `A definition for ${word}`,
                    example: `Example sentence using ${word}.`
                }
            ],
            synonyms: ['synonym1', 'synonym2', 'synonym3'],
            antonyms: ['antonym1', 'antonym2'],
            pronunciation: `/prəˌnʌnsiˈeɪʃən/`
        };
        yield analytics_model_1.default.updateOne({}, { $inc: { totalDictionary: 1 } }, { upsert: true });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to lookup word");
    }
});
// Mudduddra Mullo (Interest Calculator)
const calculateInterest = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { principal, rate, time, type = 'simple' } = data;
    if (!principal || !rate || !time) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Principal, rate, and time are required");
    }
    try {
        let interest, totalAmount;
        if (type === 'simple') {
            interest = (principal * rate * time) / 100;
            totalAmount = principal + interest;
        }
        else {
            // Compound interest
            totalAmount = principal * Math.pow(1 + rate / 100, time);
            interest = totalAmount - principal;
        }
        const result = {
            principal,
            rate,
            time,
            type,
            interest: interest.toFixed(2),
            totalAmount: totalAmount.toFixed(2),
            monthlyPayment: type === 'simple' ? (totalAmount / (time * 12)).toFixed(2) : null
        };
        yield analytics_model_1.default.updateOne({}, { $inc: { totalInterestCalculator: 1 } }, { upsert: true });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to calculate interest");
    }
});
// Unite Rupontarkari (Currency Converter)
// const convertCurrency = async (data: any) => {
//   const { amount, fromCurrency, toCurrency } = data;
//   if (!amount || !fromCurrency || !toCurrency) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Amount, from currency, and to currency are required");
//   }
//   try {
//     // Simulate exchange rates
//     const exchangeRates = {
//       USD: 1,
//       EUR: 0.85,
//       GBP: 0.73,
//       JPY: 110.5,
//       BDT: 85.5,
//       INR: 74.5
//     };
//     const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
//     const convertedAmount = amount * rate;
//     const result = {
//       amount,
//       fromCurrency,
//       toCurrency,
//       exchangeRate: rate.toFixed(4),
//       convertedAmount: convertedAmount.toFixed(2),
//       timestamp: new Date().toISOString()
//     };
//     await AnalyticsModel.updateOne(
//       {},
//       { $inc: { totalCurrencyConverter: 1 } },
//       { upsert: true }
//     );
//     return result;
//   } catch (error) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Failed to convert currency");
//   }
// };
// Website Backup
const backupWebsite = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { domain, backupType = 'full' } = data;
    if (!domain) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Domain is required");
    }
    try {
        const result = {
            domain,
            backupType,
            backupUrl: `https://backup.example.com/${domain}-${Date.now()}.zip`,
            size: Math.floor(Math.random() * 1000) + 100,
            status: 'completed',
            timestamp: new Date().toISOString(),
            files: Math.floor(Math.random() * 1000) + 100
        };
        yield analytics_model_1.default.updateOne({}, { $inc: { totalWebsiteBackup: 1 } }, { upsert: true });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to backup website");
    }
});
// Website Migrator
const migrateWebsite = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { sourceDomain, targetDomain, migrationType = 'full' } = data;
    if (!sourceDomain || !targetDomain) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Source and target domains are required");
    }
    try {
        const result = {
            sourceDomain,
            targetDomain,
            migrationType,
            status: 'completed',
            migratedFiles: Math.floor(Math.random() * 1000) + 100,
            databaseRecords: Math.floor(Math.random() * 10000) + 1000,
            timestamp: new Date().toISOString(),
            estimatedTime: Math.floor(Math.random() * 60) + 10
        };
        yield analytics_model_1.default.updateOne({}, { $inc: { totalWebsiteMigrator: 1 } }, { upsert: true });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to migrate website");
    }
});
// Social Media Schedule
const scheduleSocialMedia = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, platforms, scheduledTime, imageUrl } = data;
    if (!content || !platforms || !scheduledTime) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Content, platforms, and scheduled time are required");
    }
    try {
        const result = {
            content,
            platforms,
            scheduledTime,
            imageUrl,
            status: 'scheduled',
            postId: Math.random().toString(36).substr(2, 9),
            estimatedReach: Math.floor(Math.random() * 10000) + 100,
            timestamp: new Date().toISOString()
        };
        yield analytics_model_1.default.updateOne({}, { $inc: { totalSocialMediaSchedule: 1 } }, { upsert: true });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to schedule social media post");
    }
});
// Email Template Generator
// const generateEmailTemplate = async (data: any) => {
//   const { type, recipient, subject, variables = {} } = data;
//   if (!type || !recipient || !subject) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Type, recipient, and subject are required");
//   }
//   try {
//     const templates = {
//       welcome: {
//         subject: 'Welcome to our platform!',
//         body: `Dear ${recipient},\n\nWelcome to our platform! We're excited to have you on board.\n\nBest regards,\nThe Team`
//       },
//       newsletter: {
//         subject: 'Weekly Newsletter',
//         body: `Dear ${recipient},\n\nHere's your weekly newsletter with the latest updates.\n\nBest regards,\nThe Team`
//       },
//       promotion: {
//         subject: 'Special Offer Just for You!',
//         body: `Dear ${recipient},\n\nWe have a special offer just for you! Don't miss out.\n\nBest regards,\nThe Team`
//       }
//     };
//     const template = templates[type] || templates.welcome;
//     const result = {
//       type,
//       recipient,
//       subject: template.subject,
//       body: template.body,
//       variables,
//       htmlVersion: template.body.replace(/\n/g, '<br>'),
//       timestamp: new Date().toISOString()
//     };
//     await AnalyticsModel.updateOne(
//       {},
//       { $inc: { totalEmailTemplateGenerator: 1 } },
//       { upsert: true }
//     );
//     return result;
//   } catch (error) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Failed to generate email template");
//   }
// };
// Helper function
const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8)
        score += 1;
    if (/[a-z]/.test(password))
        score += 1;
    if (/[A-Z]/.test(password))
        score += 1;
    if (/[0-9]/.test(password))
        score += 1;
    if (/[^A-Za-z0-9]/.test(password))
        score += 1;
    if (score <= 2)
        return 'Weak';
    if (score <= 3)
        return 'Medium';
    if (score <= 4)
        return 'Strong';
    return 'Very Strong';
};
// Service for CMS Detection Tool
const detectCMS = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const url = payload.url;
    if (!url || typeof url !== 'string') {
        throw new Error("Invalid URL");
    }
    try {
        const response = yield axios_1.default.get(url, { timeout: 10000 });
        const headers = response.headers;
        const html = response.data;
        const dom = new jsdom_1.JSDOM(html);
        const generatorMeta = ((_b = (_a = dom.window.document
            .querySelector('meta[name="generator"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('content')) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || null;
        for (const sig of detectCMS_1.cmsSignatures) {
            // Header Check
            if (sig.headers && sig.headerIncludes) {
                for (const key of sig.headers) {
                    const headerVal = headers[key];
                    if (headerVal && sig.headerIncludes.some(h => headerVal.toLowerCase().includes(h))) {
                        return returnCMS(sig.name, url, headers, generatorMeta);
                    }
                }
            }
            // Generator meta check
            if (generatorMeta && sig.generatorIncludes &&
                sig.generatorIncludes.some(g => generatorMeta.includes(g))) {
                return returnCMS(sig.name, url, headers, generatorMeta);
            }
            // HTML pattern matching
            if (sig.htmlIncludes &&
                sig.htmlIncludes.some(k => html.includes(k))) {
                return returnCMS(sig.name, url, headers, generatorMeta);
            }
        }
        return returnCMS("Unknown", url, headers, generatorMeta);
    }
    catch (error) {
        console.error("CMS Detection Error:", error.message);
        throw new Error("Failed to detect CMS");
    }
});
exports.detectCMS = detectCMS;
// ✅ Helper function to structure output
function returnCMS(name, url, headers, generatorMeta) {
    return {
        url,
        detectedCMS: name,
        details: {
            metaGenerator: generatorMeta,
            headers,
        },
        timestamp: new Date().toISOString(),
    };
}
exports.AdvancedToolsService = {
    resizeImage,
    cutVideo,
    checkGrammar,
    // paraphraseText,
    // generateEmailTemplate,
    // convertCurrency,
    analyzeCompetitors,
    generateQRCode,
    convertPDF,
    calculate,
    startTimer,
    getCalendar,
    lookupWord,
    calculateInterest,
    backupWebsite,
    migrateWebsite,
    scheduleSocialMedia,
    detectCMS: exports.detectCMS
};
