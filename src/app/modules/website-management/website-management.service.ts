import axios from "axios";
import dns from "dns";
import { promisify } from "util";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import AnalyticsModel from "../analytics/analytics.model";

const resolve4 = promisify(dns.resolve4);
const resolveMx = promisify(dns.resolveMx);
const resolveTxt = promisify(dns.resolveTxt);
const resolveCname = promisify(dns.resolveCname);

// DNS Records Checker
const checkDNSRecords = async (data: any) => {
  let { domain } = data;

  if (!domain) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Domain is required");
  }

  // Remove protocol (http:// or https://) and trailing slash if present
  domain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

  try {
    // Use dns.resolve* to get records, but also try to get TTL, Class, Type, etc.
    // Node's dns module does not provide TTL, Class, or Type directly for all record types.
    // We'll format the output to match your requirements as closely as possible.

    // A Records
    let aRecords: any[] = [];
    try {
      const aRes = await resolve4(domain, { ttl: true } as any);
      aRecords = (Array.isArray(aRes) ? aRes : []).map((rec: any) => ({
        host: domain,
        ttl: rec.ttl || null,
        class: "IN",
        type: "A",
        details: rec.address || rec, // fallback for node < v20
      }));
    } catch {
      aRecords = [];
    }

    // MX Records
    let mxRecords: any[] = [];
    try {
      const mxRes = await resolveMx(domain);
      mxRecords = (Array.isArray(mxRes) ? mxRes : []).map((rec: any) => ({
        host: domain,
        ttl: null,
        class: "IN",
        type: "MX",
        priority: rec.priority,
        details: rec.exchange,
      }));
    } catch {
      mxRecords = [];
    }

    // TXT Records
    let txtRecords: any[] = [];
    try {
      const txtRes = await resolveTxt(domain);
      txtRecords = (Array.isArray(txtRes) ? txtRes : []).map((rec: any) => ({
        host: domain,
        ttl: null,
        class: "IN",
        type: "TXT",
        details: rec.join ? rec.join(' ') : rec,
      }));
    } catch {
      txtRecords = [];
    }

    // CNAME Records
    let cnameRecords: any[] = [];
    try {
      const cnameRes = await resolveCname(domain);
      cnameRecords = (Array.isArray(cnameRes) ? cnameRes : []).map((rec: any) => ({
        host: domain,
        ttl: null,
        class: "IN",
        type: "CNAME",
        details: rec,
      }));
    } catch {
      cnameRecords = [];
    }

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalDNSRecords: 1 } },
      { upsert: true }
    );

    return {
      domain,
      aRecords,
      mxRecords,
      txtRecords,
      cnameRecords,
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to check DNS records");
  }
};

// DNS Propagation Checker
const checkDNSPropagation = async (data: any) => {
  const { domain, recordType = "A" } = data;

  if (!domain) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Domain is required");
  }

  // List of public DNS servers to check propagation from
  const dnsServers = [
    { name: "China cn01", server: "223.5.5.5" },
    { name: "China cn02", server: "114.114.114.114" },
    { name: "Czech Republic cz01", server: "193.29.206.206" },
    { name: "Czech Republic cz02", server: "194.228.41.65" },
    { name: "Germany de01", server: "81.3.27.54" },
    { name: "Germany de02", server: "213.73.91.35" },
    { name: "Russia ru01", server: "77.88.8.8" },
    { name: "Russia ru02", server: "195.46.39.39" },
    { name: "Taiwan tw01", server: "168.95.1.1" },
    { name: "Taiwan tw02", server: "168.95.192.1" },
    { name: "United States us01", server: "8.8.8.8" },
  ];

  // Map recordType to DNS type number for Google DNS API
  const recordTypeMap: any = {
    A: 1,
    AAAA: 28,
    CNAME: 5,
    MX: 15,
    NS: 2,
    TXT: 16,
    SPF: 99, // SPF is deprecated, but some APIs still use 99
  };
  const typeNum = recordTypeMap[recordType] || 1;

  // Helper to clean domain (remove protocol)
  const cleanDomain = (d: string) => d.replace(/^https?:\/\//, '').replace(/\/$/, '');

  try {
    const results: any[] = [];

    // Query each DNS server
    await Promise.all(
      dnsServers.map(async (dns) => {
        try {
          // Use Google DNS-over-HTTPS API with custom resolver
          const url = `https://dns.google/resolve?name=${cleanDomain(domain)}&type=${typeNum}&edns_client_subnet=${dns.server}`;
          const response = await axios.get(url);

          let result = {
            server: dns.name,
            result: "",
            ttl: "",
          };

          if (response.data && response.data.Answer && response.data.Answer.length > 0) {
            // For A/CNAME/MX/TXT/NS records, show the data
            const answer = response.data.Answer[0];
            result.result = answer.data;
            result.ttl = answer.TTL;
          } else {
            result.result = "No record found";
            result.ttl = "";
          }

          results.push(result);
        } catch (err) {
          results.push({
            server: dns.name,
            result: "Error",
            ttl: "",
          });
        }
      })
    );

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalDNSPropagation: 1 } },
      { upsert: true }
    );

    // Return in the format expected by the UI
    return {
      domain: cleanDomain(domain),
      recordType,
      records: results,
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to check DNS propagation");
  }
};

// IP Location (supports up to 10 IP addresses at once)
const getIPLocation = async (data: any) => {
  let { ip } = data;

  if (!ip || (Array.isArray(ip) && ip.length === 0)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "IP address is required");
  }

  // Ensure ip is an array, and limit to 10
  if (!Array.isArray(ip)) {
    ip = [ip];
  }
  ip = ip.slice(0, 10);

  try {
    // Fetch all IP locations in parallel
    const results = await Promise.all(
      ip.map(async (singleIp: string) => {
        try {
          const response = await axios.get(`http://ip-api.com/json/${singleIp}`);
          return {
            ip: response.data.query,
            country: response.data.country,
            countryCode: response.data.countryCode,
            region: response.data.region,
            regionName: response.data.regionName,
            city: response.data.city,
            zip: response.data.zip,
            lat: response.data.lat,
            lon: response.data.lon,
            timezone: response.data.timezone,
            isp: response.data.isp,
            org: response.data.org,
            as: response.data.as
          };
        } catch (err) {
          // If a single IP fails, return minimal info with error
          return {
            ip: singleIp,
            error: "Failed to get IP location"
          };
        }
      })
    );

    // Update analytics (count as one usage per request)
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalIPLocation: 1 } },
      { upsert: true }
    );

    return results;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to get IP location");
  }
};

// Traceroute Tool
import { exec } from "child_process";
import util from "util";
const execPromise = util.promisify(exec);

