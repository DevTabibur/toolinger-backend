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
exports.DAPAHelpers = void 0;
const promises_1 = __importDefault(require("dns/promises"));
// import * as cheerio from "cheerio";
const normalizeDomain = (domain) => {
    // Remove protocol and trailing slash
    let d = domain.trim();
    if (d.startsWith("http://"))
        d = d.slice(7);
    if (d.startsWith("https://"))
        d = d.slice(8);
    d = d.replace(/\/+$/, "");
    return d;
};
const getIpAddress = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Only use the hostname part for DNS lookup
        const hostname = normalizeDomain(domain);
        const addresses = yield promises_1.default.lookup(hostname);
        console.log("addresses", addresses);
        return addresses.address;
    }
    catch (_a) {
        return null;
    }
});
const getPagesInGoogle = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // // Use only the hostname for Google search
        // const hostname = normalizeDomain(domain);
        // const { data } = await axios.get(
        //     `https://www.google.com/search?q=site:${encodeURIComponent(hostname)}`,
        //     {
        //         headers: {
        //             "User-Agent":
        //                 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        //         },
        //         timeout: 10000,
        //     }
        // );
        // const $ = cheerio.load(data);
        // // Try to extract the result stats text
        // let statsText =
        //     $('#result-stats').text() ||
        //     $('div#result-stats').text() ||
        //     $("div:contains('About')").first().text();
        // if (!statsText) {
        //     // Try to find any element containing "results"
        //     statsText = $("body").text();
        // }
        // // Example: "About 1,230 results (0.32 seconds)"
        // const match = statsText.match(/About ([\d,]+)/i) || statsText.match(/([\d,]+) results/i);
        // if (match && match[1]) {
        //     return parseInt(match[1].replace(/,/g, ""), 10);
        // }
        return 0;
    }
    catch (_a) {
        return 0;
    }
});
const getDaPa = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // // Prepostseo expects only the hostname, not protocol
        // const hostname = normalizeDomain(domain);
        // const { data } = await axios.post(
        //     "https://www.prepostseo.com/frontend/tools/domain-authority-checker",
        //     new URLSearchParams({ domains: hostname }),
        //     {
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        //             "User-Agent":
        //                 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        //             "Origin": "https://www.prepostseo.com",
        //             "Referer": "https://www.prepostseo.com/domain-authority-checker",
        //             "X-Requested-With": "XMLHttpRequest",
        //         },
        //         timeout: 15000,
        //     }
        // );
        // const $ = cheerio.load(data);
        // let da: number | null = null, pa: number | null = null;
        // $("table tbody tr").each((i, el) => {
        //     const tds = $(el).find("td");
        //     const d = $(tds[0]).text().trim();
        //     if (d === hostname) {
        //         da = parseInt($(tds[1]).text().trim(), 10);
        //         pa = parseInt($(tds[2]).text().trim(), 10);
        //     }
        // });
        // // Fallback: try to find any numbers in the table
        // if (da === null || pa === null) {
        //     const numbers = $("table tbody tr td")
        //         .map((i, el) => parseInt($(el).text().trim(), 10))
        //         .get()
        //         .filter((n) => !isNaN(n));
        //     if (numbers.length >= 2) {
        //         da = numbers[0];
        //         pa = numbers[1];
        //     }
        // }
        // return {
        //     da: typeof da === "number" && !isNaN(da) ? da : null,
        //     pa: typeof pa === "number" && !isNaN(pa) ? pa : null,
        // };
    }
    catch (_a) {
        return { da: null, pa: null };
    }
});
exports.DAPAHelpers = {
    normalizeDomain, getIpAddress, getPagesInGoogle, getDaPa
};
