import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import AnalyticsModel from "../analytics/analytics.model";

/**
 * Example Postman payload data to check this tool (QR Code Scanner) is working:
 * 
 * POST /api/more-tools/qr-code-scanner
 * Content-Type: application/json
 * 
 * {
 *   "qrCodeData": "https://example.com"
 * }
 * 
 * Expected response:
 * {
 *   "scannedData": "https://example.com",
 *   "type": "text",
 *   "timestamp": "2024-06-01T12:34:56.789Z"
 * }
 */

// QR Code Scanner
const scanQRCode = async (data: any) => {
  const { qrCodeData } = data;

  if (!qrCodeData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "QR code data is required");
  }

  try {
    // Simulate QR code scanning
    const result = {
      scannedData: qrCodeData,
      type: 'text',
      timestamp: new Date().toISOString()
    };

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalQRScanner: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to scan QR code");
  }
};

/**
 * Example Postman payload data to check this tool (Roman Numerals Date Converter) is working:
 * 
 * POST /api/more-tools/roman-numerals-date
 * Content-Type: application/json
 * 
 * {
 *   "date": "23-07-2025"
 * }
 * 
 * Expected response:
 * {
 *   "romanDate": "XXIII-VII-MMXXV"
 * }
 */

// Helper function to convert a number to Roman numerals
function numberToRoman(num: number): string {
  if (isNaN(num)) return '';
  const lookup: { [key: number]: string } = {
    1000: 'M', 900: 'CM', 500: 'D', 400: 'CD',
    100: 'C', 90: 'XC', 50: 'L', 40: 'XL',
    10: 'X', 9: 'IX', 5: 'V', 4: 'IV', 1: 'I'
  };
  let roman = '';
  for (const value of Object.keys(lookup).map(Number).sort((a, b) => b - a)) {
    while (num >= value) {
      roman += lookup[value];
      num -= value;
    }
  }
  return roman;
}

// Roman Numerals Date Converter
const convertRomanNumeralsDate = async (data: any) => {
  const { date } = data;

  if (!date) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Date is required");
  }

  // Accepts "DD-MM-YYYY" or "YYYY-MM-DD"
  let day: number, month: number, year: number;
  let match = date.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (match) {
    // DD-MM-YYYY
    day = parseInt(match[1], 10);
    month = parseInt(match[2], 10);
    year = parseInt(match[3], 10);
  } else {
    // Try YYYY-MM-DD
    match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
      year = parseInt(match[1], 10);
      month = parseInt(match[2], 10);
      day = parseInt(match[3], 10);
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Date format must be DD-MM-YYYY or YYYY-MM-DD");
    }
  }

  try {
    const romanDay = numberToRoman(day);
    const romanMonth = numberToRoman(month);
    const romanYear = numberToRoman(year);

    const romanDate = `${romanDay}-${romanMonth}-${romanYear}`;

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalRomanDate: 1 } },
      { upsert: true }
    );

    return { romanDate };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to convert Roman numerals date");
  }
};

/**
 * Universal Base Translator
 * Translates between binary, decimal, octal, hexadecimal, and text.
 * 
 * Example Postman payload:
 * {
 *   "input": "101010",
 *   "inputType": "binary",
 *   "outputType": "decimal"
 * }
 * 
 * Supported inputType/outputType: "binary", "decimal", "octal", "hexadecimal", "text"
 */
const translateBinary = async (data: any) => {
  const { input, inputType, outputType } = data;

  if (!input || !inputType || !outputType) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Input, inputType, and outputType are required");
  }

  // Helper functions
  const parseInput = (input: string, type: string): number[] => {
    switch (type) {
      case "binary":
        return input.trim().split(/\s+/).map(b => parseInt(b, 2));
      case "decimal":
        return input.trim().split(/\s+/).map(d => parseInt(d, 10));
      case "octal":
        return input.trim().split(/\s+/).map(o => parseInt(o, 8));
      case "hexadecimal":
        return input.trim().split(/\s+/).map(h => parseInt(h, 16));
      case "text":
        return input.split('').map(c => c.charCodeAt(0));
      default:
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid inputType");
    }
  };

  const formatOutput = (nums: number[], type: string): string => {
    switch (type) {
      case "binary":
        return nums.map(n => n.toString(2).padStart(8, '0')).join(' ');
      case "decimal":
        return nums.map(n => n.toString(10)).join(' ');
      case "octal":
        return nums.map(n => n.toString(8)).join(' ');
      case "hexadecimal":
        return nums.map(n => n.toString(16).toUpperCase()).join(' ');
      case "text":
        return nums.map(n => String.fromCharCode(n)).join('');
      default:
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid outputType");
    }
  };

  try {
    // Parse input to array of char codes
    const charCodes = parseInput(input, inputType);

    // Format output as requested type
    const output = formatOutput(charCodes, outputType);

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalBinaryTranslator: 1 } },
      { upsert: true }
    );

    return {
      input,
      inputType,
      outputType,
      output
    };
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to translate value: " + error.message);
  }
};



/**
 * Example Postman payload data to check this tool (Random Address Generator) is working:
 * 
 * POST /api/more-tools/random-address
 * Content-Type: application/json
 * 
 * {
 *   "country": "USA"
 * }
 * 
 * Expected response:
 * {
 *   "country": "USA",
 *   "city": "Los Angeles",
 *   "state": "California",
 *   "zipCode": "90001",
 *   "street": "742 Evergreen Terrace",
 *   "fullName": "John Doe",
 *   "email": "john.doe@example.com",
 *   "phone": "+1-555-123-4567"
 * }
 * 
 * Supported countries: USA, UK, France, Germany, Italy, Spain, Canada, Australia, Brazil, India, China, Japan, etc.
 * (See image for more examples)
 */

import { faker } from '@faker-js/faker';

const countryData: Record<string, any> = {
  USA: {
    country: "USA",
    states: [
      { name: "California", cities: ["Los Angeles", "San Francisco", "San Diego"] },
      { name: "New York", cities: ["New York", "Buffalo", "Rochester"] },
      { name: "Texas", cities: ["Houston", "Dallas", "Austin"] }
    ],
    zipRange: [10000, 99999],
    phoneCode: "+1"
  },
  UK: {
    country: "UK",
    states: [
      { name: "England", cities: ["London", "Manchester", "Liverpool"] },
      { name: "Scotland", cities: ["Edinburgh", "Glasgow", "Aberdeen"] }
    ],
    zipRange: [1000, 9999],
    phoneCode: "+44"
  },
  France: {
    country: "France",
    states: [
      { name: "Île-de-France", cities: ["Paris", "Boulogne-Billancourt", "Saint-Denis"] },
      { name: "Provence-Alpes-Côte d'Azur", cities: ["Marseille", "Nice", "Toulon"] }
    ],
    zipRange: [75000, 95999],
    phoneCode: "+33"
  },
  Germany: {
    country: "Germany",
    states: [
      { name: "Bavaria", cities: ["Munich", "Nuremberg", "Augsburg"] },
      { name: "Berlin", cities: ["Berlin"] }
    ],
    zipRange: [10000, 99999],
    phoneCode: "+49"
  },
  India: {
    country: "India",
    states: [
      { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
      { name: "Delhi", cities: ["New Delhi", "Dwarka", "Rohini"] }
    ],
    zipRange: [110001, 999999],
    phoneCode: "+91"
  },
  // Add more countries as needed, following the image example
};

const getRandomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const generateRandomAddress = async (data: any) => {
  let { country = 'USA' } = data;
  country = country.toUpperCase();

  if (!countryData[country]) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Country not supported. Supported countries: " + Object.keys(countryData).join(", "));
  }

  try {
    const countryInfo = countryData[country];
    const stateObj = getRandomElement(countryInfo.states);
    const city = getRandomElement(stateObj.cities);
    const state = stateObj.name;
    const zipCode = faker.number.int({ min: countryInfo.zipRange[0], max: countryInfo.zipRange[1] }).toString();
    const street = faker.location.streetAddress();
    const fullName = faker.person.fullName();
    const email = faker.internet.email();
    // Use default phone number generation without pattern option
    const phone = `${countryInfo.phoneCode}-${faker.phone.number()}`;

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalRandomAddress: 1 } },
      { upsert: true }
    );

    return {
      country: countryInfo.country,
      city,
      state,
      zipCode,
      street,
      fullName,
      email,
      phone
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to generate random address");
  }
};