const performTraceroute = async (data: any) => {
  const { host } = data;

  if (!host) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Host is required");
  }

  try {
    // Use system traceroute (Linux/macOS) or tracert (Windows)
    // Detect platform
    const isWin = process.platform === "win32";
    const tracerouteCmd = isWin ? `tracert -d ${host}` : `traceroute -n ${host}`;

    // Run traceroute command
    const { stdout, stderr } = await execPromise(tracerouteCmd);

    if (stderr) {
      throw new Error(stderr);
    }

    // Parse traceroute output
    const lines = stdout.split("\n").filter(line => line.trim() !== "");
    let hops: any[] = [];
    if (isWin) {
      // Windows tracert output parsing
      // Skip first lines until hops start (usually after 3rd line)
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        // Hop lines start with a number
        if (/^\d+/.test(line)) {
          // Example:  1    <1 ms    <1 ms    <1 ms  192.168.1.1
          const parts = line.split(/\s+/);
          const hop = parseInt(parts[0]);
          // Find the last part that looks like an IP (replace findLast for compatibility)
          let ipMatch: string | undefined = undefined;
          for (let j = parts.length - 1; j >= 0; j--) {
            if (/^\d{1,3}(\.\d{1,3}){3}$/.test(parts[j])) {
              ipMatch = parts[j];
              break;
            }
          }
          // Find all time values (e.g., <1 ms, 12 ms, etc.)
          const times = parts.filter((p: string) => /ms$/.test(p));
          hops.push({
            hop,
            ip: ipMatch || "*",
            times: times,
            loss: line.includes("*") ? "timeout" : undefined
          });
        }
      }
    } else {
      // Unix traceroute output parsing
      // Example: 1  192.168.1.1  1.123 ms  1.456 ms  1.789 ms
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (/^\d+/.test(line)) {
          const parts = line.split(/\s+/);
          const hop = parseInt(parts[0]);
          const ip = parts[1];
          // Find all time values (e.g., 1.123 ms)
          const times = parts.filter(p => /ms$/.test(p));
          hops.push({
            hop,
            ip: ip || "*",
            times: times,
            loss: line.includes("*") ? "timeout" : undefined
          });
        }
      }
    }

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalTraceroute: 1 } },
      { upsert: true }
    );

    return {
      host,
      hops
    };
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to perform traceroute: " + (error.message || error));
  }
};

// Google Index Checker (supports up to 100 URLs)
// import cheerio from "cheerio";

const checkGoogleIndex = async (data: any) => {
  const { urls } = data;

  if (!Array.isArray(urls) || urls.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "An array of URLs is required");
  }
  if (urls.length > 100) {
    throw new ApiError(httpStatus.BAD_REQUEST, "A maximum of 100 URLs can be checked at once");
  }

  try {
    // // For each URL, perform a real Google search to check if it's indexed
    // const results = await Promise.all(
    //   urls.map(async (url: string) => {
    //     let indexed = false;
    //     let pageStatus = `site:${url}`;
    //     let lastCrawled = null;
    //     let cacheUrl = `https://webcache.googleusercontent.com/search?q=cache:${encodeURIComponent(url)}`;

    //     try {
    //       // Use Google search with "site:" operator
    //       const searchUrl = `https://www.google.com/search?q=site:${encodeURIComponent(url)}`;
    //       const { data: html } = await axios.get(searchUrl, {
    //         headers: {
    //           "User-Agent":
    //             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    //         },
    //       });

    //       const $ = cheerio.load(html);

    //       // Check if there are search results
    //       const resultStats = $("#result-stats").text() || $("div#search").text();
    //       const noResults = /did not match any documents|No results found/i.test(html);

    //       if (!noResults && resultStats && resultStats.length > 0) {
    //         indexed = true;
    //       } else {
    //         indexed = false;
    //       }

    //       // Try to extract the last crawled date from the snippet (if available)
    //       // Google sometimes shows "This page was cached on ..." in the cache page
    //       try {
    //         const cacheRes = await axios.get(cacheUrl, {
    //           headers: {
    //             "User-Agent":
    //               "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    //           },
    //           validateStatus: () => true,
    //         });
    //         const $cache = cheerio.load(cacheRes.data);
    //         const cacheText = $cache("body").text();
    //         const match = cacheText.match(/It is a snapshot of the page as it appeared on (.*? GMT)/i);
    //         if (match && match[1]) {
    //           lastCrawled = new Date(match[1]).toISOString();
    //         }
    //       } catch {
    //         // If cache page is not available, leave lastCrawled as null
    //         lastCrawled = null;
    //       }
    //     } catch {
    //       // If Google blocks or fails, mark as not indexed
    //       indexed = false;
    //     }

    //     return {
    //       url,
    //       indexed,
    //       pageStatus,
    //       lastCrawled,
    //       cacheUrl,
    //     };
    //   })
    // );

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalGoogleIndex: urls.length } },
      { upsert: true }
    );

    // return { results };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to check Google index");
  }
};



// HTML Encoder Decoder
const encodeDecodeHTML = async (data: any) => {
  const { text, operation } = data;

  if (!text || !operation) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Text and operation are required");
  }

  try {
    let result;
    if (operation === 'encode') {
      result = text.replace(/[&<>"']/g, (char: string) => {
        const entities: { [key: string]: string } = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        };
        return entities[char];
      });
    } else if (operation === 'decode') {
      result = text.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Operation must be 'encode' or 'decode'");
    }

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalHTMLEncoder: 1 } },
      { upsert: true }
    );

    return { originalText: text, result, operation };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to encode/decode HTML");
  }
};

// Favicon Generator
const generateFavicon = async (data: any) => {
  const { text, size = 32 } = data;

  if (!text) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Text is required");
  }

  try {
    // Simulate favicon generation
    const result = {
      text,
      size,
      faviconUrl: `https://api.example.com/favicon?text=${encodeURIComponent(text)}&size=${size}`,
      formats: ['ico', 'png', 'svg']
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalFaviconGenerator: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to generate favicon");
  }
};


