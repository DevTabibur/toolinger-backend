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
exports.checkIfDomainIsSuspicious = void 0;
const axios_1 = __importDefault(require("axios"));
const checkIfDomainIsSuspicious = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // HEAD request to avoid downloading whole page
        const response = yield axios_1.default.head(url, {
            maxRedirects: 5,
            timeout: 5000,
            headers: {
                "User-Agent": "Mozilla/5.0",
            },
        });
        const contentType = response.headers["content-type"] || "";
        if (response.status >= 400 || contentType.includes("application/octet-stream")) {
            return { url, status: "Suspicious" };
        }
        return { url, status: "Safe" };
    }
    catch (error) {
        return { url, status: "Suspicious" };
    }
});
exports.checkIfDomainIsSuspicious = checkIfDomainIsSuspicious;