// Discount Calculator
// Example Postman payload to test this tool:
// {
//   "originalPrice": 200,
//   "discountPercentage": 15
// }
const calculateDiscount = async (data: any) => {
  const { originalPrice, discountPercentage } = data;

  if (!originalPrice || discountPercentage === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Original price and discount percentage are required");
  }

  try {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const finalPrice = originalPrice - discountAmount;

    const result = {
      originalPrice,
      discountPercentage,
      discountAmount,
      finalPrice,
      savings: discountAmount
    };

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalDiscountCalculator: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to calculate discount");
  }
};

// Binary To Hex
const convertBinaryToHex = async (data: any) => {
  const { binary } = data;

  if (!binary) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Binary number is required");
  }

  try {
    const decimal = parseInt(binary, 2);
    const hex = decimal.toString(16).toUpperCase();

    const result = {
      binary,
      decimal,
      hex: `0x${hex}`
    };

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalBinaryToHex: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to convert binary to hex");
  }
};

// Decimal To Octal
const convertDecimalToOctal = async (data: any) => {
  const { decimal } = data;

  if (decimal === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Decimal number is required");
  }

  try {
    const octal = decimal.toString(8);

    const result = {
      decimal,
      octal
    };

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalDecimalToOctal: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to convert decimal to octal");
  }
};

// Octal To Decimal
const convertOctalToDecimal = async (data: any) => {
  const { octal } = data;

  if (!octal) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Octal number is required");
  }

  try {
    const decimal = parseInt(octal, 8);

    const result = {
      octal,
      decimal
    };

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalOctalToDecimal: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to convert octal to decimal");
  }
};

// HEX To RGB
const convertHEXToRGB = async (data: any) => {
  const { hex } = data;

  if (!hex) {
    throw new ApiError(httpStatus.BAD_REQUEST, "HEX color is required");
  }

  try {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substr(0, 2), 16);
    const g = parseInt(cleanHex.substr(2, 2), 16);
    const b = parseInt(cleanHex.substr(4, 2), 16);

    const result = {
      hex,
      rgb: { r, g, b },
      rgbString: `rgb(${r}, ${g}, ${b})`
    };

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalHEXToRGB: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to convert HEX to RGB");
  }
};

/**
 * Example Postman payload to test this tool (Octal Calculator):
 * 
 * POST /api/more-tools/octal-calculator
 * Content-Type: application/json
 * 
 * {
 *   "num1": 10,
 *   "num2": 7,
 *   "operation": "add"
 * }
 * 
 * Supported operations: "add", "subtract", "multiply", "divide"
 * 
 * Expected response:
 * {
 *   "num1": 10,
 *   "num2": 7,
 *   "operation": "add",
 *   "result": "21"
 * }
 */

const calculateOctal = async (data: any) => {
  const { num1, num2, operation } = data;

  if (num1 === undefined || num2 === undefined || !operation) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Two numbers and operation are required");
  }

  try {
    let result;
    switch (operation) {
      case 'add':
        result = (num1 + num2).toString(8);
        break;
      case 'subtract':
        result = (num1 - num2).toString(8);
        break;
      case 'multiply':
        result = (num1 * num2).toString(8);
        break;
      case 'divide':
        result = (num1 / num2).toString(8);
        break;
      default:
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid operation");
    }

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalOctalCalculator: 1 } },
      { upsert: true }
    );

    return { num1, num2, operation, result };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to calculate octal");
  }
};

// Percentage Calculator

/**
 * Example Postman payload to test this tool:
 * 
 * POST /api/your-endpoint
 * Content-Type: application/json
 * 
 * {
 *   "value": 25,
 *   "total": 200
 * }
 * 
 * Expected response:
 * {
 *   "value": 25,
 *   "total": 200,
 *   "percentage": "12.50"
 * }
 */

const calculatePercentage = async (data: any) => {
  const { value, total } = data;

  if (value === undefined || total === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Value and total are required");
  }

  try {
    const percentage = (value / total) * 100;

    const result = {
      value,
      total,
      percentage: percentage.toFixed(2)
    };

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalPercentageCalculator: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to calculate percentage");
  }
};

// Decimal to ASCII
const convertDecimalToASCII = async (data: any) => {
  const { decimal } = data;

  if (decimal === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Decimal number is required");
  }

  try {
    const ascii = String.fromCharCode(decimal);

    const result = {
      decimal,
      ascii,
      asciiCode: ascii.charCodeAt(0)
    };

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalDecimalToASCII: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to convert decimal to ASCII");
  }
};

// Text to HEX
const convertTextToHEX = async (data: any) => {
  const { text } = data;

  if (!text) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Text is required");
  }

  try {
    const hex = text.split('').map((char: any) => char.charCodeAt(0).toString(16).padStart(2, '0')).join('');

    const result = {
      text,
      hex,
      length: hex.length
    };

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalTextToHEX: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to convert text to HEX");
  }
};

// Adsense Calculator
/**
 * Example Postman payload to test this tool:
 * 
 * POST /api/more-tools/adsense-calculator
 * Content-Type: application/json
 * 
 * {
 *   "pageViews": 10000,
 *   "cpm": 2.5,
 *   "clickRate": 1.2
 * }
 * 
 * Response:
 * {
 *   "pageViews": 10000,
 *   "cpm": 2.5,
 *   "clickRate": 1.2,
 *   "impressions": 10000,
 *   "clicks": 120,
 *   "revenue": "25.00"
 * }
 */
const calculateAdsense = async (data: any) => {
  const { pageViews, cpm, clickRate } = data;

  if (!pageViews || !cpm || clickRate === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Page views, CPM, and click rate are required");
  }

  try {
    const impressions = pageViews;
    const revenue = (impressions * cpm) / 1000;
    const clicks = (impressions * clickRate) / 100;

    const result = {
      pageViews,
      cpm,
      clickRate,
      impressions,
      clicks,
      revenue: revenue.toFixed(2)
    };

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalAdsenseCalculator: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to calculate Adsense");
  }
};

