"use strict";
// Advanced Tools Constants
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_EMAIL_TEMPLATES = exports.SUPPORTED_SOCIAL_PLATFORMS = exports.SUPPORTED_CURRENCIES = exports.SUPPORTED_PDF_FORMATS = exports.SUPPORTED_VIDEO_FORMATS = exports.SUPPORTED_IMAGE_FORMATS = exports.ADVANCED_TOOL_CATEGORY_MAPPING = exports.ADVANCED_TOOL_CATEGORIES = exports.ADVANCED_TOOL_DESCRIPTIONS = exports.ADVANCED_TOOL_NAMES = exports.ADVANCED_TOOLS = void 0;
exports.ADVANCED_TOOLS = {
    IMAGE_RESIZER: 'image-resizer',
    VIDEO_CUTTER: 'video-cutter',
    GRAMMAR_CHECKER: 'grammar-checker',
    PARAPHRASER: 'paraphraser',
    COMPETITORS_ANALYZER: 'competitors-analyzer',
    QR_CODE_GENERATOR: 'qr-code-generator',
    PDF_CONVERTER: 'pdf-converter',
    PASSWORD_GENERATOR: 'password-generator',
    CALCULATOR: 'calculator',
    TIMER: 'timer',
    CALENDAR: 'calendar',
    DICTIONARY: 'dictionary',
    INTEREST_CALCULATOR: 'interest-calculator',
    CURRENCY_CONVERTER: 'currency-converter',
    WEBSITE_BACKUP: 'website-backup',
    WEBSITE_MIGRATOR: 'website-migrator',
    SOCIAL_MEDIA_SCHEDULE: 'social-media-schedule',
    EMAIL_TEMPLATE_GENERATOR: 'email-template-generator',
};
exports.ADVANCED_TOOL_NAMES = {
    [exports.ADVANCED_TOOLS.IMAGE_RESIZER]: 'Image Resizer',
    [exports.ADVANCED_TOOLS.VIDEO_CUTTER]: 'Video Cutter',
    [exports.ADVANCED_TOOLS.GRAMMAR_CHECKER]: 'Grammar Checker',
    [exports.ADVANCED_TOOLS.PARAPHRASER]: 'Paraphraser Tools',
    [exports.ADVANCED_TOOLS.COMPETITORS_ANALYZER]: 'Competitors Analyser',
    [exports.ADVANCED_TOOLS.QR_CODE_GENERATOR]: 'QR Code Generator',
    [exports.ADVANCED_TOOLS.PDF_CONVERTER]: 'PDF Converter',
    [exports.ADVANCED_TOOLS.PASSWORD_GENERATOR]: 'Password Generator',
    [exports.ADVANCED_TOOLS.CALCULATOR]: 'Calculator',
    [exports.ADVANCED_TOOLS.TIMER]: 'Timer',
    [exports.ADVANCED_TOOLS.CALENDAR]: 'Calendar',
    [exports.ADVANCED_TOOLS.DICTIONARY]: 'Dictionary',
    [exports.ADVANCED_TOOLS.INTEREST_CALCULATOR]: 'Mudduddra Mullo (Interest Calculator)',
    [exports.ADVANCED_TOOLS.CURRENCY_CONVERTER]: 'Unite Rupontarkari (Currency Converter)',
    [exports.ADVANCED_TOOLS.WEBSITE_BACKUP]: 'Website Backup',
    [exports.ADVANCED_TOOLS.WEBSITE_MIGRATOR]: 'Website Migrator',
    [exports.ADVANCED_TOOLS.SOCIAL_MEDIA_SCHEDULE]: 'Social Media Schedule',
    [exports.ADVANCED_TOOLS.EMAIL_TEMPLATE_GENERATOR]: 'Email Template Generator',
};
exports.ADVANCED_TOOL_DESCRIPTIONS = {
    [exports.ADVANCED_TOOLS.IMAGE_RESIZER]: 'Resize images to any dimensions while maintaining quality',
    [exports.ADVANCED_TOOLS.VIDEO_CUTTER]: 'Cut and trim videos to desired length',
    [exports.ADVANCED_TOOLS.GRAMMAR_CHECKER]: 'Check grammar and spelling errors in text',
    [exports.ADVANCED_TOOLS.PARAPHRASER]: 'Rephrase text while maintaining original meaning',
    [exports.ADVANCED_TOOLS.COMPETITORS_ANALYZER]: 'Analyze competitor websites and their performance',
    [exports.ADVANCED_TOOLS.QR_CODE_GENERATOR]: 'Generate QR codes for URLs, text, or contact information',
    [exports.ADVANCED_TOOLS.PDF_CONVERTER]: 'Convert PDF files to various formats',
    [exports.ADVANCED_TOOLS.PASSWORD_GENERATOR]: 'Generate secure passwords with customizable criteria',
    [exports.ADVANCED_TOOLS.CALCULATOR]: 'Advanced calculator with mathematical functions',
    [exports.ADVANCED_TOOLS.TIMER]: 'Set timers and countdowns for various purposes',
    [exports.ADVANCED_TOOLS.CALENDAR]: 'View and manage calendar dates and events',
    [exports.ADVANCED_TOOLS.DICTIONARY]: 'Look up word definitions, synonyms, and antonyms',
    [exports.ADVANCED_TOOLS.INTEREST_CALCULATOR]: 'Calculate simple and compound interest rates',
    [exports.ADVANCED_TOOLS.CURRENCY_CONVERTER]: 'Convert between different world currencies',
    [exports.ADVANCED_TOOLS.WEBSITE_BACKUP]: 'Create backups of website files and databases',
    [exports.ADVANCED_TOOLS.WEBSITE_MIGRATOR]: 'Migrate websites between different hosting providers',
    [exports.ADVANCED_TOOLS.SOCIAL_MEDIA_SCHEDULE]: 'Schedule social media posts across multiple platforms',
    [exports.ADVANCED_TOOLS.EMAIL_TEMPLATE_GENERATOR]: 'Generate professional email templates',
};
exports.ADVANCED_TOOL_CATEGORIES = {
    MEDIA_TOOLS: 'Media Tools',
    TEXT_TOOLS: 'Text Tools',
    BUSINESS_TOOLS: 'Business Tools',
    UTILITY_TOOLS: 'Utility Tools',
    FINANCIAL_TOOLS: 'Financial Tools',
    WEBSITE_TOOLS: 'Website Tools',
    PRODUCTIVITY_TOOLS: 'Productivity Tools',
};
exports.ADVANCED_TOOL_CATEGORY_MAPPING = {
    [exports.ADVANCED_TOOLS.IMAGE_RESIZER]: exports.ADVANCED_TOOL_CATEGORIES.MEDIA_TOOLS,
    [exports.ADVANCED_TOOLS.VIDEO_CUTTER]: exports.ADVANCED_TOOL_CATEGORIES.MEDIA_TOOLS,
    [exports.ADVANCED_TOOLS.GRAMMAR_CHECKER]: exports.ADVANCED_TOOL_CATEGORIES.TEXT_TOOLS,
    [exports.ADVANCED_TOOLS.PARAPHRASER]: exports.ADVANCED_TOOL_CATEGORIES.TEXT_TOOLS,
    [exports.ADVANCED_TOOLS.COMPETITORS_ANALYZER]: exports.ADVANCED_TOOL_CATEGORIES.BUSINESS_TOOLS,
    [exports.ADVANCED_TOOLS.QR_CODE_GENERATOR]: exports.ADVANCED_TOOL_CATEGORIES.UTILITY_TOOLS,
    [exports.ADVANCED_TOOLS.PDF_CONVERTER]: exports.ADVANCED_TOOL_CATEGORIES.UTILITY_TOOLS,
    [exports.ADVANCED_TOOLS.PASSWORD_GENERATOR]: exports.ADVANCED_TOOL_CATEGORIES.UTILITY_TOOLS,
    [exports.ADVANCED_TOOLS.CALCULATOR]: exports.ADVANCED_TOOL_CATEGORIES.UTILITY_TOOLS,
    [exports.ADVANCED_TOOLS.TIMER]: exports.ADVANCED_TOOL_CATEGORIES.PRODUCTIVITY_TOOLS,
    [exports.ADVANCED_TOOLS.CALENDAR]: exports.ADVANCED_TOOL_CATEGORIES.PRODUCTIVITY_TOOLS,
    [exports.ADVANCED_TOOLS.DICTIONARY]: exports.ADVANCED_TOOL_CATEGORIES.TEXT_TOOLS,
    [exports.ADVANCED_TOOLS.INTEREST_CALCULATOR]: exports.ADVANCED_TOOL_CATEGORIES.FINANCIAL_TOOLS,
    [exports.ADVANCED_TOOLS.CURRENCY_CONVERTER]: exports.ADVANCED_TOOL_CATEGORIES.FINANCIAL_TOOLS,
    [exports.ADVANCED_TOOLS.WEBSITE_BACKUP]: exports.ADVANCED_TOOL_CATEGORIES.WEBSITE_TOOLS,
    [exports.ADVANCED_TOOLS.WEBSITE_MIGRATOR]: exports.ADVANCED_TOOL_CATEGORIES.WEBSITE_TOOLS,
    [exports.ADVANCED_TOOLS.SOCIAL_MEDIA_SCHEDULE]: exports.ADVANCED_TOOL_CATEGORIES.BUSINESS_TOOLS,
    [exports.ADVANCED_TOOLS.EMAIL_TEMPLATE_GENERATOR]: exports.ADVANCED_TOOL_CATEGORIES.BUSINESS_TOOLS,
};
exports.SUPPORTED_IMAGE_FORMATS = ['jpeg', 'jpg', 'png', 'gif', 'webp'];
exports.SUPPORTED_VIDEO_FORMATS = ['mp4', 'avi', 'mov', 'wmv', 'flv'];
exports.SUPPORTED_PDF_FORMATS = ['docx', 'txt', 'html', 'rtf'];
exports.SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'BDT', 'INR', 'CAD', 'AUD'];
exports.SUPPORTED_SOCIAL_PLATFORMS = ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'];
exports.SUPPORTED_EMAIL_TEMPLATES = ['welcome', 'newsletter', 'promotion', 'notification', 'reminder'];
