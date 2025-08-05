"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeTitle = capitalizeTitle;
// Helper function to capitalize the first letter of each word
function capitalizeTitle(title) {
    return title
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