/**
 * Paypal Fee Calculator
 * 
 * Example Postman Payload (POST JSON):
 * {
 *   "amount": 100,
 *   "country": "US"
 * }
 * 
 * "country" is optional. If omitted, defaults to "US".
 * 
 * Example Response:
 * {
 *   "amount": 100,
 *   "country": "US",
 *   "feeRate": 2.9,
 *   "fixedFee": 0.3,
 *   "fee": "3.20",
 *   "netAmount": "96.80"
 * }
 */
const calculatePaypalFee = async (data: any) => {
  const { amount, country = 'US' } = data;

  if (!amount) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Amount is required");
  }

  try {
    const feeRate = country === 'US' ? 0.029 : 0.039;
    const fixedFee = country === 'US' ? 0.30 : 0.35;
    const fee = (amount * feeRate) + fixedFee;
    const netAmount = amount - fee;

    const result = {
      amount,
      country,
      feeRate: feeRate * 100,
      fixedFee,
      fee: fee.toFixed(2),
      netAmount: netAmount.toFixed(2)
    };

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalPaypalFeeCalculator: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to calculate PayPal fee");
  }
};

/**
 * Upside Down Text Generator
 * 
 * Example Postman Payload (POST):
 * 
 * URL: http://<your-domain>/api/more-tools/upside-down-text
 * Body (JSON):
 * {
 *   "text": "Hello World!"
 * }
 * 
 * Example Response:
 * {
 *   "original": "Hello World!",
 *   "upsideDown": "¡plɹoM ollǝH"
 * }
 */
const generateUpsideDownText = async (data: any) => {
  const { text } = data;

  if (!text) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Text is required");
  }

  try {
    const upsideDownMap: { [key: string]: string } = {
      'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
      'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
      'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
      'y': 'ʎ', 'z': 'z', 'A': '∀', 'B': 'B', 'C': 'Ɔ', 'D': 'D', 'E': 'Ǝ', 'F': 'Ⅎ',
      'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'K', 'L': '˥', 'M': 'W', 'N': 'N',
      'O': 'O', 'P': 'Ԁ', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': '┴', 'U': '∩', 'V': 'Λ',
      'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z', '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ',
      '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', ',': '\'', '.': '˙',
      '?': '¿', 
      '!': '¡', 
      '"': '„', 
      '\'': ',', 
      '(': ')', 
      ')': '(', 
      '[': ']', 
      ']': '[', 
      '{': '}', 
      '}': '{', 
      '<': '>', 
      '>': '<', 
      '&': '⅋', 
      '_': '‾', 
      '∴': '∵', 
      '⁅': '⁆', 
      '⁆': '⁅', 
      '∦': '∣', 
      '⁀': '⁁', 
      '⁃': '⁃', 
      '⁇': '⁈', 
      '⁈': '⁇', 
      '⁉': '⁉', 
      '⁊': '⁊', 
      '⁋': '⁋', 
      '⁌': '⁍', 
      '⁍': '⁌', 
      '⁎': '⁎', 
      '⁏': '⁏', 
      '⁐': '⁐', 
      '⁑': '⁑', 
      '⁒': '⁒', 
      '⁓': '⁓', 
      '⁔': '⁔', 
      '⁕': '⁕', 
      '⁖': '⁖', 
      '⁗': '⁗', 
      '⁘': '⁘', 
      '⁙': '⁙', 
      '⁚': '⁚', 
      '⁛': '⁛', 
      '⁜': '⁜', 
      '⁝': '⁝', 
      '⁞': '⁞'
    };

    const upsideDown = text
      .split('')
      .reverse()
      .map((char: string) => upsideDownMap[char] !== undefined ? upsideDownMap[char] : char)
      .join('');

    const result = {
      original: text,
      upsideDown: upsideDown
    };

    await AnalyticsModel.updateOne(
      {},
      { $inc: { totalUpsideDownText: 1 } },
      { upsert: true }
    );

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to generate upside down text");
  }
};


/**
 * Password Generator Service
 * Payload Example:
 * {
 *   "length": 8,
 *   "stringLetters": true,
 *   "capitalLetters": false,
 *   "digits": false,
 *   "specialChars": false
 * }
 * 
 * Returns:
 * {
 *   "password": "generatedPassword"
 * }
 */
const generatePassword = async (data: any) => {
  const {
    length = 8,
    stringLetters = false,
    capitalLetters = false,
    digits = false,
    specialChars = false,
  } = data;

  if (!stringLetters && !capitalLetters && !digits && !specialChars) {
    throw new ApiError(httpStatus.BAD_REQUEST, "At least one character type must be selected");
  }

  if (!length || typeof length !== "number" || length < 1 || length > 64) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password length must be between 1 and 64");
  }

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = "0123456789";
  const special = "!@#$%^&*()_+-=[]{}|;:',.<>/?`~";

  let chars = "";
  if (stringLetters) chars += lower;
  if (capitalLetters) chars += upper;
  if (digits) chars += num;
  if (specialChars) chars += special;

  if (!chars) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No character set selected");
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  await AnalyticsModel.updateOne(
    {},
    { $inc: { totalPasswordGenerated: 1 } },
    { upsert: true }
  );

  return { password };
};


/**
 * Reverse Text Generator Service
 * Supports:
 *  - Reverse Text (entire string)
 *  - Reverse Wording (reverse order of words)
 *  - Reverse Each Word's Lettering (reverse each word, keep order)
 * 
 * Example Postman Payloads:
 * 
 * Reverse Text:
 * {
 *   "text": "Hello World!",
 *   "mode": "reverseText"
 * }
 * 
 * Reverse Wording:
 * {
 *   "text": "Hello World!",
 *   "mode": "reverseWording"
 * }
 * 
 * Reverse Each Word's Lettering:
 * {
 *   "text": "Hello World!",
 *   "mode": "reverseEachWord"
 * }
 * 
 * Modes: "reverseText" | "reverseWording" | "reverseEachWord"
 */
const generateReverseText = async (data: any) => {
  const { text = "", mode = "reverseText" } = data;

  if (typeof text !== "string" || !text.trim()) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Text is required");
  }

  let result = "";

  switch (mode) {
    case "reverseText":
      result = text.split("").reverse().join("");
      break;
    case "reverseWording":
      // Split by whitespace, reverse array, join by single space
      result = text.split(/\s+/).reverse().join(" ");
      break;
    case "reverseEachWord":
      // Split by whitespace, reverse each word, join by single space
      result = text
        .split(/\s+/)
        .map(word => word.split("").reverse().join(""))
        .join(" ");
      break;
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid mode");
  }

  await AnalyticsModel.updateOne(
    {},
    { $inc: { totalReverseTextGenerated: 1 } },
    { upsert: true }
  );

  return { result };
};


