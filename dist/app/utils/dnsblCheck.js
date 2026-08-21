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
exports.checkBlacklist = void 0;
const promises_1 = __importDefault(require("dns/promises"));
const dnsblServers = [
    "dnsbl-1.uceprotect.net",
    "dnsbl-2.uceprotect.net",
    "dnsbl-3.uceprotect.net",
    "dnsbl.dronebl.org",
    "dnsbl.sorbs.net",
    "spam.dnsbl.sorbs.net",
    "bl.spamcop.net",
    "recent.dnsbl.sorbs.net",
    "all.spamrats.com",
    "b.barracudacentral.org",
    "bl.blocklist.de",
    "bl.mailspike.org",
    "cblplus.anti-spam.org.cn",
    "dnsbl.anticaptcha.net",
    "ip.v4bl.org",
    "fnrbl.fast.net",
    "dnsrbl.swinog.ch",
    "mail-abuse.blacklist.jippg.org",
    "spam.abuse.ch",
    "spamsources.fabel.dk",
    "virbl.dnsbl.bit.nl",
    "cbl.abuseat.org",
    "dnsbl.justspam.org",
    "zen.spamhaus.org"
];
const checkBlacklist = (ip) => __awaiter(void 0, void 0, void 0, function* () {
    const reversedIp = ip.split(".").reverse().join(".");
    const results = yield Promise.allSettled(dnsblServers.map((server) => __awaiter(void 0, void 0, void 0, function* () {
        const query = `${reversedIp}.${server}`;
        try {
            yield promises_1.default.resolve4(query);
            return { server, listed: true };
        }
        catch (_a) {
            return { server, listed: false };
        }
    })));
    const formattedResults = results
        .filter((r) => r.status === "fulfilled")
        .map((r, i) => ({
        server: dnsblServers[i],
        status: r.value.listed ? "Listed" : "Not Listed",
    }));
    const isListed = formattedResults.some((r) => r.status === "Listed");
    return {
        ip,
        overall: isListed ? "Listed" : "Not Listed",
        blacklistStatus: formattedResults,
    };
});
exports.checkBlacklist = checkBlacklist;