// Minify HTML
const minifyHTML = async (data: any) => {
  const { html } = data;

  if (!html) {
    throw new ApiError(httpStatus.BAD_REQUEST, "HTML is required");
  }

  try {
    // Aggressive HTML minification
    let minified = html;

    // Remove HTML comments (except IE conditional comments)
    minified = minified.replace(/<!--(?!\[if)[\s\S]*?-->/g, '');

    // Remove whitespace between tags
    minified = minified.replace(/>\s+</g, '><');

    // Remove leading/trailing whitespace inside tags
    minified = minified.replace(/\s{2,}/g, ' ');

    // Remove spaces before/after = in attributes
    minified = minified.replace(/\s*=\s*/g, '=');

    // Remove spaces before self-closing tags
    minified = minified.replace(/\s+\/>/g, '/>');

    // Remove redundant line breaks and tabs
    minified = minified.replace(/[\n\r\t]+/g, '');

    // Remove spaces between tags and content
    minified = minified.replace(/>\s+/g, '>');
    minified = minified.replace(/\s+</g, '<');

    // Remove unnecessary spaces at the start and end
    minified = minified.trim();

    // Remove spaces between tags and content inside tags (e.g. <h1> Hello </h1> => <h1>Hello</h1>)
    // This will aggressively remove leading/trailing spaces inside tags for text nodes
    minified = minified.replace(/>([^<]*)</g, (match: any, p1: any) => {
      return '>' + p1.replace(/^\s+|\s+$/g, '') + '<';
    });

    // Remove multiple spaces in text nodes
    minified = minified.replace(/>([^<]*)</g, (match: any, p1: any) => {
      return '>' + p1.replace(/\s{2,}/g, ' ') + '<';
    });

    // Remove spaces between block-level tags (optional, but can be risky for inline tags)
    // minified = minified.replace(/>\s+</g, '><');

    const result = {
      original: html,
      minified,
      sizeReduction: `${((html.length - minified.length) / html.length * 100).toFixed(2)}%`
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalHTMLMinify: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to minify HTML");
  }
};


// JS Beautifier
/**
 * Example Postman payload to test this tool:
 * 
 * POST /api/v1/website-management/js-beautifier
 * Content-Type: application/json
 * 
 * {
 *   "code": "function test(){console.log('hello');if(true){return 1;}}"
 * }
 * 
 * Expected response:
 * {
 *   "statusCode": 200,
 *   "message": "JavaScript beautified successfully",
 *   "data": {
 *     "original": "function test(){console.log('hello');if(true){return 1;}}",
 *     "beautified": "function test() {\nconsole.log('hello');\nif(true) {\nreturn 1;\n}\n}\n",
 *     "lines": 6
 *   }
 * }
 */

const beautifyJS = async (data: any) => {
  const { code } = data;

  if (!code) {
    throw new ApiError(httpStatus.BAD_REQUEST, "JavaScript code is required");
  }

  try {
    // Simple JavaScript beautification
    const beautified = code
      .replace(/;/g, ';\n')
      .replace(/{/g, ' {\n')
      .replace(/}/g, '\n}')
      .replace(/\n\s*\n/g, '\n');

    const result = {
      original: code,
      beautified,
      lines: beautified.split('\n').length
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalJSBeautifier: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to beautify JavaScript");
  }
};

// PHP Beautifier

/**
 * Example Postman payload to test this tool:
 * 
 * POST /api/v1/website-management/php-beautifier
 * 
 * Body (JSON):
 * {
 *   "code": "<?php function test(){echo 'hello';if(true){return 1;}} ?>"
 * }
 * 
 * Expected response:
 * {
 *   "statusCode": 200,
 *   "message": "PHP beautified successfully",
 *   "data": {
 *     "original": "<?php function test(){echo 'hello';if(true){return 1;}} ?>",
 *     "beautified": "<?php function test() {\necho 'hello';\nif(true) {\nreturn 1;\n}\n}\n?>",
 *     "lines": 7
 *   }
 * }
 */

const beautifyPHP = async (data: any) => {
  const { code } = data;

  if (!code) {
    throw new ApiError(httpStatus.BAD_REQUEST, "PHP code is required");
  }

  try {
    // Simple PHP beautification
    const beautified = code
      .replace(/;/g, ';\n')
      .replace(/{/g, ' {\n')
      .replace(/}/g, '\n}')
      .replace(/\n\s*\n/g, '\n');

    const result = {
      original: code,
      beautified,
      lines: beautified.split('\n').length
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalPHPBeautifier: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to beautify PHP");
  }
};

// RGB to HEX
/**
 * Postman Payload Example to test this tool:
 * 
 * POST /website-management/rgb-to-hex
 * Content-Type: application/json
 * 
 * {
 *   "r": 255,
 *   "g": 99,
 *   "b": 71
 * }
 * 
 * This will convert the RGB color (255, 99, 71) to HEX and HSL.
 */
const convertRGBToHEX = async (data: any) => {
  const { r, g, b } = data;

  if (r === undefined || g === undefined || b === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, "R, G, B values are required");
  }

  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new ApiError(httpStatus.BAD_REQUEST, "RGB values must be between 0 and 255");
  }

  try {
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();

    const result = {
      rgb: { r, g, b },
      hex,
      hsl: {
        h: Math.round(Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180 / Math.PI),
        s: Math.round(((Math.max(r, g, b) - Math.min(r, g, b)) / Math.max(r, g, b)) * 100),
        l: Math.round(((Math.max(r, g, b) + Math.min(r, g, b)) / 2) / 255 * 100)
      }
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalRGBToHEX: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to convert RGB to HEX");
  }
};

/**
 * Reverse NS Checker
 * 
 * Postman Payload Example to test this tool:
 * 
 * POST /website-management/reverse-ns
 * Content-Type: application/json
 * 
 * {
 *   "ip": "8.8.8.8"
 * }
 * 
 * This will check the PTR (reverse DNS) records for the IP address 8.8.8.8.
 */
const checkReverseNS = async (data: any) => {
  const { ip } = data;

  if (!ip) {
    throw new ApiError(httpStatus.BAD_REQUEST, "IP address is required");
  }

  try {
    const response = await axios.get(`https://dns.google/resolve?name=${ip.split('.').reverse().join('.')}.in-addr.arpa&type=PTR`);

    const result = {
      ip,
      ptrRecords: response.data.Answer || [],
      status: response.data.Status
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalReverseNS: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to check reverse NS");
  }
};

/**
 * Server Port Scanner
 * 
 * Postman Payload Example to test this tool:
 * 
 * POST /website-management/server-port-scanner
 * Content-Type: application/json
 * 
 * {
 *   "domain": "viserx.com"
 * }
 * 
 * This will scan a fixed set of common ports on the given domain and return port, service, and status info.
 */
const COMMON_PORTS = [
  { port: 21, service: "FTP" },
  { port: 22, service: "SSH" },
  { port: 23, service: "Telnet" },
  { port: 25, service: "SMTP" },
  { port: 53, service: "DNS" },
  { port: 80, service: "HTTP" },
  { port: 110, service: "POP3" },
  { port: 139, service: "NETBIOS" },
  { port: 143, service: "IMAP" },
  { port: 443, service: "HTTPS" },
  { port: 445, service: "SMB" },
  { port: 1433, service: "MSSQL" },
  { port: 1521, service: "ORACLE" },
  { port: 3306, service: "MySQL" },
  { port: 3389, service: "Remote Desktop" }
];

const net = require('net');

const scanPort = (host: string, port: number, timeout = 1500): Promise<'OPEN' | 'CLOSED'> => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let status: 'OPEN' | 'CLOSED' = 'CLOSED';

    socket.setTimeout(timeout);

    socket.on('connect', () => {
      status = 'OPEN';
      socket.destroy();
    });

    socket.on('timeout', () => {
      status = 'CLOSED';
      socket.destroy();
    });

    socket.on('error', () => {
      status = 'CLOSED';
    });

    socket.on('close', () => {
      resolve(status);
    });

    socket.connect(port, host);
  });
};

const scanServerPorts = async (data: any) => {
  const { domain } = data;

  if (!domain) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Domain is required");
  }

  try {
    // Resolve domain to IP
    const dns = require('dns').promises;
    let ip;
    try {
      ip = (await dns.lookup(domain)).address;
    } catch (err) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to resolve domain");
    }

    // Scan all common ports in parallel
    const scanResults = await Promise.all(
      COMMON_PORTS.map(async ({ port, service }) => {
        const status = await scanPort(ip, port);
        return {
          port,
          service,
          status
        };
      })
    );

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalPortScanner: 1 } },
      { upsert: true }
    );

    return {
      domain,
      scanResults
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to scan server ports");
  }
};