/**
 * Roman Numeral Converter Service
 * Converts between Roman numerals and decimal numbers.
 * 
 * Payload examples:
 * 
 * Convert decimal to Roman:
 * {
 *   "decimal": 10
 * }
 * 
 * Convert Roman to decimal:
 * {
 *   "roman": "XII"
 * }
 * 
 * Only one of "decimal" or "roman" should be provided.
 * 
 * Returns:
 * {
 *   "input": "10",
 *   "output": "X"
 * }
 */

const romanNumeralMap: { [key: string]: number } = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
};

function decimalToRoman(num: number): string {
  if (typeof num !== "number" || num <= 0 || num >= 4000) return "";
  let result = "";
  let n = num;
  for (const roman in romanNumeralMap) {
    while (n >= romanNumeralMap[roman]) {
      result += roman;
      n -= romanNumeralMap[roman];
    }
  }
  return result;
}

function romanToDecimal(roman: string): number {
  if (typeof roman !== "string" || !roman.trim()) return NaN;
  let str = roman.toUpperCase();
  let i = 0;
  let num = 0;
  const keys = Object.keys(romanNumeralMap);
  while (i < str.length) {
    let twoChar = str.substr(i, 2);
    if (romanNumeralMap[twoChar]) {
      num += romanNumeralMap[twoChar];
      i += 2;
    } else {
      let oneChar = str.substr(i, 1);
      if (romanNumeralMap[oneChar]) {
        num += romanNumeralMap[oneChar];
        i += 1;
      } else {
        return NaN; // Invalid character
      }
    }
  }
  return num;
}

const convertRomanNumeral = async (data: any) => {
  let input = "";
  let output = "";

  if (data.decimal !== undefined && data.roman !== undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Provide only one of 'decimal' or 'roman'");
  }

  if (data.decimal !== undefined) {
    // Decimal to Roman
    const decimal = Number(data.decimal);
    if (isNaN(decimal) || decimal <= 0 || decimal >= 4000) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Decimal must be a number between 1 and 3999");
    }
    input = decimal.toString();
    output = decimalToRoman(decimal);
    if (!output) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid decimal number for Roman numeral conversion");
    }
  } else if (data.roman !== undefined) {
    // Roman to Decimal
    const roman = String(data.roman).toUpperCase().trim();
    if (!roman.match(/^[MDCLXVI]+$/i)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Roman numeral");
    }
    input = roman;
    const decimal = romanToDecimal(roman);
    if (isNaN(decimal) || decimal <= 0 || decimal >= 4000) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Roman numeral for decimal conversion");
    }
    output = decimal.toString();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Provide either 'decimal' or 'roman'");
  }

  // Optionally, you can log analytics here if needed

  return {
    input,
    output
  };
};

// Add to service export
// ...
//   convertRomanNumeral,
// ...

// Example Postman payloads:
// Decimal to Roman:
// {
//   "decimal": 10
// }
// Roman to Decimal:
// {
//   "roman": "XII"
// }



/**
 * LTV Calculator Service
 * Calculates Loan-to-Value (LTV) ratio and loan amount based on purchase price and deposit amount.
 * 
 * Payload example:
 * {
 *   "purchasePrice": 500000,
 *   "depositAmount": 100000
 * }
 * 
 * Returns:
 * {
 *   "purchasePrice": 500000,
 *   "depositAmount": 100000,
 *   "loanAmount": 400000,
 *   "ltv": 80
 * }
 */
const calculateLTV = async (data: { purchasePrice: number; depositAmount: number }) => {
  if (
    typeof data.purchasePrice !== "number" ||
    typeof data.depositAmount !== "number" ||
    isNaN(data.purchasePrice) ||
    isNaN(data.depositAmount) ||
    data.purchasePrice <= 0 ||
    data.depositAmount < 0 ||
    data.depositAmount > data.purchasePrice
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Invalid input: purchasePrice must be > 0 and depositAmount must be >= 0 and <= purchasePrice"
    );
  }

  const loanAmount = data.purchasePrice - data.depositAmount;
  const ltv = Number(((loanAmount / data.purchasePrice) * 100).toFixed(2));

  return {
    purchasePrice: data.purchasePrice,
    depositAmount: data.depositAmount,
    loanAmount,
    ltv
  };
};


/**
 * CPM Calculator Service
 * Calculates Cost, Impressions, or CPM based on the provided values.
 * 
 * Payload example to calculate Cost:
 * {
 *   "calculate": "cost", // "cost", "impressions", or "cpm"
 *   "impressions": 10000,
 *   "cpm": 5
 * }
 * 
 * Payload example to calculate Impressions:
 * {
 *   "calculate": "impressions",
 *   "cost": 50,
 *   "cpm": 5
 * }
 * 
 * Payload example to calculate CPM:
 * {
 *   "calculate": "cpm",
 *   "cost": 50,
 *   "impressions": 10000
 * }
 * 
 * Returns:
 * {
 *   "cost": 50,
 *   "impressions": 10000,
 *   "cpm": 5,
 *   "calculated": 50
 * }
 */
const calculateCPM = async (data: {
  calculate: "cost" | "impressions" | "cpm";
  cost?: number;
  impressions?: number;
  cpm?: number;
}) => {
  const { calculate, cost, impressions, cpm } = data;

  if (!["cost", "impressions", "cpm"].includes(calculate)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid 'calculate' value. Must be 'cost', 'impressions', or 'cpm'.");
  }

  let calculated: number | undefined;

  if (calculate === "cost") {
    if (
      typeof impressions !== "number" ||
      typeof cpm !== "number" ||
      isNaN(impressions) ||
      isNaN(cpm) ||
      impressions <= 0 ||
      cpm < 0
    ) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid input: impressions must be > 0 and cpm must be >= 0.");
    }
    calculated = (impressions / 1000) * cpm;
  } else if (calculate === "impressions") {
    if (
      typeof cost !== "number" ||
      typeof cpm !== "number" ||
      isNaN(cost) ||
      isNaN(cpm) ||
      cost < 0 ||
      cpm <= 0
    ) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid input: cost must be >= 0 and cpm must be > 0.");
    }
    calculated = (cost / cpm) * 1000;
  } else if (calculate === "cpm") {
    if (
      typeof cost !== "number" ||
      typeof impressions !== "number" ||
      isNaN(cost) ||
      isNaN(impressions) ||
      cost < 0 ||
      impressions <= 0
    ) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid input: cost must be >= 0 and impressions must be > 0.");
    }
    calculated = (cost / impressions) * 1000;
  }

  // Round to 2 decimal places for currency/CPM, 0 for impressions
  let roundedCalculated: number | undefined;
  if (calculate === "impressions") {
    roundedCalculated = Math.round(calculated!);
  } else {
    roundedCalculated = Number(calculated!.toFixed(2));
  }

  return {
    cost: typeof cost === "number" ? Number(cost.toFixed(2)) : undefined,
    impressions: typeof impressions === "number" ? Math.round(impressions) : undefined,
    cpm: typeof cpm === "number" ? Number(cpm.toFixed(2)) : undefined,
    calculated: roundedCalculated
  };
};


