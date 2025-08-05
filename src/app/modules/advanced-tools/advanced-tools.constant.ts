// Advanced Tools Constants

export const ADVANCED_TOOLS = {
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
} as const;

export const ADVANCED_TOOL_NAMES = {
  [ADVANCED_TOOLS.IMAGE_RESIZER]: 'Image Resizer',
  [ADVANCED_TOOLS.VIDEO_CUTTER]: 'Video Cutter',
  [ADVANCED_TOOLS.GRAMMAR_CHECKER]: 'Grammar Checker',
  [ADVANCED_TOOLS.PARAPHRASER]: 'Paraphraser Tools',
  [ADVANCED_TOOLS.COMPETITORS_ANALYZER]: 'Competitors Analyser',
  [ADVANCED_TOOLS.QR_CODE_GENERATOR]: 'QR Code Generator',
  [ADVANCED_TOOLS.PDF_CONVERTER]: 'PDF Converter',
  [ADVANCED_TOOLS.PASSWORD_GENERATOR]: 'Password Generator',
  [ADVANCED_TOOLS.CALCULATOR]: 'Calculator',
  [ADVANCED_TOOLS.TIMER]: 'Timer',
  [ADVANCED_TOOLS.CALENDAR]: 'Calendar',
  [ADVANCED_TOOLS.DICTIONARY]: 'Dictionary',
  [ADVANCED_TOOLS.INTEREST_CALCULATOR]: 'Mudduddra Mullo (Interest Calculator)',
  [ADVANCED_TOOLS.CURRENCY_CONVERTER]: 'Unite Rupontarkari (Currency Converter)',
  [ADVANCED_TOOLS.WEBSITE_BACKUP]: 'Website Backup',
  [ADVANCED_TOOLS.WEBSITE_MIGRATOR]: 'Website Migrator',
  [ADVANCED_TOOLS.SOCIAL_MEDIA_SCHEDULE]: 'Social Media Schedule',
  [ADVANCED_TOOLS.EMAIL_TEMPLATE_GENERATOR]: 'Email Template Generator',
} as const;

export const ADVANCED_TOOL_DESCRIPTIONS = {
  [ADVANCED_TOOLS.IMAGE_RESIZER]: 'Resize images to any dimensions while maintaining quality',
  [ADVANCED_TOOLS.VIDEO_CUTTER]: 'Cut and trim videos to desired length',
  [ADVANCED_TOOLS.GRAMMAR_CHECKER]: 'Check grammar and spelling errors in text',
  [ADVANCED_TOOLS.PARAPHRASER]: 'Rephrase text while maintaining original meaning',
  [ADVANCED_TOOLS.COMPETITORS_ANALYZER]: 'Analyze competitor websites and their performance',
  [ADVANCED_TOOLS.QR_CODE_GENERATOR]: 'Generate QR codes for URLs, text, or contact information',
  [ADVANCED_TOOLS.PDF_CONVERTER]: 'Convert PDF files to various formats',
  [ADVANCED_TOOLS.PASSWORD_GENERATOR]: 'Generate secure passwords with customizable criteria',
  [ADVANCED_TOOLS.CALCULATOR]: 'Advanced calculator with mathematical functions',
  [ADVANCED_TOOLS.TIMER]: 'Set timers and countdowns for various purposes',
  [ADVANCED_TOOLS.CALENDAR]: 'View and manage calendar dates and events',
  [ADVANCED_TOOLS.DICTIONARY]: 'Look up word definitions, synonyms, and antonyms',
  [ADVANCED_TOOLS.INTEREST_CALCULATOR]: 'Calculate simple and compound interest rates',
  [ADVANCED_TOOLS.CURRENCY_CONVERTER]: 'Convert between different world currencies',
  [ADVANCED_TOOLS.WEBSITE_BACKUP]: 'Create backups of website files and databases',
  [ADVANCED_TOOLS.WEBSITE_MIGRATOR]: 'Migrate websites between different hosting providers',
  [ADVANCED_TOOLS.SOCIAL_MEDIA_SCHEDULE]: 'Schedule social media posts across multiple platforms',
  [ADVANCED_TOOLS.EMAIL_TEMPLATE_GENERATOR]: 'Generate professional email templates',
} as const;

