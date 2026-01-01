"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLinks = void 0;
const jsdom_1 = require("jsdom");
const parseLinks = (html, baseUrl) => {
    const dom = new jsdom_1.JSDOM(html);
    const document = dom.window.document;
    const anchors = document.querySelectorAll('a[href]');
    const links = Array.from(anchors).map(a => a.getAttribute('href')).filter(Boolean);
    const internalLinks = links.filter(link => link.startsWith('/') || link.includes(new URL(baseUrl).hostname));
    const externalLinks = links.filter(link => !link.startsWith('/') && !link.includes(new URL(baseUrl).hostname));
    return {
        total: links.length,
        internal: internalLinks.length,
        external: externalLinks.length,
    };
};
exports.parseLinks = parseLinks;