// /**
//  * Fake Name Generator Service
//  * Generates fake names based on language, gender, type (first/last), and count.
//  * 
//  * Payload example:
//  * {
//  *   "language": "English",
//  *   "male": true,
//  *   "female": false,
//  *   "firstName": true,
//  *   "lastName": true,
//  *   "count": 5 // Number of names to generate (2-20)
//  * }
//  * 
//  * Returns:
//  * {
//  *   "results": ["Tabibur Rahman", "Alex Roy", "Mavika Hashi", ...]
//  * }
//  */

// // Example language data (expand as needed, >50 supported)
// const fakeNamesData: Record<string, {
//   maleFirst: string[], femaleFirst: string[], last: string[]
// }> = {
//   "English": {
//     maleFirst: [
//       "Alex", "James", "John", "Michael", "David", "Chris", "Daniel", "Matthew", "Andrew", "Ryan",
//       "Joshua", "Brandon", "Jacob", "Nicholas", "Anthony", "William", "Joseph", "Ethan", "Benjamin", "Samuel"
//     ],
//     femaleFirst: [
//       "Emily", "Jessica", "Ashley", "Sarah", "Amanda", "Brittany", "Samantha", "Elizabeth", "Taylor", "Megan",
//       "Hannah", "Kayla", "Lauren", "Stephanie", "Rachel", "Jennifer", "Nicole", "Alexis", "Victoria", "Mavika"
//     ],
//     last: [
//       "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
//       "Rahman", "Roy", "Hashi", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White"
//     ]
//   },
//   "German": {
//     maleFirst: ["Lukas", "Leon", "Finn", "Jonas", "Paul", "Elias", "Noah", "Luis", "Felix", "Maximilian"],
//     femaleFirst: ["Mia", "Emma", "Hannah", "Sofia", "Anna", "Emilia", "Marie", "Lina", "Lea", "Lena"],
//     last: ["Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker", "Schulz", "Hoffmann"]
//   },
//   "Spanish": {
//     maleFirst: ["Juan", "Carlos", "Luis", "Javier", "Miguel", "Jose", "Antonio", "Manuel", "Francisco", "David"],
//     femaleFirst: ["Maria", "Carmen", "Josefa", "Isabel", "Ana", "Laura", "Marta", "Cristina", "Lucia", "Sara"],
//     last: ["García", "Martínez", "López", "Sánchez", "Pérez", "González", "Rodríguez", "Fernández", "Ruiz", "Gómez"]
//   },
//   "Danish": {
//     maleFirst: ["Mads", "Magnus", "Emil", "Frederik", "Oliver", "William", "Noah", "Victor", "Lucas", "Oscar"],
//     femaleFirst: ["Ida", "Emma", "Clara", "Freja", "Sofie", "Anna", "Laura", "Alma", "Ella", "Luna"],
//     last: ["Jensen", "Nielsen", "Hansen", "Pedersen", "Andersen", "Christensen", "Larsen", "Sørensen", "Rasmussen", "Jørgensen"]
//   },
//   // ... add more than 50 languages as needed
//   "Bengali": {
//     maleFirst: ["Tabibur", "Rahman", "Arif", "Hasan", "Sabbir", "Rafi", "Sakib", "Tanvir", "Imran", "Shuvo"],
//     femaleFirst: ["Mavika", "Hashi", "Sumaiya", "Nusrat", "Rima", "Tania", "Farzana", "Mou", "Rupa", "Jannat"],
//     last: ["Rahman", "Hasan", "Roy", "Islam", "Ahmed", "Khan", "Mia", "Das", "Paul", "Sarkar"]
//   }
//   // ... etc.
// };

// const getLanguageList = () => Object.keys(fakeNamesData);

// const generateFakeName = async (data: any) => {
//   const {
//     language = "English",
//     male = false,
//     female = false,
//     firstName = false,
//     lastName = false,
//     count = 5
//   } = data;

//   // Validate language
//   if (!fakeNamesData[language]) {
//     throw new ApiError(httpStatus.BAD_REQUEST, `Language "${language}" is not supported. Supported: ${getLanguageList().join(", ")}`);
//   }

//   // Validate count
//   const numNames = Number(count);
//   if (isNaN(numNames) || numNames < 2 || numNames > 20) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "No. of Names must be between 2 and 20.");
//   }

//   // At least one gender must be selected
//   if (!male && !female) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "At least one gender (Male or Female) must be selected.");
//   }

//   // If neither firstName nor lastName is selected, default to firstName
//   const useFirstName = firstName || (!firstName && !lastName);
//   const useLastName = lastName;

//   const langData = fakeNamesData[language];

//   // Build pools
//   let firstPool: string[] = [];
//   if (useFirstName) {
//     if (male && female) {
//       firstPool = firstPool.concat(langData.maleFirst, langData.femaleFirst);
//     } else if (male) {
//       firstPool = firstPool.concat(langData.maleFirst);
//     } else if (female) {
//       firstPool = firstPool.concat(langData.femaleFirst);
//     }
//   }
//   let lastPool: string[] = [];
//   if (useLastName) {
//     lastPool = lastPool.concat(langData.last);
//   }

//   let results: string[] = [];

//   if (useFirstName && useLastName) {
//     // Generate full names: "firstname lastname"
//     for (let i = 0; i < numNames; i++) {
//       const first = firstPool[Math.floor(Math.random() * firstPool.length)];
//       const last = lastPool[Math.floor(Math.random() * lastPool.length)];
//       results.push(`${first} ${last}`);
//   if (pool.length === 0) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "No name type selected.");
//   }

//   // Shuffle pool and pick unique names
//   const shuffled = pool
//     .map(value => ({ value, sort: Math.random() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({ value }) => value);

//   // If not enough unique names, allow duplicates
//   let results: string[] = [];
//   if (shuffled.length >= numNames) {
//     results = shuffled.slice(0, numNames);
//   } else {
//     // Fill with random picks (with possible duplicates)
//     while (results.length < numNames) {
//       results.push(pool[Math.floor(Math.random() * pool.length)]);
//     }
//   }

//   return { results };
// };



/**
 * Random Word Generator Service
 * Accepts:
 *   - numberOfGenerations: number (required)
 *   - type: "all" | "verbs" | "nouns" | "adjectives" (optional, default: "all")
 * Returns:
 *   - results: string[]
 *
 * Example Postman Payload (JSON):
 * {
 *   "numberOfGenerations": 5,
 *   "type": "verbs"
 * }
 *
 * Example Postman Payload for all types (default):
 * {
 *   "numberOfGenerations": 3
 * }
 */
const randomWordsData = {
  all: [
    "amazing", "weigh", "shirt", "incompetent", "messy", "run", "jump", "table", "happy", "blue", "cat", "dog", "write", "sing", "quick", "slow", "apple", "banana", "drive", "swim", "strong", "weak", "beautiful", "ugly", "laugh", "cry", "book", "pen", "walk", "talk"
  ],
  verbs: [
    "run", "jump", "write", "sing", "drive", "swim", "walk", "talk", "laugh", "cry", "weigh"
  ],
  nouns: [
    "shirt", "table", "cat", "dog", "apple", "banana", "book", "pen"
  ],
  adjectives: [
    "amazing", "incompetent", "messy", "happy", "blue", "quick", "slow", "strong", "weak", "beautiful", "ugly"
  ]
};