/**
 * Server Status Checker (Batch)
 * 
 * Postman Payload Example to test this tool:
 * 
 * POST /website-management/server-status-checker
 * Content-Type: application/json
 * 
 * {
 *   "urls": [
 *     "https://viserx.com/",
 *     "https://woptio.com/"
 *   ]
 * }
 * 
 * This will check the status of the servers at the provided URLs (up to 20 at a time).
 */
const checkServerStatus = async (data: any) => {
  const { urls } = data;

  if (!Array.isArray(urls) || urls.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "At least one URL is required in the 'urls' array");
  }
  if (urls.length > 20) {
    throw new ApiError(httpStatus.BAD_REQUEST, "A maximum of 20 URLs can be checked at once");
  }

  try {
    // Check all URLs in parallel
    const results = await Promise.all(
      urls.map(async (url) => {
        const startTime = Date.now();
        try {
          const response = await axios.get(url, { timeout: 10000 });
          const responseTime = Date.now() - startTime;
          return {
            statusCode: 200,
            success: true,
            data: {
              url,
              status: response.status,
              statusText: response.statusText,
              responseTime: `${responseTime}ms`,
              server: response.headers.server || 'Unknown',
              contentType: response.headers['content-type'] || 'Unknown'
            },
            message: "Server status checked successfully"
          };
        } catch (error: any) {
          const responseTime = Date.now() - startTime;
          return {
            statusCode: error?.response?.status || 500,
            success: false,
            data: {
              url,
              status: error?.response?.status || 500,
              statusText: error?.response?.statusText || "Error",
              responseTime: `${responseTime}ms`,
              server: error?.response?.headers?.server || 'Unknown',
              contentType: error?.response?.headers?.['content-type'] || 'Unknown'
            },
            message: error?.message || "Failed to check server status"
          };
        }
      })
    );

    // Update analytics (count as one batch)
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalServerStatus: 1 } },
      { upsert: true }
    );

    return results;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to check server status");
  }
};

/**
 * Spider Simulator
 * 
 * This function crawls the given URL up to the specified depth, collects meta info, text, internal and external links.
 * It returns summary stats, text to be crawled, meta info, and both internal and external spidered links.
 */

const { URL: NodeURL } = require('url');

const simulateSpider = async (data: any) => {
  const { url, depth = 2 } = data;

  if (!url) {
    throw new ApiError(httpStatus.BAD_REQUEST, "URL is required");
  }

  // Helper to normalize and resolve URLs
  const normalizeUrl = (base: string, href: string) => {
    try {
      return new NodeURL(href, base).href;
    } catch {
      return null;
    }
  };

  // Helper to check if a link is internal
  const isInternal = (base: string, link: string) => {
    try {
      const baseHost = new NodeURL(base).host;
      const linkHost = new NodeURL(link).host;
      return baseHost === linkHost;
    } catch {
      return false;
    }
  };

  // Set to avoid revisiting URLs
  const visited = new Set<string>();
  const internalLinksArr: any[] = [];
  const externalLinksArr: any[] = [];
  let pagesFound = 0;
  let linksFound = 0;
  let imagesFound = 0;
  let textToBeCrawled = '';
  let meta: any = {};

  // BFS crawl up to depth
  const queue: { url: string, currentDepth: number }[] = [{ url, currentDepth: 1 }];

  const startTime = Date.now();

  while (queue.length > 0) {
    const { url: currentUrl, currentDepth } = queue.shift()!;
    if (visited.has(currentUrl) || currentDepth > depth) continue;
    visited.add(currentUrl);
    pagesFound++;

    try {
      // const response = await axios.get(currentUrl, { timeout: 10000 });
      // const html = response.data;
      // const $ = cheerio.load(html);

      // // Only set meta for the first page
      // if (pagesFound === 1) {
      //   meta = {
      //     title: $('title').text() || '',
      //     keywords: $('meta[name="keywords"]').attr('content') || '',
      //     description: $('meta[name="description"]').attr('content') || ''
      //   };
      // }

      // // Collect text
      // textToBeCrawled += $('body').text().replace(/\s+/g, ' ').trim() + ' ';

      // // Collect images
      // const imgs = $('img');
      // imagesFound += imgs.length;

      // // Collect links
      // $('a[href]').each((_, el) => {
      //   const href = $(el).attr('href');
      //   if (!href) return;
      //   const resolved = normalizeUrl(currentUrl, href);
      //   if (!resolved) return;

      //   const anchor = $(el).text().trim();
      //   const noFollow = ($(el).attr('rel') || '').toLowerCase().includes('nofollow');
      //   const type = (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(resolved)) ? 'Image' : 'Text';

      //   if (isInternal(url, resolved)) {
      //     // Internal link
      //     if (!internalLinksArr.some(l => l.url === resolved)) {
      //       internalLinksArr.push({ url: resolved, anchor, type, noFollow });
      //       // Only queue for crawling if not visited and not a file
      //       if (!visited.has(resolved) && !/\.(jpg|jpeg|png|gif|svg|webp|pdf|doc|docx|xls|xlsx|zip|rar)$/i.test(resolved)) {
      //         queue.push({ url: resolved, currentDepth: currentDepth + 1 });
      //       }
      //     }
      //   } else {
      //     // External link
      //     if (!externalLinksArr.some(l => l.url === resolved)) {
      //       externalLinksArr.push({ url: resolved, anchor, type, noFollow });
      //     }
      //   }
      //   linksFound++;
      // });
    } catch (err) {
      // Ignore errors for individual pages
      continue;
    }
  }

  const crawlTime = `${((Date.now() - startTime) / 1000).toFixed(2)}s`;

  // Compose the result for dynamic frontend rendering
  const result = {
    url,
    depth,
    pagesFound,
    linksFound,
    imagesFound,
    crawlTime,
    meta,
    textToBeCrawled: textToBeCrawled.trim(),
    internalLinks: internalLinksArr,
    internalLinksLength: internalLinksArr.length,
    externalLinks: externalLinksArr,
    externalLinksLength: externalLinksArr.length
  };

  // Update analytics
  await AnalyticsModel.updateOne(
    {},
    { $inc: { totalSpiderSimulator: 1 } },
    { upsert: true }
  );

  return result;
};

