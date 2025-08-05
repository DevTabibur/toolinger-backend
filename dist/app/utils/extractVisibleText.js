"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractVisibleText = void 0;
const jsdom_1 = require("jsdom");
const extractVisibleText = (html) => {
    const dom = new jsdom_1.JSDOM(html);
    const textContent = dom.window.document.body.textContent || '';
    return textContent.replace(/\s+/g, ' ').trim();
};
exports.extractVisibleText = extractVisibleText;