const generateRandomWord = (payload: { numberOfGenerations: number, type?: string }) => {
  let { numberOfGenerations, type } = payload;
  if (!numberOfGenerations || typeof numberOfGenerations !== "number" || numberOfGenerations < 1) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide a valid number of generations.");
  }
  type = (type || "all").toLowerCase();
  let pool: string[] = [];
  switch (type) {
    case "verbs":
      pool = randomWordsData.verbs;
      break;
    case "nouns":
      pool = randomWordsData.nouns;
      break;
    case "adjectives":
      pool = randomWordsData.adjectives;
      break;
    case "all":
    default:
      pool = randomWordsData.all;
      break;
  }
  if (pool.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No words available for the selected type.");
  }
  // Shuffle and pick unique, or allow duplicates if not enough
  let results: string[] = [];
  const shuffled = pool
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  if (shuffled.length >= numberOfGenerations) {
    results = shuffled.slice(0, numberOfGenerations);
  } else {
    results = shuffled.slice();
    while (results.length < numberOfGenerations) {
      results.push(pool[Math.floor(Math.random() * pool.length)]);
    }
  }
  return { results };
};



/**
 * EPS Calculator Service
 * Calculates Earnings Per Share (EPS) given net income and number of shares.
 * 
 * @param payload { netIncome: number, numberOfShares: number }
 * @returns { eps: number }
 * 
 * Postman Payload Example:
 * {
 *   "netIncome": 100000,
 *   "numberOfShares": 5000
 * }
 */
const calculateEPS = (payload: { netIncome: number, numberOfShares: number }) => {
  const { netIncome, numberOfShares } = payload;

  if (
    typeof netIncome !== "number" ||
    typeof numberOfShares !== "number" ||
    isNaN(netIncome) ||
    isNaN(numberOfShares) ||
    numberOfShares <= 0
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide valid netIncome and numberOfShares (numberOfShares must be greater than 0).");
  }

  const eps = netIncome / numberOfShares;
  return { eps: Number(eps.toFixed(4)) };
};


/**
 * Sales Tax Calculator Service
 * Calculates the sales tax amount and total price based on sales tax percentage and net price.
 * 
 * @param payload { salesTaxPercent: number, netPrice: number }
 * @returns { salesTaxAmount: number, totalPrice: number }
 * 
 * Postman Payload Example:
 * {
 *   "salesTaxPercent": 8.5,
 *   "netPrice": 100
 * }
 */
const calculateSalesTax = (payload: { salesTaxPercent: number, netPrice: number }) => {
  const { salesTaxPercent, netPrice } = payload;

  if (
    typeof salesTaxPercent !== "number" ||
    typeof netPrice !== "number" ||
    isNaN(salesTaxPercent) ||
    isNaN(netPrice) ||
    salesTaxPercent < 0 ||
    netPrice < 0
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide valid salesTaxPercent (>= 0) and netPrice (>= 0).");
  }

  const salesTaxAmount = Number(((salesTaxPercent / 100) * netPrice).toFixed(2));
  const totalPrice = Number((netPrice + salesTaxAmount).toFixed(2));

  return { salesTaxAmount, totalPrice };
};


/**
 * Average Calculator Service
 * Calculates the average of a list of numbers.
 * 
 * @param payload { values: number[] }
 * @returns { average: number }
 * 
 * Postman Payload Example:
 * {
 *   "values": [10, 20, 30, 40, 50, 60]
 * }
 */
const calculateAverage = (payload: { values: number[] }) => {
  const { values } = payload;

  if (
    !Array.isArray(values) ||
    values.length === 0 ||
    values.some(v => typeof v !== "number" || isNaN(v))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide an array of valid numbers in 'values'.");
  }

  const sum = values.reduce((acc, curr) => acc + curr, 0);
  const average = sum / values.length;

  return { average: Number(average.toFixed(4)) };
};

/**
 * Words to Pages Service
 * Calculates the estimated number of pages based on word count, font family, font size, and spacing.
 * 
 * @param payload {
 *   words?: number,
 *   text?: string,
 *   fontFamily?: "Arial" | "Calibri" | "Comic Sans" | "Courier" | "Verdana" | "Times New Roman",
 *   fontSize?: 9 | 10 | 11 | 12 | 13 | 14,
 *   spacing?: 1 | 1.5 | 2
 * }
 * @returns { pages: number, sheets: number }
 * 
 * Postman Payload Example:
 * {
 *   "text": "hello",
 *   "fontFamily": "Comic Sans",
 *   "fontSize": 12,
 *   "spacing": 2
 * }
 */

const wordsPerPageTable: Record<
  string,
  Record<number, Record<number, number>>
> = {
  "Arial": {
    9: { 1: 580, 1.5: 387, 2: 290 },
    10: { 1: 516, 1.5: 344, 2: 258 },
    11: { 1: 469, 1.5: 313, 2: 235 },
    12: { 1: 426, 1.5: 284, 2: 213 },
    13: { 1: 393, 1.5: 262, 2: 197 },
    14: { 1: 366, 1.5: 244, 2: 183 }
  },
  "Calibri": {
    9: { 1: 600, 1.5: 400, 2: 300 },
    10: { 1: 540, 1.5: 360, 2: 270 },
    11: { 1: 490, 1.5: 327, 2: 245 },
    12: { 1: 450, 1.5: 300, 2: 225 },
    13: { 1: 420, 1.5: 280, 2: 210 },
    14: { 1: 390, 1.5: 260, 2: 195 }
  },
  "Comic Sans": {
    9: { 1: 540, 1.5: 360, 2: 270 },
    10: { 1: 480, 1.5: 320, 2: 240 },
    11: { 1: 430, 1.5: 287, 2: 215 },
    12: { 1: 400, 1.5: 267, 2: 200 },
    13: { 1: 370, 1.5: 247, 2: 185 },
    14: { 1: 350, 1.5: 233, 2: 175 }
  },
  "Courier": {
    9: { 1: 500, 1.5: 333, 2: 250 },
    10: { 1: 450, 1.5: 300, 2: 225 },
    11: { 1: 410, 1.5: 273, 2: 205 },
    12: { 1: 380, 1.5: 253, 2: 190 },
    13: { 1: 355, 1.5: 237, 2: 178 },
    14: { 1: 335, 1.5: 223, 2: 167 }
  },
  "Verdana": {
    9: { 1: 520, 1.5: 347, 2: 260 },
    10: { 1: 470, 1.5: 313, 2: 235 },
    11: { 1: 430, 1.5: 287, 2: 215 },
    12: { 1: 400, 1.5: 267, 2: 200 },
    13: { 1: 370, 1.5: 247, 2: 185 },
    14: { 1: 350, 1.5: 233, 2: 175 }
  },
  "Times New Roman": {
    9: { 1: 600, 1.5: 400, 2: 300 },
    10: { 1: 550, 1.5: 367, 2: 275 },
    11: { 1: 500, 1.5: 333, 2: 250 },
    12: { 1: 450, 1.5: 300, 2: 225 },
    13: { 1: 420, 1.5: 280, 2: 210 },
    14: { 1: 390, 1.5: 260, 2: 195 }
  }
};