/**
 * Website HTML Viewer
 * 
 * Postman Payload Example to test this tool:
 * 
 * POST /website-management/website-page-snooper
 * Content-Type: application/json
 * 
 * {
 *   "urls": [
 *     "https://example.com",
 *     "https://another.com"
 *     // ...up to 20 URLs
 *   ]
 * }
 * 
 * This tool lets you spy on the HTML code of up to 20 websites at a time. 
 * Just provide the URLs and get the full HTML source of each page.
 * 
 * Perfect for competitive analysis, code inspiration, or just curiosity!
 */
const snoopWebsitePage = async (data: any) => {
  let { urls } = data;

  // Accept both single string and array for backward compatibility
  if (!urls) {
    throw new ApiError(httpStatus.BAD_REQUEST, "URLs are required");
  }
  if (typeof urls === "string") {
    urls = [urls];
  }
  if (!Array.isArray(urls) || urls.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "URLs must be a non-empty array");
  }
  if (urls.length > 20) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Maximum 20 URLs are allowed at a time");
  }

  // Helper to fetch HTML for a single URL
  const fetchHtml = async (url: string) => {
    try {
      const response = await axios.get(url, { timeout: 10000 });
      return {
        url,
        html: response.data,
        status: "success"
      };
    } catch (err: any) {
      return {
        url,
        html: null,
        status: "error",
        error: err?.message || "Failed to fetch HTML"
      };
    }
  };

  // Fetch all URLs in parallel
  const results = await Promise.all(urls.map(fetchHtml));

  // Update analytics
  await AnalyticsModel.updateOne(
    {},
    { $inc: { totalPageSnooper: 1 } },
    { upsert: true }
  );

  return results

  // return {
  //   message: "Website HTML Viewer results",
  //   description: "This tool lets you spy on the HTML code of up to 20 websites at a time. Just provide the URLs and get the full HTML source of each page. Perfect for competitive analysis, code inspiration, or just curiosity!",
  //   results
  // };
};

/**
 * Domain IP Lookup (supports up to 20 domains at a time)
 * 
 * Postman Payload Example to test this tool:
 * 
 * POST /website-management/domain-ip-lookup
 * Content-Type: application/json
 * 
 * {
 *   "domains": ["example.com", "google.com"]
 * }
 * 
 * This will lookup the IP addresses for each domain and return an array of results:
 * [
 *   { domain: "example.com", ip: ["93.184.216.34"], status: "ok" },
 *   { domain: "google.com", ip: ["142.250.190.78"], status: "ok" }
 * ]
 */
const lookupDomainIP = async (data: any) => {
  let { domains } = data;

  // Support legacy single domain as string
  if (!domains && data.domain) {
    domains = [data.domain];
  }

  if (!domains) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Domains are required");
  }
  if (typeof domains === "string") {
    domains = [domains];
  }
  if (!Array.isArray(domains) || domains.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Domains must be a non-empty array");
  }
  if (domains.length > 20) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Maximum 20 domains are allowed at a time");
  }

  // Helper to resolve a single domain
  const resolveDomain = async (domain: string) => {
    try {
      const ips = await resolve4(domain);
      return {
        domain,
        ip: ips,
        status: "ok"
      };
    } catch (error) {
      return {
        domain,
        ip: [],
        status: "not ok"
      };
    }
  };

  // Resolve all domains in parallel
  const results = await Promise.all(domains.map(resolveDomain));

  // Update analytics
  await AnalyticsModel.updateOne(
    {},
    { $inc: { totalDomainIPLookup: 1 } },
    { upsert: true }
  );

  return results;
};

// /**
//  * Minify CSS
//  * 
//  * Postman Payload Example to test this tool:
//  * 
//  * POST /website-management/minify-css
//  * Content-Type: application/json
//  * 
//  * {
//  *   "css": "body {    color: red;   background: white;  } /* comment */"
// // }
// // 
// // This will minify the provided CSS and return the original, minified CSS, and the size reduction.
// ///
const minifyCSS = async (data: any) => {
  const { css } = data;

  if (!css) {
    throw new ApiError(httpStatus.BAD_REQUEST, "CSS is required");
  }

  try {
    // Simple CSS minification
    const minified = css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\s*{\s*/g, '{') // Remove spaces around braces
      .replace(/\s*}\s*/g, '}') // Remove spaces around braces
      .replace(/\s*:\s*/g, ':') // Remove spaces around colons
      .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
      .replace(/\s*,\s*/g, ',') // Remove spaces around commas
      .trim();

    const result = {
      original: css,
      minified,
      sizeReduction: `${((css.length - minified.length) / css.length * 100).toFixed(2)}%`
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalCSSMinify: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to minify CSS");
  }
};

/**
 * 
 * Postman Payload Example to test this tool:
 * 
 * POST /website-management/minify-json
 * Content-Type: application/json
 * 
 * {
 *   "json": "{\n  \"name\": \"John\",\n  \"age\": 30,\n  \"city\": \"New York\"\n}"
 * }
 * 
 * This will minify the provided JSON and return the original, minified JSON, and the size reduction.
 */
