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
exports.ToolsService = exports.PingService = void 0;
const axios_1 = __importDefault(require("axios"));
const xmlbuilder2_1 = require("xmlbuilder2");
// import * as cheerio from "cheerio";
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const promises_1 = __importDefault(require("dns/promises"));
const extractHostName_1 = require("../../utils/extractHostName");
const dnsblCheck_1 = require("../../utils/dnsblCheck");
const suspiciousCheck_1 = require("../../utils/suspiciousCheck");
const parseLinks_1 = require("../../utils/parseLinks");
const extractEmails_1 = require("../../utils/extractEmails");
const crypto_1 = __importDefault(require("crypto"));
//================================================
// import axios from "axios";
// import cheerio from "cheerio";
// import ProxyAgent from "proxy-agent";
// // Utility to split text into meaningful sentences
// const splitSentences = (text: string): string[] => {
//   return text
//     .replace(/[.!?]+/g, ".")
//     .split(".")
//     .map((s) => s.trim())
//     .filter((s) => s.length > 10);
// };
// // Main plagiarism checking function
// const checkPlagiarism = async (
//   text: string
// ): Promise<{
//   total: number;
//   matches: number;
//   percent: number;
//   details: Array<{ sentence: string; found: boolean }>;
// }> => {
//   const sentences = splitSentences(text);
//   let matches = 0;
//   const results = [];
//   for (const sentence of sentences) {
//     try {
//       // Google doesn't allow bot traffic, so we use Bing
//       const searchQuery = `"${sentence.substring(0, 30)}"`;
//       const response = await axios.get(
//         `https://www.bing.com/search?q=${encodeURIComponent(searchQuery)}`,
//         {
//           headers: {
//             "User-Agent": "Mozilla/5.0",
//           },
//           // Optional: use proxy if needed
//           // httpsAgent: new ProxyAgent('http://your-proxy:port')
//         }
//       );
//       const $ = cheerio.load(response.data);
//       const found = $("li.b_algo").length > 0;
//       results.push({
//         sentence,
//         found,
//       });
//       if (found) matches++;
//       // Delay between requests to avoid rate limiting
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//     } catch (error) {
//       console.error("Search error:", error.message);
//       results.push({
//         sentence,
//         found: false,
//       });
//     }
//   }
//   return {
//     total: sentences.length,
//     matches,
//     percent: sentences.length ? (matches / sentences.length) * 100 : 0,
//     details: results,
//   };
// };
// export const PlagiarismService = { checkPlagiarism };
// import axios from "axios";
// import cheerio from "cheerio";
// // Utility function to split text into meaningful sentences
// const splitSentences = (text: string): string[] => {
//   return text
//     .replace(/[.!?]+/g, ".")
//     .split(".")
//     .map((s) => s.trim())
//     .filter((s) => s.length > 20);
// };
// // Main plagiarism checking function
// const checkPlagiarism = async (
//   text: string
// ): Promise<{
//   total: number;
//   matches: number;
//   percent: number;
//   details: Array<{ sentence: string; found: boolean }>;
// }> => {
//   const sentences = splitSentences(text);
//   let matches = 0;
//   const results = [];
//   for (const sentence of sentences) {
//     try {
//       const searchQuery = `"${sentence.substring(0, 30)}"`;
//       const response = await axios.get(
//         `https://www.bing.com/search?q=${encodeURIComponent(searchQuery)}`,
//         {
//           headers: {
//             "User-Agent":
//               "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
//           },
//         }
//       );
//       const $ = cheerio.load(response.data);
//       console.log('load', $)
//       const found = $(".b_algo").length > 0;
//       results.push({
//         sentence,
//         found,
//       });
//       if (found) matches++;
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//     } catch (error) {
//       console.error("Search error:", error.message);
//       results.push({
//         sentence,
//         found: false,
//       });
//     }
//   }
//   return {
//     total: sentences.length,
//     matches,
//     percent: sentences.length ? (matches / sentences.length) * 100 : 0,
//     details: results,
//   };
// };
// export const PlagiarismService = {
//   checkPlagiarism,
// };
// Utility function to split text into meaningful sentences
const splitSentences = (text) => {
    return text
        .replace(/[.!?]+/g, ".")
        .split(".")
        .map((s) => s.trim())
        .filter((s) => s.length > 20);
};
// Main plagiarism checking function
const checkPlagiarism = (text) => __awaiter(void 0, void 0, void 0, function* () {
    // const sentences = splitSentences(text);
    // let matches = 0;
    // const results = [];
    // // Add your proxy URL here
    // const proxyUrl: ProxyAgentOptions = "http://user:pass@ip:port"; // paid proxy theke paben
    // const agent = new ProxyAgent(proxyUrl); // ✅ Ekhane error chilo
    // for (const sentence of sentences) {
    //   try {
    //     const searchQuery = `"${sentence.substring(0, 30)}"`;
    //     const response = await axios.get(
    //       `https://www.bing.com/search?q=${encodeURIComponent(searchQuery)}`,
    //       {
    //         headers: {
    //           "User-Agent":
    //             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    //         },
    //         httpsAgent: agent, // ✅ Proxy add kora hocche
    //       }
    //     );
    //     console.log("response", response.data);
    //     if (!response || !response.data) {
    //       throw new Error("Empty response from server");
    //     }
    //     const $ = cheerio.load(response.data);
    //     const found = $(".b_algo").length > 0;
    //     results.push({
    //       sentence,
    //       found,
    //     });
    //     if (found) matches++;
    //     await new Promise((resolve) => setTimeout(resolve, 1000));
    //   } catch (error) {
    //     console.error("Search error:", error.message);
    //     results.push({
    //       sentence,
    //       found: false,
    //     });
    //   }
    // }
    // return {
    //   total: sentences.length,
    //   matches,
    //   percent: sentences.length ? (matches / sentences.length) * 100 : 0,
    //   details: results,
    // };
});
const BacklinkMaker = {
    generateBacklink: (input) => {
        const { url, anchorText, nofollow = true, targetBlank = true } = input;
        const relParts = [];
        if (nofollow)
            relParts.push("nofollow");
        relParts.push("noopener", "noreferrer");
        const relAttr = relParts.join(" ");
        const targetAttr = targetBlank ? ' target="_blank"' : "";
        return `<a href="${url}" rel="${relAttr}"${targetAttr}>${anchorText}</a>`;
    },
};
const pingEndpoints = [
    "http://rpc.pingomatic.com/",
    "http://blogsearch.google.com/ping/RPC2",
    "http://rpc.weblogs.com/RPC2",
    "https://api.feedburner.com/fb/a/ping",
];
exports.PingService = {
    sendPings: (input) => __awaiter(void 0, void 0, void 0, function* () {
        const { blogUrl, updatedUrl, rssFeedUrl } = input;
        const results = [];
        const xml = (0, xmlbuilder2_1.create)({ version: "1.0" })
            .ele("methodCall")
            .ele("methodName")
            .txt("weblogUpdates.ping")
            .up()
            .ele("params")
            .ele("param")
            .ele("value")
            .ele("string")
            .txt(blogUrl)
            .up()
            .up()
            .up();
        if (updatedUrl)
            xml
                .ele("param")
                .ele("value")
                .ele("string")
                .txt(updatedUrl)
                .up()
                .up()
                .up();
        if (rssFeedUrl)
            xml
                .ele("param")
                .ele("value")
                .ele("string")
                .txt(rssFeedUrl)
                .up()
                .up()
                .up();
        const body = xml.end({ prettyPrint: true });
        yield Promise.all(pingEndpoints.map((endpoint) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                const res = yield axios_1.default.post(endpoint, body, {
                    headers: { "Content-Type": "text/xml" },
                    timeout: 5000,
                });
                results.push({
                    endpoint,
                    success: res.status === 200,
                    status: res.status,
                });
            }
            catch (e) {
                results.push({
                    endpoint,
                    success: false,
                    status: ((_a = e.response) === null || _a === void 0 ? void 0 : _a.status) || null,
                });
            }
        })));
        return results;
    }),
};
// const LinkAnalyzer = async (pageUrl: string) => {
//   const response = await axios.get(pageUrl);
//   const html = response.data;
//   const $ = cheerio.load(html);
//   const links = $("a");
//   let internalLinks: any[] = [];
//   let externalLinks: any[] = [];
//   let nofollowCount = 0;
//   const baseDomain = new URL(pageUrl).hostname;
//   links.each((i, link) => {
//     const href = $(link).attr("href");
//     const rel = ($(link).attr("rel") || "").toLowerCase();
//     const isNofollow = rel.includes("nofollow");
//     const linkUrl = href?.trim() || "#";
//     const isInternal = linkUrl.startsWith("/") || linkUrl.includes(baseDomain);
//     const followType = isNofollow ? "nofollow" : "dofollow";
//     const linkData = {
//       url: linkUrl,
//       followType,
//     };
//     if (isInternal) {
//       internalLinks.push(linkData);
//     } else {
//       externalLinks.push(linkData);
//     }
//     if (isNofollow) nofollowCount++;
//   });
//   return {
//     totalLinks: links.length,
//     internalLinksCount: internalLinks.length,
//     externalLinksCount: externalLinks.length,
//     nofollowLinksCount: nofollowCount,
//     internalLinks,
//     externalLinks,
//   };
// };
const LinkAnalyzer = (pageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    // const response = await axios.get(pageUrl);
    // const html = response.data;
    // const $ = cheerio.load(html);
    // const links = $("a");
    // let internalLinks: any[] = [];
    // let externalLinks: any[] = [];
    // let nofollowCount = 0;
    // const baseDomain = new URL(pageUrl).hostname;
    // links.each((i, link) => {
    //   const href = $(link).attr("href");
    //   const rel = ($(link).attr("rel") || "").toLowerCase();
    //   const isNofollow = rel.includes("nofollow");
    //   const linkUrl = href?.trim() || "#";
    //   const isInternal = linkUrl.startsWith("/") || linkUrl.includes(baseDomain);
    //   const followType = isNofollow ? "nofollow" : "dofollow";
    //   const linkData = {
    //     url: linkUrl,
    //     followType,
    //   };
    //   if (isInternal) {
    //     internalLinks.push(linkData);
    //   } else {
    //     externalLinks.push(linkData);
    //   }
    //   if (isNofollow) nofollowCount++;
    // });
    // return {
    //   totalLinks: links.length,
    //   internalLinksCount: internalLinks.length,
    //   externalLinksCount: externalLinks.length,
    //   nofollowLinksCount: nofollowCount,
    //   internalLinks,
    //   externalLinks,
    // };
});
//===============================
const stopWords = new Set([
    "the",
    "and",
    "for",
    "you",
    "your",
    "with",
    "that",
    "this",
    "from",
    "are",
    "was",
    "were",
    "will",
    "has",
    "have",
    "had",
    "not",
    "but",
    "they",
    "their",
    "about",
    "what",
    "how",
    "can",
    "all",
    "also",
    "into",
    "more",
    "when",
    "why",
    "who",
    "whose",
    "which",
    "our",
    "out",
    "any",
    "each",
    "been",
    "its",
    "just",
]);
const KeywordDensity = (url) => __awaiter(void 0, void 0, void 0, function* () {
    // const response = await axios.get(url);
    // const $ = cheerio.load(response.data);
    // $("script, style, noscript").remove();
    // const text = $("body").text().replace(/\s+/g, " ").toLowerCase();
    // const words = text.match(/\b[a-z]{2,}\b/g) || [];
    // const totalKeywords = words.length;
    // const wordMap: Record<string, number> = {};
    // for (const word of words) {
    //   if (!stopWords.has(word)) {
    //     wordMap[word] = (wordMap[word] || 0) + 1;
    //   }
    // }
    // const keywords = Object.entries(wordMap)
    //   .sort((a, b) => b[1] - a[1])
    //   .slice(0, 100)
    //   .map(([keyword, count]) => ({
    //     keyword,
    //     count,
    //     percentage: parseFloat(((count / totalKeywords) * 100).toFixed(2)),
    //   }));
    // return {
    //   totalKeywords,
    //   keywords,
    // };
});
//===========================
// const GOOGLE_API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
// const checkMalwareWithGoogle = async (url: string) => {
//   const requestBody = {
//     client: {
//       clientId: "tools-box",
//       clientVersion: "1.0",
//     },
//     threatInfo: {
//       threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
//       platformTypes: ["ANY_PLATFORM"],
//       threatEntryTypes: ["URL"],
//       threatEntries: [{ url }],
//     },
//   };
//   const response = await axios.post(
//     `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_API_KEY}`,
//     requestBody,
//     { headers: { "Content-Type": "application/json" } }
//   );
//   console.log('response', response?.data)
//   const threats = response.data?.matches || [];
//   return {
//     url,
//     isMalicious: threats.length > 0,
//     threats: threats.map((t: any) => ({
//       threatType: t.threatType,
//       platformType: t.platformType,
//       threatEntryType: t.threatEntryType,
//     })),
//   };
// };
// ALTERNATIVE WITHOUT GOOGLE SAFE BROWSING API KEY
const checkMalwareWithGoogle = (url) => __awaiter(void 0, void 0, void 0, function* () {
    if (!url) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "URL is required");
    }
    const reportUrl = `https://transparencyreport.google.com/safe-browsing/search?url=${encodeURIComponent(url)}&hl=en`;
    return {
        reportUrl,
    };
});
//===================
//=================================
const DomainToIP = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cleanDomain = (0, extractHostName_1.extractHostname)(domain);
        const { address } = yield promises_1.default.lookup(cleanDomain);
        // Use ip-api to get geolocation and ISP info
        const geoRes = yield axios_1.default.get(`http://ip-api.com/json/${address}`);
        const { country = "Unavailable", isp = "Unavailable" } = geoRes.data || {};
        return {
            domain,
            ip: address,
            country,
            isp,
        };
    }
    catch (error) {
        throw new Error("Failed to fetch domain info. Please check the domain name.");
    }
});
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return false;
    }
};
const ServerStatusChecker = (urlsInput) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const urls = urlsInput
        .split("\n")
        .map((url) => url.trim())
        .filter((url) => url && isValidUrl(url));
    const results = [];
    for (const url of urls) {
        const start = Date.now();
        try {
            const response = yield axios_1.default.get(url, { timeout: 5000 });
            const time = ((Date.now() - start) / 1000).toFixed(2);
            results.push({
                url,
                httpCode: response.status,
                responseTime: `${time} Sec`,
                status: "Online",
            });
        }
        catch (err) {
            results.push({
                url,
                httpCode: ((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status) || null,
                responseTime: null,
                status: "Offline",
            });
        }
    }
    return results;
});
//==========================
const PageSizeChecker = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url, {
            responseType: "arraybuffer",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                Accept: "*/*",
            },
            timeout: 10000,
        });
        const sizeInBytes = Buffer.byteLength(response.data);
        const sizeInKB = (sizeInBytes / 1024).toFixed(2);
        return {
            url,
            pageSizeBytes: sizeInBytes,
            pageSizeKB: `${sizeInKB} KB`,
        };
    }
    catch (error) {
        console.error("Page fetch error:", error.message);
        throw new Error("Error fetching the details");
    }
});
//=================================
const BlacklistLookup = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ips = yield promises_1.default.resolve4(domain);
        const ip = ips[0];
        const result = yield (0, dnsblCheck_1.checkBlacklist)(ip);
        return {
            domain,
            ip: result.ip,
            overall: result.overall,
            statusList: result.blacklistStatus,
        };
    }
    catch (error) {
        throw new Error(" Failed Check Domain lookup");
    }
});
//==============================
const checkSuspiciousDomains = (urlList) => __awaiter(void 0, void 0, void 0, function* () {
    if (urlList.length === 0 || urlList.length > 20) {
        throw new Error("You must provide 1 to 20 URLs.");
    }
    const results = yield Promise.all(urlList.map((url) => (0, suspiciousCheck_1.checkIfDomainIsSuspicious)(url.trim())));
    return results;
});
//==========================
/**
 * Example Postman payload for multiple URLs:
 *
 * {
 *   "urls": [
 *     "https://viserx.com/",
 *     "https://example.com/"
 *   ]
 * }
 *
 * Or for a single URL (backward compatible):
 * {
 *   "url": "https://viserx.com/"
 * }
 *
 * This function supports up to 20 URLs at a time and returns results in the following format:
 * [
 *   {
 *     "url": "https://viserx.com/",
 *     "code": "113.72 KB",
 *     "text": "5.3 KB",
 *     "ratio": "5%"
 *   },
 *   ...
 * ]
 */