/**
 * Calculates the estimated number of pages and sheets based on the input payload.
 * 
 * @param payload
 * @returns { pages: number, sheets: number }
 */
const wordsToPages = (payload: {
  words?: number,
  text?: string,
  fontFamily?: "Arial" | "Calibri" | "Comic Sans" | "Courier" | "Verdana" | "Times New Roman",
  fontSize?: 9 | 10 | 11 | 12 | 13 | 14,
  spacing?: 1 | 1.5 | 2
}) => {
  let { words, text, fontFamily, fontSize, spacing } = payload;

  // Default values
  fontFamily = fontFamily || "Times New Roman";
  fontSize = fontSize || 12;
  spacing = spacing || 2;

  // Validate fontFamily, fontSize, spacing
  if (
    !wordsPerPageTable[fontFamily] ||
    !wordsPerPageTable[fontFamily][fontSize] ||
    !wordsPerPageTable[fontFamily][fontSize][spacing]
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid fontFamily, fontSize, or spacing value.");
  }

  // Calculate word count
  if (typeof words !== "number" || isNaN(words) || words < 0) {
    if (typeof text === "string") {
      // Count words in text
      words = text.trim().split(/\s+/).filter(Boolean).length;
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Please provide a valid 'words' number or a 'text' string.");
    }
  }

  if (words === 0) {
    return { pages: 0, sheets: 0 };
  }

  const wordsPerPage = wordsPerPageTable[fontFamily][fontSize][spacing];
  const pages = Number((words / wordsPerPage).toFixed(2));
  const sheets = Number((pages / 2).toFixed(2));

  return { pages, sheets };
};



/**
 * Pre and Post Money Valuation Calculator
 * 
 * @param payload
 *   preMoney: number (optional)
 *   postMoney: number (optional)
 *   investment: number (optional)
 * 
 * At least two of the three values must be provided.
 * Returns: { preMoney: number, postMoney: number, investment: number }
 */
const calculateValuation = (payload: {
  preMoney?: number,
  postMoney?: number,
  investment?: number
}) => {
  // Convert string inputs to numbers if necessary
  let preMoney = payload.preMoney;
  let postMoney = payload.postMoney;
  let investment = payload.investment;

  // Try to coerce string numbers to actual numbers
  if (typeof preMoney === "string") preMoney = Number(preMoney);
  if (typeof postMoney === "string") postMoney = Number(postMoney);
  if (typeof investment === "string") investment = Number(investment);

  // Count how many are provided
  const provided = [preMoney, postMoney, investment].filter(
    v => typeof v === "number" && !isNaN(v)
  );
  if (provided.length < 2) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide at least two of: preMoney, postMoney, investment.");
  }

  // Calculate the missing value
  if (typeof preMoney === "number" && !isNaN(preMoney) && typeof investment === "number" && !isNaN(investment)) {
    postMoney = preMoney + investment;
  } else if (typeof postMoney === "number" && !isNaN(postMoney) && typeof investment === "number" && !isNaN(investment)) {
    preMoney = postMoney - investment;
  } else if (typeof preMoney === "number" && !isNaN(preMoney) && typeof postMoney === "number" && !isNaN(postMoney)) {
    investment = postMoney - preMoney;
  }

  // Validate results
  if (
    typeof preMoney !== "number" ||
    typeof postMoney !== "number" ||
    typeof investment !== "number" ||
    isNaN(preMoney) ||
    isNaN(postMoney) ||
    isNaN(investment)
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid input values for valuation calculation.");
  }

  return {
    preMoney: Number(preMoney),
    postMoney: Number(postMoney),
    investment: Number(investment)
  };
};



/**
 * Confidence Interval Calculator Service
 * Calculates the lower and upper bounds (confidence interval) for a given sample mean, standard deviation, sample size, and confidence level.
 * 
 * @param payload {
 *   confidenceLevel: number, // e.g., 0.95 for 95%
 *   mean: number,            // sample mean
 *   stdDev: number,          // standard deviation
 *   sampleSize: number       // sample size (n)
 * }
 * @returns { lowerBound: number, upperBound: number, mean: number, stdDev: number, marginOfError: number }
 * 
 * Example Payload:
 * {
 *   "confidenceLevel": 0.95,
 *   "mean": 70,
 *   "stdDev": 5,
 *   "sampleSize": 50
 * }
 */
const calculateBounds = async (payload: { confidenceLevel?: number, mean: number, stdDev: number, sampleSize: number }) => {
  let { confidenceLevel = 0.95, mean, stdDev, sampleSize } = payload;

  // Convert string inputs to numbers if necessary
  if (typeof confidenceLevel === "string") confidenceLevel = Number(confidenceLevel);
  if (typeof mean === "string") mean = Number(mean);
  if (typeof stdDev === "string") stdDev = Number(stdDev);
  if (typeof sampleSize === "string") sampleSize = Number(sampleSize);

  // Validate inputs
  if (
    typeof mean !== "number" || isNaN(mean) ||
    typeof stdDev !== "number" || isNaN(stdDev) || stdDev < 0 ||
    typeof sampleSize !== "number" || isNaN(sampleSize) || sampleSize < 2 ||
    typeof confidenceLevel !== "number" || isNaN(confidenceLevel)
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide valid values for mean, stdDev, sampleSize (>=2), and confidenceLevel.");
  }

  // Z-table for common confidence levels
  const zTable: Record<number, number> = {
    0.80: 1.282,
    0.85: 1.440,
    0.90: 1.645,
    0.95: 1.96,
    0.98: 2.326,
    0.99: 2.576
  };
  const z = zTable[confidenceLevel] || 1.96;

  // Calculate margin of error
  const marginOfError = z * (stdDev / Math.sqrt(sampleSize));

  const lowerBound = mean - marginOfError;
  const upperBound = mean + marginOfError;

  return {
    lowerBound: Number(lowerBound.toFixed(4)),
    upperBound: Number(upperBound.toFixed(4)),
    mean: Number(mean.toFixed(4)),
    stdDev: Number(stdDev.toFixed(4)),
    marginOfError: Number(marginOfError.toFixed(4))
  };
};




/**
 * Calculates margin and margin percentage based on cost and selling price.
 * @param payload { cost: number, sellingPrice: number }
 * @returns { margin: number, marginPercentage: number }
 */
const calculateMargin = async (payload: { cost: number, sellingPrice: number }) => {
  let { cost, sellingPrice } = payload;

  // Convert string inputs to numbers if necessary
  if (typeof cost === "string") cost = Number(cost);
  if (typeof sellingPrice === "string") sellingPrice = Number(sellingPrice);

  // Validate inputs
  if (
    typeof cost !== "number" || isNaN(cost) || cost < 0 ||
    typeof sellingPrice !== "number" || isNaN(sellingPrice) || sellingPrice < 0
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide valid values for cost and sellingPrice (both >= 0).");
  }

  const margin = sellingPrice - cost;
  const marginPercentage = sellingPrice === 0 ? 0 : (margin / sellingPrice) * 100;

  return {
    margin: Number(margin.toFixed(4)),
    marginPercentage: Number(marginPercentage.toFixed(2))
  };
};



