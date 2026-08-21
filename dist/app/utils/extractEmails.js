"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractEmails = void 0;
const extractEmails = (html) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi;
    const found = html.match(emailRegex) || [];
    const uniqueEmails = Array.from(new Set(found)); // Remove duplicates
    return uniqueEmails;
};
exports.extractEmails = extractEmails;