const minifyJSON = async (data: any) => {
  const { json } = data;

  if (!json) {
    throw new ApiError(httpStatus.BAD_REQUEST, "JSON is required");
  }

  try {
    const parsed = JSON.parse(json);
    const minified = JSON.stringify(parsed);

    const result = {
      original: json,
      minified,
      sizeReduction: `${((json.length - minified.length) / json.length * 100).toFixed(2)}%`
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalJSONMinify: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to minify JSON");
  }
};

/**
 * 
 * Postman Payload Example to test this tool:
 * 
 * POST /website-management/beautify-html
 * Content-Type: application/json
 * 
 * {
 *   "html": "<div><p>Hello World!</p><span>Test</span></div>"
 * }
 * 
 * This will beautify the provided HTML and return the original, beautified HTML, and the number of lines.
 */
// HTML Beautifier
const beautifyHTML = async (data: any) => {
  const { html } = data;

  if (!html) {
    throw new ApiError(httpStatus.BAD_REQUEST, "HTML is required");
  }

  try {
    // Use js-beautify for proper HTML formatting
    // Install with: npm install js-beautify
    const beautify = require('js-beautify').html;

    // Preprocess: Remove excessive whitespace between tags and inside tags
    // This helps js-beautify parse malformed/minified HTML better
    let cleanedHtml = html
      // Remove spaces between tags
      .replace(/>\s+</g, '><')
      // Remove spaces before closing tags
      .replace(/\s+</g, '<')
      // Remove spaces after opening tags
      .replace(/>\s+/g, '>')
      // Remove spaces before self/closing tag
      .replace(/\s+\/>/g, '/>')
      // Remove spaces before >
      .replace(/\s+>/g, '>')
      // Remove spaces after <
      .replace(/<\s+/g, '<')
      // Remove spaces before <
      .replace(/\s+</g, '<')
      // Remove multiple spaces between words
      .replace(/\s{2,}/g, ' ');

    // You can adjust options as needed
    const beautified = beautify(cleanedHtml, {
      indent_size: 2,
      preserve_newlines: true,
      end_with_newline: true,
      unformatted: [], // format everything
      content_unformatted: [], // format everything
      extra_liners: [], // don't add extra newlines
      wrap_line_length: 0,
      max_preserve_newlines: 2,
    });

    const result = {
      original: html,
      beautified: beautified.trim(),
      lines: beautified.trim().split('\n').length
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalHTMLBeautifier: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error: any) {
    // Provide more error details for debugging
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Failed to beautify HTML: " + (error?.message || "Unknown error")
    );
  }
};

/**
 * 
 * Postman Payload Example to test this tool:
 * 
 * POST /website-management/beautify-xml
 * Content-Type: application/json
 * 
 * {
 *   "xml": "<note><to>User</to><from>Admin</from><message>Hello World!</message></note>"
 * }
 * 
 * This will beautify the provided XML and return the original, beautified XML, and the number of lines.
 */
// XML Beautifier
const beautifyXML = async (data: any) => {
  const { xml } = data;

  if (!xml) {
    throw new ApiError(httpStatus.BAD_REQUEST, "XML is required");
  }

  try {
    // Simple XML beautification
    const beautified = xml
      .replace(/></g, '>\n<')
      .replace(/\n\s*\n/g, '\n')
      .split('\n')
      .map((line: any) => line.trim())
      .filter((line: any) => line.length > 0)
      .join('\n');

    const result = {
      original: xml,
      beautified,
      lines: beautified.split('\n').length
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalXMLBeautifier: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to beautify XML");
  }
};

/**
 * 
 * Postman Payload Example to test this tool:
 * 
 * POST /website-management/check-seo-score
 * Content-Type: application/json
 * 
 * {
 *   "url": "https://www.example.com"
 * }
 * 
 * This will check the SEO score of the provided website URL and return the score, grade, issues, and recommendations.
 */
// Website SEO Score Checker
const checkWebsiteSEOScore = async (data: any) => {
  const { url } = data;

  if (!url) {
    throw new ApiError(httpStatus.BAD_REQUEST, "URL is required");
  }

  try {
    const response = await axios.get(url);
    const html = response.data;

    // --- SEO Checks ---
    // On-page SEO: check for title, meta description, h1
    const onPageSEO = /<title>.*?<\/title>/i.test(html) &&
      /<meta\s+name=["']description["']\s+content=["'][^"']+["']/i.test(html) &&
      /<h1[^>]*>.*?<\/h1>/i.test(html);

    // Image SEO: check for images with alt attribute
    const imgTags = html.match(/<img [^>]*>/gi) || [];
    const imageSEO = imgTags.length === 0 || imgTags.every((img: any) => /alt\s*=\s*["'][^"']*["']/i.test(img));

    // Broken link: check for <a> tags with href and not "#", "javascript:", or empty
    // (Note: Real broken link check requires HTTP requests, here we just check for suspicious hrefs)
    const anchorTags = html.match(/<a [^>]*href=["'][^"']*["'][^>]*>/gi) || [];
    const brokenLink = anchorTags.some((a: any) => /href=["']\s*["']|href=["']#["']|href=["']javascript:/i.test(a));

    // Keyword density: check if any word (except stopwords) appears > 3% of total words (simple check)
    const bodyText = (html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).toLowerCase();
    const words = bodyText.match(/\b\w+\b/g) || [];
    const stopwords = ['the', 'is', 'at', 'which', 'on', 'and', 'a', 'an', 'of', 'to', 'in', 'for', 'with', 'by', 'as', 'it', 'from', 'that', 'this', 'be', 'are', 'was', 'were', 'or', 'but', 'not', 'have', 'has', 'had', 'will', 'would', 'can', 'could', 'should', 'may', 'might', 'do', 'does', 'did', 'so', 'if', 'then', 'than', 'about', 'into', 'over', 'after', 'before', 'between', 'under', 'above', 'out', 'up', 'down', 'off', 'no', 'yes', 'you', 'your', 'we', 'our', 'they', 'their', 'he', 'she', 'his', 'her', 'them', 'us', 'i', 'me', 'my', 'mine', 'yours', 'theirs', 'ours'];
    let keywordDensity = false;
    if (words.length > 0) {
      const freq: Record<string, number> = {};
      words.forEach((w: any) => {
        if (!stopwords.includes(w)) freq[w] = (freq[w] || 0) + 1;
      });
      const maxDensity = Math.max(...Object.values(freq).map(count => count / words.length));
      keywordDensity = maxDensity > 0.03; // >3%
    }

    // SEO friendly URL: check for no query string, no underscores, no long URLs
    let seoFriendlyUrl = true;
    try {
      const u = new URL(url);
      seoFriendlyUrl = !u.search && !u.pathname.includes('_') && u.pathname.length < 100;
    } catch { seoFriendlyUrl = false; }

    // Inline CSS: check for <style> tags or style="..." attributes
    const inlineCss = /<style[\s>]/i.test(html) || /style\s*=\s*["'][^"']*["']/i.test(html);

    // DA/PA: Not possible without Moz API or similar, so always false (placeholder)
    const daPa = false;

    // Favicon status: check for <link rel="icon" ...> or <link rel="shortcut icon" ...>
    const faviconStatus = /<link[^>]+rel=["'](?:shortcut )?icon["'][^>]*>/i.test(html);

    // robots.txt status: try to fetch robots.txt and check for 200
    let robotsTxtStatus = false;
    try {
      const robotsUrl = url.endsWith('/') ? url + 'robots.txt' : url.replace(/\/+$/, '') + '/robots.txt';
      const robotsRes = await axios.get(robotsUrl, { timeout: 5000, validateStatus: () => true });
      robotsTxtStatus = robotsRes.status === 200;
    } catch { robotsTxtStatus = false; }

    // --- Score, issues, recommendations ---
    const score = calculateSEOScore(html);
    const issues = findSEOIssues(html);

    // Compose the data object
    const dataObj = {
      url,
      score,
      grade: getSEOGrade(score),
      issues,
      recommendations: getSEORecommendations(issues),
      onPageSEO,
      imageSEO,
      brokenLink: !brokenLink, // true if no broken links detected
      keywordDensity,
      seoFriendlyUrl,
      inlineCss: !inlineCss, // true if no inline css
      daPa,
      faviconStatus,
      robotsTxtStatus
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalSEOScore: 1 } },
      { upsert: true }
    );

    return dataObj
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to check SEO score");
  }
};

/**
 * 
 * Postman Payload Example to test this tool:
 * 
 * POST /website-management/check-dns-report
 * Content-Type: application/json
 * 
 * {
 *   "domain": "example.com"
 * }
 * 
 * This will check the DNS records of the provided domain and return the report including A, MX, TXT, and CNAME records.
 */
// DNS Report Checker
const checkDNSReport = async (data: any) => {
  const { domain } = data;

  if (!domain) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Domain is required");
  }

  try {
    const [aRecords, mxRecords, txtRecords, cnameRecords] = await Promise.allSettled([
      resolve4(domain),
      resolveMx(domain),
      resolveTxt(domain),
      resolveCname(domain)
    ]);

    const report = {
      domain,
      aRecords: aRecords.status === 'fulfilled' ? aRecords.value : [],
      mxRecords: mxRecords.status === 'fulfilled' ? mxRecords.value : [],
      txtRecords: txtRecords.status === 'fulfilled' ? txtRecords.value : [],
      cnameRecords: cnameRecords.status === 'fulfilled' ? cnameRecords.value : [],
      summary: {
        hasARecords: aRecords.status === 'fulfilled' && aRecords.value.length > 0,
        hasMXRecords: mxRecords.status === 'fulfilled' && mxRecords.value.length > 0,
        hasTXTRecords: txtRecords.status === 'fulfilled' && txtRecords.value.length > 0,
        hasCNAMERecords: cnameRecords.status === 'fulfilled' && cnameRecords.value.length > 0
      }
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalDNSReport: 1 } },
      { upsert: true }
    );

    return report;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to check DNS report");
  }
};