export const ADVANCED_TOOL_CATEGORIES = {
  MEDIA_TOOLS: 'Media Tools',
  TEXT_TOOLS: 'Text Tools',
  BUSINESS_TOOLS: 'Business Tools',
  UTILITY_TOOLS: 'Utility Tools',
  FINANCIAL_TOOLS: 'Financial Tools',
  WEBSITE_TOOLS: 'Website Tools',
  PRODUCTIVITY_TOOLS: 'Productivity Tools',
} as const;

export const ADVANCED_TOOL_CATEGORY_MAPPING = {
  [ADVANCED_TOOLS.IMAGE_RESIZER]: ADVANCED_TOOL_CATEGORIES.MEDIA_TOOLS,
  [ADVANCED_TOOLS.VIDEO_CUTTER]: ADVANCED_TOOL_CATEGORIES.MEDIA_TOOLS,
  [ADVANCED_TOOLS.GRAMMAR_CHECKER]: ADVANCED_TOOL_CATEGORIES.TEXT_TOOLS,
  [ADVANCED_TOOLS.PARAPHRASER]: ADVANCED_TOOL_CATEGORIES.TEXT_TOOLS,
  [ADVANCED_TOOLS.COMPETITORS_ANALYZER]: ADVANCED_TOOL_CATEGORIES.BUSINESS_TOOLS,
  [ADVANCED_TOOLS.QR_CODE_GENERATOR]: ADVANCED_TOOL_CATEGORIES.UTILITY_TOOLS,
  [ADVANCED_TOOLS.PDF_CONVERTER]: ADVANCED_TOOL_CATEGORIES.UTILITY_TOOLS,
  [ADVANCED_TOOLS.PASSWORD_GENERATOR]: ADVANCED_TOOL_CATEGORIES.UTILITY_TOOLS,
  [ADVANCED_TOOLS.CALCULATOR]: ADVANCED_TOOL_CATEGORIES.UTILITY_TOOLS,
  [ADVANCED_TOOLS.TIMER]: ADVANCED_TOOL_CATEGORIES.PRODUCTIVITY_TOOLS,
  [ADVANCED_TOOLS.CALENDAR]: ADVANCED_TOOL_CATEGORIES.PRODUCTIVITY_TOOLS,
  [ADVANCED_TOOLS.DICTIONARY]: ADVANCED_TOOL_CATEGORIES.TEXT_TOOLS,
  [ADVANCED_TOOLS.INTEREST_CALCULATOR]: ADVANCED_TOOL_CATEGORIES.FINANCIAL_TOOLS,
  [ADVANCED_TOOLS.CURRENCY_CONVERTER]: ADVANCED_TOOL_CATEGORIES.FINANCIAL_TOOLS,
  [ADVANCED_TOOLS.WEBSITE_BACKUP]: ADVANCED_TOOL_CATEGORIES.WEBSITE_TOOLS,
  [ADVANCED_TOOLS.WEBSITE_MIGRATOR]: ADVANCED_TOOL_CATEGORIES.WEBSITE_TOOLS,
  [ADVANCED_TOOLS.SOCIAL_MEDIA_SCHEDULE]: ADVANCED_TOOL_CATEGORIES.BUSINESS_TOOLS,
  [ADVANCED_TOOLS.EMAIL_TEMPLATE_GENERATOR]: ADVANCED_TOOL_CATEGORIES.BUSINESS_TOOLS,
} as const;

export const SUPPORTED_IMAGE_FORMATS = ['jpeg', 'jpg', 'png', 'gif', 'webp'] as const;
export const SUPPORTED_VIDEO_FORMATS = ['mp4', 'avi', 'mov', 'wmv', 'flv'] as const;
export const SUPPORTED_PDF_FORMATS = ['docx', 'txt', 'html', 'rtf'] as const;
export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'BDT', 'INR', 'CAD', 'AUD'] as const;
export const SUPPORTED_SOCIAL_PLATFORMS = ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'] as const;
export const SUPPORTED_EMAIL_TEMPLATES = ['welcome', 'newsletter', 'promotion', 'notification', 'reminder'] as const; 