const CodeToCheckTextRatio = (input) => __awaiter(void 0, void 0, void 0, function* () {
    // Helper to format bytes to KB with 2 decimals
    const formatKB = (bytes) => `${(bytes / 1024).toFixed(2)} KB`;
    // Helper to extract visible text from HTML (removes scripts, styles, comments, etc.)
    function extractVisibleText(html) {
        const cheerio = require('cheerio');
        const $ = cheerio.load(html);
        // Remove script, style, noscript, iframe, and head tags
        $('script, style, noscript, iframe, head, meta, link, [aria-hidden="true"]').remove();
        // Remove comments
        $('*').contents().each(function () {
            if (this.type === 'comment')
                $(this).remove();
        });
        // Get visible text
        let text = $('body').text();
        // Clean up whitespace
        text = text.replace(/\s+/g, ' ').trim();
        return text;
    }
    // Accepts either { url } or { urls }
    let urlList = [];
    if (input.urls && Array.isArray(input.urls)) {
        urlList = input.urls;
    }
    else if (input.url && typeof input.url === 'string') {
        urlList = [input.url];
    }
    if (urlList.length === 0 || urlList.length > 20) {
        throw new Error("You must provide 1 to 20 URLs.");
    }
    // Process all URLs in parallel
    const results = yield Promise.all(urlList.map((url) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(url, { timeout: 15000, headers: { 'User-Agent': 'Mozilla/5.0' } });
            const html = response.data;
            const totalHtmlSize = Buffer.byteLength(html);
            const visibleText = extractVisibleText(html);
            const textSize = Buffer.byteLength(visibleText);
            // Format as KB for output
            const codeKB = formatKB(totalHtmlSize);
            const textKB = formatKB(textSize);
            // Calculate ratio as integer percent (like "5%")
            const ratio = totalHtmlSize > 0 ? Math.round((textSize / totalHtmlSize) * 100) : 0;
            return {
                url,
                code: codeKB,
                text: textKB,
                ratio: `${ratio}%`
            };
        }
        catch (error) {
            return {
                url,
                error: "Failed to fetch or parse the HTML."
            };
        }
    })));
    return results;
});
//=============================
const LinkCountChecker = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url);
        const html = response.data;
        const { total, internal, external } = (0, parseLinks_1.parseLinks)(html, url);
        return {
            url,
            totalLinks: total,
            internalLinks: internal,
            externalLinks: external,
        };
    }
    catch (error) {
        throw new Error("Failed to fetch or parse the page.");
    }
});
//=======================================================================
const EmailPrivacycheck = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url);
        const html = response.data;
        const emails = (0, extractEmails_1.extractEmails)(html);
        return {
            status: emails.length > 0 ? "Email Found!" : "No Email Found",
            emails,
            total: emails.length,
        };
    }
    catch (error) {
        throw new Error("Failed to fetch page or extract emails.");
    }
});
//===============================
const MetaTagAnalyze = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const response = await axios.get(url);
        // const html = response.data;
        // const parsed = parseMetaTags(html);
        // return {
        //   url,
        //   metaTitle: parsed.title,
        //   metaTitleLength: parsed.titleLength,
        //   metaDescription: parsed.description,
        //   metaDescriptionLength: parsed.descriptionLength,
        //   metaKeywords: parsed.keywords,
        //   metaViewport: parsed.viewport,
        //   openGraph: parsed.ogTags,
        // };
    }
    catch (error) {
        throw new Error("Failed to fetch or analyze meta tags.");
    }
});
//======================================
const searchEngineSpiderSimulator = (url) => __awaiter(void 0, void 0, void 0, function* () {
    // const { data: html } = await axios.get(url);
    // const $ = cheerio.load(html);
    // // Meta
    // const meta = {
    //   title: $("title").text() || null,
    //   description: $('meta[name="description"]').attr("content") || null,
    //   keywords: $('meta[name="keywords"]').attr("content") || null,
    // };
    // // Headings
    // const headings = {
    //   h1: $("h1")
    //     .map((i, el) => $(el).text().trim())
    //     .get(),
    //   h2: $("h2")
    //     .map((i, el) => $(el).text().trim())
    //     .get(),
    //   h3: $("h3")
    //     .map((i, el) => $(el).text().trim())
    //     .get(),
    //   h4: $("h4")
    //     .map((i, el) => $(el).text().trim())
    //     .get(),
    // };
    // // Indexable Links (internal only)
    // const links = $("a")
    //   .map((i, el) => $(el).attr("href"))
    //   .get()
    //   .filter((link) => typeof link === "string" && link.startsWith("/"));
    // // Readable text
    // const textContent = $("body")
    //   .text()
    //   .replace(/\s+/g, " ")
    //   .trim()
    //   .slice(0, 500);
    // return {
    //   meta,
    //   headings,
    //   indexableLinks: [...new Set(links)],
    //   textContent,
    //   sourceCode: html.slice(0, 1000) + "...", // trimmed source
    // };
});
//=======================================================
const checkGoogleCache = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const encodedUrl = encodeURIComponent(url);
    const cacheUrl = `https://webcache.googleusercontent.com/search?q=cache:${encodedUrl}`;
    try {
        // const { data } = await axios.get(cacheUrl);
        // const $ = cheerio.load(data);
        // const bannerText = $("body").text();
        // const dateMatch = bannerText.match(
        //   /This is Google's cache of (.*?) It is a snapshot of the page as it appeared on (.*?)(\.)/i
        // );
        // const date = dateMatch ? dateMatch[2].trim() : null;
        // return {
        //   url,
        //   status: "Cached",
        //   cachedUrl: cacheUrl,
        //   cachedDate: date,
        // };
    }
    catch (err) {
        return {
            url,
            status: "Not Cached",
            cachedUrl: null,
            cachedDate: null,
        };
    }
});
//==========================================
const getBrowserInfo = (req) => {
    // const headers = req.headers as Record<string, string | undefined>;
    // const ua = headers["user-agent"] || "";
    // const agent = useragent.parse(ua);
    // return {
    //   browser: agent.family,
    //   version: agent.toVersion(),
    //   os: agent.os.toString(),
    //   userAgent: ua,
    // };
};
//============================================
const findDNSRecords = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    domain = domain.replace(/(^\w+:|^)\/\//, "");
    domain = domain.replace(/\/$/, "");
    const types = ["A", "NS", "SOA", "MX", "TXT", "CNAME", "AAAA"];
    const results = {};
    for (const type of types) {
        try {
            const records = yield promises_1.default.resolve(domain, type);
            results[type] = records;
        }
        catch (err) {
            results[type] = `No records found or error: ${err.message}`;
        }
    }
    return results;
});
//===================================
const generateMD5 = (text) => {
    return crypto_1.default.createHash("md5").update(text).digest("hex");
};
//======================================
const getClassCInfo = (domains) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield Promise.all(domains.map((domain) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cleanDomain = domain
                .replace(/(^\w+:|^)\/\//, "")
                .replace(/\/$/, "");
            const addresses = yield promises_1.default.resolve4(cleanDomain);
            const ip = addresses[0];
            const classC = ip.split(".").slice(0, 3).join(".");
            return {
                host: cleanDomain,
                ip,
                classC,
            };
        }
        catch (error) {
            return {
                host: domain,
                ip: null,
                classC: null,
                error: error.message || "DNS resolve error",
            };
        }
    })));
    return results;
});
//==================================
const getGoogleIndexedPages = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://www.google.com/search?q=site:${domain}`;
    try {
        // const response = await axios.get(url, {
        //   headers: {
        //     "User-Agent": "Mozilla/5.0",
        //   },
        // });
        // console.log('response', response?.data)
        // const $ = cheerio.load(response.data);
        // const resultText = $("#result-stats").text();
        // const match = resultText.match(/([0-9,.]+)/);
        // if (match && match[1]) {
        //   const count = parseInt(match[1].replace(/,/g, ""));
        //   return count;
        // }
        return 0;
    }
    catch (error) {
        throw new Error("Google index failed or fail to scrap");
    }
});
//=====================================
const fetchPageSource = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0",
            },
        });
        return response.data; // full HTML source code
    }
    catch (error) {
        throw new Error("Source কোড পাওয়া যায়নি অথবা URL ভুল");
    }
});
//======================================
const rewriteUrl = (inputUrl) => {
    try {
        const parsedUrl = new URL(inputUrl);
        const pathname = parsedUrl.pathname; // e.g., /tools/url-rewriting-tools/detail
        const query = parsedUrl.searchParams; // e.g., id=31
        const id = query.get("id");
        if (!id) {
            throw new Error("URL এর মধ্যে কোনো id পাওয়া যায়নি।");
        }
        const base = `${parsedUrl.origin}${pathname}`;
        const type1 = `${base}-id-${id}.htm`;
        const type2 = `${base}/id/${id}/`;
        return {
            original: inputUrl,
            rewritten: {
                type1,
                type2,
            },
            htaccessRules: {
                type1: `RewriteRule detail-id-(.*)\\.htm$ detail?id=$1`,
                type2: `RewriteRule detail/id/(.*)/ detail?id=$1`,
            },
        };
    }
    catch (error) {
        throw new Error("URL টি ভুল ফরম্যাটে রয়েছে বা আইডি মিসিং।");
    }
};
const generateRobotsTxt = (options) => {
    const lines = [];
    if (options.sitemapUrl) {
        lines.push(`Sitemap: ${options.sitemapUrl}`);
    }
    lines.push(`User-agent: *`);
    lines.push(`${options.isAllowAll ? "Allow: /" : "Disallow:"}`);
    if (options.restrictedDirs.length > 0) {
        options.restrictedDirs.forEach((dir) => {
            lines.push(`Disallow: ${dir}`);
        });
    }
    if (options.crawlDelay !== undefined) {
        lines.push(`Crawl-delay: ${options.crawlDelay}`);
    }
    // Add custom bot rules
    options.botRules.forEach(({ bot, rule }) => {
        if (rule !== "Same as Default") {
            lines.push(`\nUser-agent: ${bot}`);
            lines.push(`${rule}: /`);
        }
    });
    return lines.join("\n");
};
const generateSitemapXML = (urls) => {
    const now = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const xmlParts = [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ];
    urls.forEach((url) => {
        var _a, _b, _c;
        xmlParts.push(`<url>`);
        xmlParts.push(`<loc>${url.loc}</loc>`);
        xmlParts.push(`<priority>${(_a = url.priority) !== null && _a !== void 0 ? _a : 0.1}</priority>`);
        xmlParts.push(`<changefreq>${(_b = url.changefreq) !== null && _b !== void 0 ? _b : "always"}</changefreq>`);
        xmlParts.push(`<lastmod>${(_c = url.lastmod) !== null && _c !== void 0 ? _c : now}</lastmod>`);
        xmlParts.push(`</url>`);
    });
    xmlParts.push(`</urlset>`);
    return xmlParts.join("\n");
};
//=============================================
// broken: true means statusCode 403 ==> Status = Okay hobe
// broken: false means statusCode 200 ==> Status = Okay hobe
const checkBrokenLink = (url) => __awaiter(void 0, void 0, void 0, function* () {
    // return new Promise((resolve, reject) => {
    //   const results: Array<{
    //     url: string;
    //     broken: boolean;
    //     statusCode: number | null;
    //   }> = [];
    //   const checker = new HtmlUrlChecker(
    //     {},
    //     {
    //       link: (result) => {
    //         results.push({
    //           url: result.url.resolved,
    //           broken: result.broken,
    //           statusCode: result.http?.statusCode || null,
    //         });
    //       },
    //       end: () => {
    //         resolve(results);
    //       },
    //       error: (error: any) => {
    //         reject(error);
    //       },
    //     }
    //   );
    //   checker.enqueue(url, {});
    // });
});
//===============================================================
/**
 * Domain age checker
 * @param domain string
 * @returns age and registration date
 */
