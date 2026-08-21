"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractHostname = void 0;
const extractHostname = (urlOrDomain) => {
    try {
        const url = new URL(urlOrDomain.startsWith('http') ? urlOrDomain : `http://${urlOrDomain}`);
        return url.hostname;
    }
    catch (e) {
        return urlOrDomain; // fallback
    }
};
exports.extractHostname = extractHostname;