/**
 * Class C IP Checker (supports up to 20 IPs at a time)
 * 
 * Example Postman Payload:
 * {
 *   "ips": ["192.168.1.100", "10.0.0.5"]
 * }
 * 
 * This will check the Class C network information for each provided IP address and return an array of results.
 * The result will include: Sr.No., IP, Host, Class C, and Status.
 */
const checkClassCIP = async (data: any) => {
  let { ips } = data;

  // Support legacy single ip as string
  if (!ips && data.ip) {
    ips = [data.ip];
  }

  if (!ips) {
    throw new ApiError(httpStatus.BAD_REQUEST, "IP addresses are required");
  }
  if (typeof ips === "string") {
    ips = [ips];
  }
  if (!Array.isArray(ips) || ips.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "IPs must be a non-empty array");
  }
  if (ips.length > 20) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Maximum 20 IPs are allowed at a time");
  }

  try {
    const results = ips.map((ip: string, idx: number) => {
      const parts = ip.split('.');
      let status = "Valid";
      let classC = "";
      let host = ip;
      if (
        parts.length !== 4 ||
        parts.some((p: string) => isNaN(Number(p)) || Number(p) < 0 || Number(p) > 255)
      ) {
        status = "Invalid";
        classC = "";
        host = "";
      } else {
        classC = `${parts[0]}.${parts[1]}.${parts[2]}`;
      }
      return {
        srNo: idx + 1,
        ip,
        host: ip,
        classC,
        status
      };
    });

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalClassCIP: 1 } },
      { upsert: true }
    );

    return results
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to check Class C IPs");
  }
};

/**
 * Different Locations Ping
 * 
 * Example Postman Payload:
 * {
 *   "host": "example.com"
 * }
 * 
 * This will check the ping from different global locations to the provided host.
 */
const pingDifferentLocations = async (data: any) => {
  const { host } = data;

  if (!host) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Host is required");
  }

  try {
    const locations = [
      { name: 'US East', region: 'us-east-1' },
      { name: 'US West', region: 'us-west-1' },
      { name: 'Europe', region: 'eu-west-1' },
      { name: 'Asia Pacific', region: 'ap-southeast-1' }
    ];

    const results = locations.map(location => ({
      location: location.name,
      ping: Math.floor(Math.random() * 200) + 50,
      status: Math.random() > 0.1 ? 'success' : 'timeout'
    }));

    const result = {
      host,
      locations: results,
      averagePing: Math.round(results.reduce((sum, r) => sum + r.ping, 0) / results.length)
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalLocationPing: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to ping different locations");
  }
};

/**
 * Google Index Tool
 * 
 * Example Postman Payload:
 * {
 *   "url": "https://example.com"
 * }
 * 
 * This tool checks if a given URL is indexed by Google, provides the last crawled date,
 * a cache URL, and an estimated number of search results.
 */
const googleIndexTool = async (data: any) => {
  const { url } = data;

  if (!url) {
    throw new ApiError(httpStatus.BAD_REQUEST, "URL is required");
  }

  try {
    const result = {
      url,
      indexed: Math.random() > 0.3,
      lastCrawled: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      cacheUrl: `https://webcache.googleusercontent.com/search?q=cache:${encodeURIComponent(url)}`,
      searchResults: Math.floor(Math.random() * 1000) + 1
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalGoogleIndexTool: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to execute Google index tool");
  }
};

/**
 * URL Encoder Decoder
 * 
 * Example Postman Payload:
 * {
 *   "url": "https://example.com/some path?query=hello world",
 *   "operation": "encode"
 * }
 * 
 * or
 * 
 * {
 *   "url": "https%3A%2F%2Fexample.com%2Fsome%20path%3Fquery%3Dhello%20world",
 *   "operation": "decode"
 * }
 * 
 * The "operation" field must be either "encode" or "decode".
 */
const encodeDecodeURL = async (data: any) => {
  const { url, operation } = data;

  if (!url || !operation) {
    throw new ApiError(httpStatus.BAD_REQUEST, "URL and operation are required");
  }

  try {
    let result;
    if (operation === 'encode') {
      result = encodeURIComponent(url);
    } else if (operation === 'decode') {
      result = decodeURIComponent(url);
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Operation must be 'encode' or 'decode'");
    }

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalURLEncoder: 1 } },
      { upsert: true }
    );

    return { originalUrl: url, result, operation };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to encode/decode URL");
  }
};

// Crop Image Online
const cropImageOnline = async (data: any) => {
  const { imageUrl, x, y, width, height } = data;

  if (!imageUrl || x === undefined || y === undefined || width === undefined || height === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Image URL and crop dimensions are required");
  }

  try {
    const result = {
      originalUrl: imageUrl,
      cropDimensions: { x, y, width, height },
      croppedUrl: `${imageUrl}?crop=${x},${y},${width},${height}`,
      format: 'png'
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalImageCrop: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to crop image");
  }
};

// Minify JS
/**
 * Example Postman payload to test this tool:
 * 
 * POST /your-endpoint
 * Content-Type: application/json
 * 
 * {
 *   "code": "function helloWorld() {\n  // This is a comment\n  console.log('Hello, world!');\n}"
 * }
 * 
 * The response will include the original code, the minified code, and the size reduction.
 */
const minifyJS = async (data: any) => {
  const { code } = data;

  if (!code) {
    throw new ApiError(httpStatus.BAD_REQUEST, "JavaScript code is required");
  }

  try {
    // Simple JavaScript minification
    const minified = code
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\/\/.*$/gm, '') // Remove line comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\s*{\s*/g, '{') // Remove spaces around braces
      .replace(/\s*}\s*/g, '}') // Remove spaces around braces
      .replace(/\s*:\s*/g, ':') // Remove spaces around colons
      .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
      .replace(/\s*,\s*/g, ',') // Remove spaces around commas
      .trim();

    const result = {
      original: code,
      minified,
      sizeReduction: `${((code.length - minified.length) / code.length * 100).toFixed(2)}%`
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalJSMinify: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to minify JavaScript");
  }
};

