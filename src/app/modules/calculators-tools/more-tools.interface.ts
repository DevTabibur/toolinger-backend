// More Tools Interfaces

export interface QRCodeScannerRequest {
  qrCodeData: string;
}

export interface QRCodeScannerResponse {
  scannedData: string;
  type: string;
  timestamp: string;
}

export interface RomanNumeralsDateRequest {
  date: string;
  operation: "toRoman" | "fromRoman";
}

export interface RomanNumeralsDateResponse {
  original: string;
  converted: string;
  operation: string;
}

export interface BinaryTranslatorRequest {
  binary: string;
  operation: "toText" | "toDecimal";
}

export interface BinaryTranslatorResponse {
  binary: string;
  result: string;
  operation: string;
}

export interface TextToBinaryRequest {
  text: string;
}

export interface TextToBinaryResponse {
  text: string;
  binary: string;
  length: number;
}

export interface RandomAddressRequest {
  country?: string;
}

export interface RandomAddressResponse {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface DiscountCalculatorRequest {
  originalPrice: number;
  discountPercentage: number;
}

export interface DiscountCalculatorResponse {
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
  savings: number;
}

export interface BinaryToHexRequest {
  binary: string;
}

export interface BinaryToHexResponse {
  binary: string;
  decimal: number;
  hex: string;
}

export interface DecimalToOctalRequest {
  decimal: number;
}

export interface DecimalToOctalResponse {
  decimal: number;
  octal: string;
}

export interface OctalToDecimalRequest {
  octal: string;
}

export interface OctalToDecimalResponse {
  octal: string;
  decimal: number;
}

export interface HEXToRGBRequest {
  hex: string;
}

export interface HEXToRGBResponse {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  rgbString: string;
}

export interface OctalCalculatorRequest {
  num1: number;
  num2: number;
  operation: "add" | "subtract" | "multiply" | "divide";
}

export interface OctalCalculatorResponse {
  num1: number;
  num2: number;
  operation: string;
  result: string;
}

export interface PercentageCalculatorRequest {
  value: number;
  total: number;
}

export interface PercentageCalculatorResponse {
  value: number;
  total: number;
  percentage: string;
}

export interface DecimalToASCIIRequest {
  decimal: number;
}

export interface DecimalToASCIIResponse {
  decimal: number;
  ascii: string;
  asciiCode: number;
}

export interface TextToHEXRequest {
  text: string;
}

export interface TextToHEXResponse {
  text: string;
  hex: string;
  length: number;
}

export interface AdsenseCalculatorRequest {
  pageViews: number;
  cpm: number;
  clickRate: number;
}

export interface AdsenseCalculatorResponse {
  pageViews: number;
  cpm: number;
  clickRate: number;
  impressions: number;
  clicks: number;
  revenue: string;
}

export interface PaypalFeeCalculatorRequest {
  amount: number;
  country?: string;
}

export interface PaypalFeeCalculatorResponse {
  amount: number;
  country: string;
  feeRate: number;
  fixedFee: number;
  fee: string;
  netAmount: string;
}

export interface UpsideDownTextRequest {
  text: string;
}

export interface UpsideDownTextResponse {
  original: string;
  upsideDown: string;
}

export interface DecimalToBinaryRequest {
  decimal: number;
}

export interface DecimalToBinaryResponse {
  decimal: number;
  binary: string;
}

export interface CPCCalculatorRequest {
  cost: number;
  clicks: number;
}

export interface CPCCalculatorResponse {
  cost: number;
  clicks: number;
  cpc: string;
}

export interface HexToDecimalRequest {
  hex: string;
}

export interface HexToDecimalResponse {
  hex: string;
  decimal: number;
}

export interface HexToBinaryRequest {
  hex: string;
}

export interface HexToBinaryResponse {
  hex: string;
  binary: string;
}

export interface HexToOctalRequest {
  hex: string;
}

export interface HexToOctalResponse {
  hex: string;
  octal: string;
}

export interface OctalToHexRequest {
  octal: string;
}

export interface OctalToHexResponse {
  octal: string;
  hex: string;
}

export interface BinaryCalculatorRequest {
  num1: string;
  num2: string;
  operation: "add" | "subtract" | "multiply" | "divide";
}

export interface BinaryCalculatorResponse {
  num1: string;
  num2: string;
  operation: string;
  result: string;
}

export interface ASCIIToTextRequest {
  ascii: string;
}

export interface ASCIIToTextResponse {
  ascii: string;
  text: string;
}

export interface ASCIIToDecimalRequest {
  ascii: string;
}

export interface ASCIIToDecimalResponse {
  ascii: string;
  decimal: number;
}

export interface HEXToASCIIRequest {
  hex: string;
}

export interface HEXToASCIIResponse {
  hex: string;
  ascii: string;
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
  strength: string;
  length: number;
}

export interface ReverseTextRequest {
  text: string;
}

export interface ReverseTextResponse {
  original: string;
  reversed: string;
}

export interface RomanNumeralRequest {
  number: number;
  operation: "toRoman" | "fromRoman";
}

export interface RomanNumeralResponse {
  original: number | string;
  converted: string | number;
  operation: string;
}

export interface LTVCalculatorRequest {
  averagePurchaseValue: number;
  purchaseFrequency: number;
  customerLifespan: number;
}

export interface LTVCalculatorResponse {
  averagePurchaseValue: number;
  purchaseFrequency: number;
  customerLifespan: number;
  ltv: string;
}

export interface BinaryToDecimalRequest {
  binary: string;
}

export interface BinaryToDecimalResponse {
  binary: string;
  decimal: number;
}

export interface CPMCalculatorRequest {
  cost: number;
  impressions: number;
}

export interface CPMCalculatorResponse {
  cost: number;
  impressions: number;
  cpm: string;
}

export interface DecimalToHexRequest {
  decimal: number;
}

export interface DecimalToHexResponse {
  decimal: number;
  hex: string;
}

export interface BinaryToOctalRequest {
  binary: string;
}

export interface BinaryToOctalResponse {
  binary: string;
  octal: string;
}

export interface OctalToBinaryRequest {
  octal: string;
}

export interface OctalToBinaryResponse {
  octal: string;
  binary: string;
}

export interface CaseConverterRequest {
  text: string;
  case:
    | "uppercase"
    | "lowercase"
    | "titlecase"
    | "camelcase"
    | "snakecase"
    | "kebabcase";
}

export interface CaseConverterResponse {
  original: string;
  converted: string;
  case: string;
}

export interface HEXCalculatorRequest {
  num1: string;
  num2: string;
  operation: "add" | "subtract" | "multiply" | "divide";
}

export interface HEXCalculatorResponse {
  num1: string;
  num2: string;
  operation: string;
  result: string;
}

export interface TextToASCIIRequest {
  text: string;
}

export interface TextToASCIIResponse {
  text: string;
  ascii: string;
}

export interface ASCIIToHEXRequest {
  ascii: string;
}

export interface ASCIIToHEXResponse {
  ascii: string;
  hex: string;
}

export interface HEXToTextRequest {
  hex: string;
}

export interface HEXToTextResponse {
  hex: string;
  text: string;
}

export interface FakeNameRequest {
  gender?: "male" | "female" | "random";
  country?: string;
}

export interface FakeNameResponse {
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  country: string;
}

export interface RandomWordRequest {
  length?: number;
  language?: string;
}

export interface RandomWordResponse {
  word: string;
  length: number;
  language: string;
}

export interface EPSCalculatorRequest {
  netIncome: number;
  sharesOutstanding: number;
}

export interface EPSCalculatorResponse {
  netIncome: number;
  sharesOutstanding: number;
  eps: string;
}

export interface SalesTaxRequest {
  amount: number;
  taxRate: number;
}

export interface SalesTaxResponse {
  amount: number;
  taxRate: number;
  taxAmount: string;
  totalAmount: string;
}

export interface AverageCalculatorRequest {
  numbers: number[];
}

export interface AverageCalculatorResponse {
  numbers: number[];
  average: string;
  count: number;
}

export interface WordsToPagesRequest {
  words: number;
  wordsPerPage?: number;
}

export interface WordsToPagesResponse {
  words: number;
  wordsPerPage: number;
  pages: string;
}

export interface TextToHandwritingRequest {
  text: string;
  style?: string;
}

export interface TextToHandwritingResponse {
  text: string;
  handwritingUrl: string;
  style: string;
}

export interface OnlineTextEditorRequest {
  text: string;
  operation: "format" | "count" | "analyze";
}

export interface OnlineTextEditorResponse {
  text: string;
  result: any;
  operation: string;
}

export interface ProbabilityCalculatorRequest {
  favorable: number;
  total: number;
}

export interface ProbabilityCalculatorResponse {
  favorable: number;
  total: number;
  probability: string;
  percentage: string;
}

export interface GSTCalculatorRequest {
  amount: number;
  gstRate: number;
}

export interface GSTCalculatorResponse {
  amount: number;
  gstRate: number;
  gstAmount: string;
  totalAmount: string;
}

export interface AgeCalculatorRequest {
  birthDate: string;
}

export interface AgeCalculatorResponse {
  birthDate: string;
  age: number;
  years: number;
  months: number;
  days: number;
}

export interface JPGToWordRequest {
  imageUrl: string;
}

export interface JPGToWordResponse {
  imageUrl: string;
  wordUrl: string;
}

export interface PDFToWordRequest {
  pdfUrl: string;
}

export interface PDFToWordResponse {
  pdfUrl: string;
  wordUrl: string;
}

export interface TextToImageRequest {
  text: string;
  style?: string;
}

export interface TextToImageResponse {
  text: string;
  imageUrl: string;
  style: string;
}

export interface MarginCalculatorRequest {
  cost: number;
  sellingPrice: number;
}

export interface MarginCalculatorResponse {
  cost: number;
  sellingPrice: number;
  margin: string;
  marginPercentage: string;
}

export interface BoundsCalculatorRequest {
  data: number[];
  confidenceLevel?: number;
}

export interface BoundsCalculatorResponse {
  data: number[];
  lowerBound: string;
  upperBound: string;
  confidenceLevel: number;
}

export interface ValuationCalculatorRequest {
  preMoneyValuation: number;
  investment: number;
}

export interface ValuationCalculatorResponse {
  preMoneyValuation: number;
  investment: number;
  postMoneyValuation: string;
  ownershipPercentage: string;
}

export interface PDFToTextRequest {
  pdfUrl: string;
}

export interface PDFToTextResponse {
  pdfUrl: string;
  text: string;
  wordCount: number;
}