/**
 * Calculates age based on date of birth.
 * @param payload { dob: string } // dob in 'YYYY-MM-DD' format
 * @returns { years: number, months: number, days: number }
 */
const calculateAge = async (payload: { dob: string }) => {
  let { dob } = payload;

  if (!dob || typeof dob !== "string") {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide a valid date of birth in 'YYYY-MM-DD' format.");
  }

  // Parse the date of birth
  const dobDate = new Date(dob);
  if (isNaN(dobDate.getTime())) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid date of birth format. Use 'YYYY-MM-DD'.");
  }

  const today = new Date();
  let years = today.getFullYear() - dobDate.getFullYear();
  let months = today.getMonth() - dobDate.getMonth();
  let days = today.getDate() - dobDate.getDate();

  if (days < 0) {
    months -= 1;
    // Get days in previous month
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years < 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Date of birth cannot be in the future.");
  }

  return {
    years,
    months,
    days
  };
};





/**
 * Converts JPG to Word (Placeholder Service)
 * @param payload { file: string } // base64 or file path
 * @returns { wordFile: string } // base64 or file path
 */
const convertJPGToWord = async (payload: { file: string }) => {
  // Placeholder implementation
  if (!payload.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No JPG file provided.");
  }
  // In a real implementation, convert the JPG to Word here.
  return {
    wordFile: "word-file-placeholder.docx"
  };
};

/**
 * Converts PDF to Word (Placeholder Service)
 * @param payload { file: string } // base64 or file path
 * @returns { wordFile: string } // base64 or file path
 */
const convertPDFToWord = async (payload: { file: string }) => {
  // Placeholder implementation
  if (!payload.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No PDF file provided.");
  }
  // In a real implementation, convert the PDF to Word here.
  return {
    wordFile: "word-file-placeholder.docx"
  };
};

/**
 * Converts text to image (Placeholder Service)
 * @param payload { text: string }
 * @returns { image: string } // base64 or file path
 */
const convertTextToImage = async (payload: { text: string }) => {
  if (!payload.text) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No text provided.");
  }
  // In a real implementation, convert the text to an image here.
  return {
    image: "image-placeholder.png"
  };
};

/**
 * Converts PDF to text (Placeholder Service)
 * @param payload { file: string } // base64 or file path
 * @returns { text: string }
 */
const convertPDFToText = async (payload: { file: string }) => {
  if (!payload.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No PDF file provided.");
  }
  // In a real implementation, extract text from the PDF here.
  return {
    text: "extracted text placeholder"
  };
};




/**
 * Calculates GST (Goods and Services Tax)
 * @param payload { amount: number, gstRate: number }
 * @returns { gstAmount: number, totalAmount: number }
 */
const calculateGST = async (payload: { amount: number, gstRate: number }) => {
  const { amount, gstRate } = payload;
  if (typeof amount !== "number" || typeof gstRate !== "number") {
    throw new ApiError(httpStatus.BAD_REQUEST, "Amount and GST rate must be numbers.");
  }
  if (amount < 0 || gstRate < 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Amount and GST rate must be non-negative.");
  }
  const gstAmount = +(amount * (gstRate / 100)).toFixed(2);
  const totalAmount = +(amount + gstAmount).toFixed(2);
  return {
    gstAmount,
    totalAmount
  };
};


/**
 * Probability Calculator Service
 * Calculates the probability of events A, B, and (if both provided) the probability of both A and B occurring (assuming independence).
 * 
 * @param payload {
 *   total: number,         // Number of possible outcomes (e.g., 100)
 *   eventA: number,        // Number of times event A occurs (e.g., 10)
 *   eventB?: number        // (Optional) Number of times event B occurs (e.g., 5)
 * }
 * @returns {
 *   probabilityA: number, percentageA: number,
 *   probabilityB?: number, percentageB?: number,
 *   probabilityAandB?: number, percentageAandB?: number
 * }
 * 
 * Example Payload:
 * {
 *   "total": 100,
 *   "eventA": 10,
 *   "eventB": 5
 * }
 */
const calculateProbability = async (payload: { total: number, eventA: number, eventB?: number }) => {
  let { total, eventA, eventB } = payload;

  // Convert string inputs to numbers if necessary
  if (typeof total === "string") total = Number(total);
  if (typeof eventA === "string") eventA = Number(eventA);
  if (typeof eventB === "string") eventB = Number(eventB);

  // Validate inputs
  if (
    typeof total !== "number" || isNaN(total) || total <= 0 ||
    typeof eventA !== "number" || isNaN(eventA) || eventA < 0 || eventA > total ||
    (eventB !== undefined && (typeof eventB !== "number" || isNaN(eventB) || eventB < 0 || eventB > total))
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Please provide valid values: total > 0, 0 <= eventA <= total, and (if provided) 0 <= eventB <= total."
    );
  }

  const probabilityA = eventA / total;
  const percentageA = +(probabilityA * 100).toFixed(2);

  let result: any = {
    probabilityA: +probabilityA.toFixed(4),
    percentageA
  };

  if (typeof eventB === "number" && !isNaN(eventB)) {
    const probabilityB = eventB / total;
    const percentageB = +(probabilityB * 100).toFixed(2);

    // Probability of both A and B (assuming independence)
    const probabilityAandB = probabilityA * probabilityB;
    const percentageAandB = +(probabilityAandB * 100).toFixed(2);

    result = {
      ...result,
      probabilityB: +probabilityB.toFixed(4),
      percentageB,
      probabilityAandB: +probabilityAandB.toFixed(4),
      percentageAandB
    };
  }

  return result;
};




//==========================================================================

// Helper functions
const convertToRoman = (date: string) => {
  // Simple implementation - convert date to Roman numerals
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const parts = date.split('-');
  return `${romanNumerals[parseInt(parts[1]) - 1]} ${parts[2]}, ${parts[0]}`;
};

const convertFromRoman = (romanDate: string) => {
  // Simple implementation - convert Roman numerals back to date
  return "2024-01-01"; // Placeholder
};

const binaryToText = (binary: string) => {
  const binaryArray = binary.split(' ');
  return binaryArray.map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
};

const binaryToDecimal = (binary: string) => {
  return parseInt(binary, 2);
};

// Export all functions
export const MoreToolsService = {
  scanQRCode,
  convertRomanNumeralsDate,
  translateBinary,
  generateRandomAddress,
  calculateDiscount,
  convertBinaryToHex,
  convertDecimalToOctal,
  convertOctalToDecimal,
  convertHEXToRGB,
  calculateOctal,
  calculatePercentage,
  convertDecimalToASCII,
  convertTextToHEX,
  calculateAdsense,
  calculatePaypalFee,
  generateUpsideDownText,
  // Add more functions as needed
  generatePassword,
  generateReverseText,
  convertRomanNumeral,
  calculateLTV,
  calculateCPM,
  // generateFakeName
  generateRandomWord,
  calculateEPS,
  calculateSalesTax,
  calculateAverage,
  wordsToPages,
  calculateValuation,
  calculateBounds,
  calculateMargin,
  calculateAge,
  calculateGST,
  calculateProbability

}; 