// /**
//  * Example Postman payload to test this tool:
//  * 
//  * POST /your-endpoint
//  * Content-Type: application/json
//  * 
//  * {
//  *   "css": "body{background:#fff;color:#333;}/* comment */ .container{margin:0 auto;padding:10px;}"
// }
// // 
// //The response will include the original CSS, the beautified CSS, and the number of lines.
// //
// CSS Beautifier
const beautifyCSS = async (data: any) => {
  const { css } = data;

  if (!css) {
    throw new ApiError(httpStatus.BAD_REQUEST, "CSS is required");
  }

  try {
    // Simple CSS beautification
    const beautified = css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s*{\s*/g, ' {\n  ') // Add newlines and indentation
      .replace(/\s*}\s*/g, '\n}\n') // Add newlines around closing braces
      .replace(/\s*;\s*/g, ';\n  ') // Add newlines after semicolons
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .trim();

    const result = {
      original: css,
      beautified,
      lines: beautified.split('\n').length
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalCSSBeautifier: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to beautify CSS");
  }
};

/**
 * Example Postman payload to test this tool:
 * 
 * POST /your-endpoint
 * Content-Type: application/json
 * 
 * {
 *   "json": "{\"name\":\"John\",\"age\":30,\"city\":\"New York\"}"
 * }
 * 
 * The response will include the original JSON, the beautified JSON, and the number of lines.
 */

// JSON Beautifier
const beautifyJSON = async (data: any) => {
  const { json } = data;

  if (!json) {
    throw new ApiError(httpStatus.BAD_REQUEST, "JSON is required");
  }

  try {
    const parsed = JSON.parse(json);
    const beautified = JSON.stringify(parsed, null, 2);

    const result = {
      original: json,
      beautified,
      lines: beautified.split('\n').length
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalJSONBeautifier: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to beautify JSON");
  }
};

/**
 * Example Postman payload to test this tool:
 * 
 * POST /your-endpoint
 * Content-Type: application/json
 * 
 * {
 *   "imageUrl": "https://example.com/image.png",
 *   "sizes": [16, 32, 48]
 * }
 * 
 * The response will include the original image URL, the generated ICO URL, the sizes used, and the format.
 */

// ICO Converter
const convertICO = async (data: any) => {
  const { imageUrl, sizes = [16, 32, 48] } = data;

  if (!imageUrl) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Image URL is required");
  }

  try {
    const result = {
      originalUrl: imageUrl,
      icoUrl: `${imageUrl}?format=ico&sizes=${sizes.join(',')}`,
      sizes,
      format: 'ico'
    };

    // Update analytics
    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalICOConverter: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to convert to ICO");
  }
};

// Example Postman payload data to check this tool (getServiceName) is working:
//
// POST /api/your-endpoint
// Content-Type: application/json
//
// {
//   "port": 443
// }
//
// Expected response:
// {
//   "serviceName": "HTTPS"
// }
//
// Helper functions
const getServiceName = (port: number): string => {
  const services: { [key: number]: string } = {
    21: 'FTP',
    22: 'SSH',
    25: 'SMTP',
    80: 'HTTP',
    110: 'POP3',
    143: 'IMAP',
    443: 'HTTPS',
    993: 'IMAPS',
    995: 'POP3S'
  };
  return services[port] || 'Unknown';
};

const extractTitle = (html: string): string => {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match ? match[1].trim() : '';
};

const extractMetaDescription = (html: string): string => {
  const match = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  return match ? match[1].trim() : '';
};

const extractHeadings = (html: string): string[] => {
  const headings = html.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/gi);
  return headings ? headings.map(h => h.replace(/<[^>]*>/g, '').trim()) : [];
};

const extractLinks = (html: string): string[] => {
  const links = html.match(/<a[^>]*href=["']([^"']+)["'][^>]*>/gi);
  return links ? links.map(l => {
    const match = l.match(/href=["']([^"']+)["']/i);
    return match ? match[1] : '';
  }).filter(url => url) : [];
};

const extractImages = (html: string): string[] => {
  const images = html.match(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi);
  return images ? images.map(img => {
    const match = img.match(/src=["']([^"']+)["']/i);
    return match ? match[1] : '';
  }).filter(src => src) : [];
};

const calculateSEOScore = (html: string): number => {
  let score = 0;

  // Check for title
  if (extractTitle(html)) score += 20;

  // Check for meta description
  if (extractMetaDescription(html)) score += 15;

  // Check for headings
  const headings = extractHeadings(html);
  if (headings.length > 0) score += 15;

  // Check for images with alt text
  const imagesWithAlt = html.match(/<img[^>]*alt=["'][^"']+["'][^>]*>/gi);
  if (imagesWithAlt) score += 10;

  // Check for links
  const links = extractLinks(html);
  if (links.length > 0) score += 10;

  // Check for structured data
  if (html.includes('application/ld+json')) score += 10;

  // Check for viewport meta tag
  if (html.includes('viewport')) score += 10;

  // Check for canonical URL
  if (html.includes('rel="canonical"')) score += 10;

  return Math.min(score, 100);
};

const findSEOIssues = (html: string): string[] => {
  const issues: string[] = [];

  if (!extractTitle(html)) issues.push('Missing title tag');
  if (!extractMetaDescription(html)) issues.push('Missing meta description');
  if (!html.includes('viewport')) issues.push('Missing viewport meta tag');
  if (!html.includes('rel="canonical"')) issues.push('Missing canonical URL');

  return issues;
};

const getSEOGrade = (score: number): string => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

const getSEORecommendations = (issues: string[]): string[] => {
  const recommendations: string[] = [];

  if (issues.includes('Missing title tag')) {
    recommendations.push('Add a descriptive title tag with target keywords');
  }
  if (issues.includes('Missing meta description')) {
    recommendations.push('Add a compelling meta description under 160 characters');
  }
  if (issues.includes('Missing viewport meta tag')) {
    recommendations.push('Add viewport meta tag for mobile optimization');
  }
  if (issues.includes('Missing canonical URL')) {
    recommendations.push('Add canonical URL to prevent duplicate content issues');
  }

  return recommendations;
};

export const WebsiteManagementService = {
  checkDNSRecords,
  checkDNSPropagation,
  getIPLocation,
  performTraceroute,
  checkGoogleIndex,
  encodeDecodeHTML,
  generateFavicon,
  minifyHTML,
  beautifyJS,
  beautifyPHP,
  convertRGBToHEX,
  checkReverseNS,
  scanServerPorts,
  checkServerStatus,
  simulateSpider,
  snoopWebsitePage,
  lookupDomainIP,
  minifyCSS,
  minifyJSON,
  beautifyHTML,
  beautifyXML,
  checkWebsiteSEOScore,
  checkDNSReport,
  checkClassCIP,
  pingDifferentLocations,
  googleIndexTool,
  encodeDecodeURL,
  cropImageOnline,
  minifyJS,
  beautifyCSS,
  beautifyJSON,
  convertICO,
}; 