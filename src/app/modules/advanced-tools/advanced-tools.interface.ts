// Advanced Tools Interfaces

export interface ImageResizerRequest {
  imageUrl: string;
  width: number;
  height: number;
  format?: string;
}

export interface ImageResizerResponse {
  originalUrl: string;
  resizedUrl: string;
  dimensions: {
    width: number;
    height: number;
  };
  format: string;
  fileSize: number;
}

export interface VideoCutterRequest {
  videoUrl: string;
  startTime: number;
  endTime: number;
  format?: string;
}

export interface VideoCutterResponse {
  originalUrl: string;
  cutUrl: string;
  startTime: number;
  endTime: number;
  duration: number;
  format: string;
}

export interface GrammarCheckerRequest {
  text: string;
  language?: string;
}

export interface GrammarCheckerResponse {
  text: string;
  language: string;
  errors: Array<{
    type: string;
    word: string;
    suggestion: string;
    position: number;
  }>;
  errorCount: number;
  correctedText: string;
  score: number;
}

export interface ParaphraserRequest {
  text: string;
  style?: string;
}

export interface ParaphraserResponse {
  originalText: string;
  paraphrasedText: string;
  style: string;
  wordCount: number;
  similarity: number;
}

export interface CompetitorsAnalyzerRequest {
  domain: string;
  competitors?: string[];
}

export interface CompetitorsAnalyzerResponse {
  targetDomain: string;
  competitors: Array<{
    domain: string;
    traffic: number;
    keywords: number;
    backlinks: number;
    score: number;
  }>;
  totalCompetitors: number;
  averageScore: number;
}

export interface QRCodeGeneratorRequest {
  content: string;
  size?: number;
  format?: string;
}

export interface QRCodeGeneratorResponse {
  content: string;
  qrCodeUrl: string;
  size: number;
  format: string;
  type: string;
}

export interface PDFConverterRequest {
  fileUrl: string;
  targetFormat?: string;
}

export interface PDFConverterResponse {
  originalUrl: string;
  convertedUrl: string;
  targetFormat: string;
  fileSize: number;
  pages: number;
}

export interface PasswordGeneratorRequest {
  length?: number;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumbers?: boolean;
  includeSymbols?: boolean;
}

export interface PasswordGeneratorResponse {
  password: string;
  length: number;
  strength: string;
  criteria: {
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
  };
}

export interface CalculatorRequest {
  expression: string;
  precision?: number;
}

export interface CalculatorResponse {
  expression: string;
  result: string;
  precision: number;
  timestamp: string;
}

export interface TimerRequest {
  duration: number;
  label?: string;
}

export interface TimerResponse {
  label: string;
  duration: number;
  startTime: string;
  endTime: string;
  status: string;
  timerId: string;
}

export interface CalendarRequest {
  year?: number;
  month?: number;
}

export interface CalendarResponse {
  year: number;
  month: number;
  monthName: string;
  calendar: (number | null)[][];
  daysInMonth: number;
  firstDay: number;
}

export interface DictionaryRequest {
  word: string;
  language?: string;
}

export interface DictionaryResponse {
  word: string;
  language: string;
  definitions: Array<{
    partOfSpeech: string;
    definition: string;
    example: string;
  }>;
  synonyms: string[];
  antonyms: string[];
  pronunciation: string;
}

export interface InterestCalculatorRequest {
  principal: number;
  rate: number;
  time: number;
  type?: string;
}

export interface InterestCalculatorResponse {
  principal: number;
  rate: number;
  time: number;
  type: string;
  interest: string;
  totalAmount: string;
  monthlyPayment: string | null;
}

export interface CurrencyConverterRequest {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

export interface CurrencyConverterResponse {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: string;
  convertedAmount: string;
  timestamp: string;
}

export interface WebsiteBackupRequest {
  domain: string;
  backupType?: string;
}

export interface WebsiteBackupResponse {
  domain: string;
  backupType: string;
  backupUrl: string;
  size: number;
  status: string;
  timestamp: string;
  files: number;
}

export interface WebsiteMigratorRequest {
  sourceDomain: string;
  targetDomain: string;
  migrationType?: string;
}

export interface WebsiteMigratorResponse {
  sourceDomain: string;
  targetDomain: string;
  migrationType: string;
  status: string;
  migratedFiles: number;
  databaseRecords: number;
  timestamp: string;
  estimatedTime: number;
}

export interface SocialMediaScheduleRequest {
  content: string;
  platforms: string[];
  scheduledTime: string;
  imageUrl?: string;
}

export interface SocialMediaScheduleResponse {
  content: string;
  platforms: string[];
  scheduledTime: string;
  imageUrl?: string;
  status: string;
  postId: string;
  estimatedReach: number;
  timestamp: string;
}

export interface EmailTemplateGeneratorRequest {
  type: string;
  recipient: string;
  subject: string;
  variables?: Record<string, any>;
}

export interface EmailTemplateGeneratorResponse {
  type: string;
  recipient: string;
  subject: string;
  body: string;
  variables: Record<string, any>;
  htmlVersion: string;
  timestamp: string;
} 