const checkWhois = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const result = await whoisJson(domain);
        // console.log("result", result);
        // // example: result.createdDate = "2018-05-10T00:00:00.000Z"
        // const createdAt = result?.createdDate ? new Date(result.createdDate) : null;
        // const ageInYears = createdAt
        //   ? differenceInYears(new Date(), createdAt)
        //   : null;
        // return {
        //   domain,
        //   createdAt: createdAt ? createdAt.toISOString() : null,
        //   ageInYears,
        // };
    }
    catch (error) {
        console.error("WHOIS Error:", error.message);
        throw new Error("Domain information fetch failed");
    }
});
//=========================================================
/**
 * Domain age checker
 * @param domain string
 * @returns age and registration date
 */
const checkDomainAge = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const result = await whoisJson(domain);
        // console.log("result", result);
        // // example: result.createdDate = "2018-05-10T00:00:00.000Z"
        // const createdAt = result?.createdDate ? new Date(result.createdDate) : null;
        // const ageInYears = createdAt
        //   ? differenceInYears(new Date(), createdAt)
        //   : null;
        // return {
        //   domain,
        //   createdAt: createdAt ? createdAt.toISOString() : null,
        //   ageInYears,
        // };
    }
    catch (error) {
        console.error("WHOIS Error:", error.message);
        throw new Error("Domain information fetch failed");
    }
});
exports.ToolsService = {
    BacklinkMaker,
    LinkAnalyzer,
    KeywordDensity,
    checkMalwareWithGoogle,
    DomainToIP,
    ServerStatusChecker,
    PageSizeChecker,
    BlacklistLookup,
    checkSuspiciousDomains,
    CodeToCheckTextRatio,
    LinkCountChecker,
    EmailPrivacycheck,
    MetaTagAnalyze,
    searchEngineSpiderSimulator,
    checkGoogleCache,
    getBrowserInfo,
    findDNSRecords,
    generateMD5,
    getClassCInfo,
    getGoogleIndexedPages,
    fetchPageSource,
    rewriteUrl,
    generateRobotsTxt,
    generateSitemapXML,
    checkPlagiarism,
    checkBrokenLink,
    checkWhois,
    checkDomainAge,
};
