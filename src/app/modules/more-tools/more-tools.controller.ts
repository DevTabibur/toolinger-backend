import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import { MoreToolsService } from "./more-tools.service";

// QR Code Scanner
const scanQRCode = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.scanQRCode(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "QR code scanned successfully",
    data: result,
  });
});

// Roman Numerals Date Converter
const convertRomanNumeralsDate = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.convertRomanNumeralsDate(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Roman numerals date converted successfully",
    data: result,
  });
});

// Binary Translator
const translateBinary = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.translateBinary(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Binary translated successfully",
    data: result,
  });
});



// Random Address Generator
const generateRandomAddress = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.generateRandomAddress(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Random address generated successfully",
    data: result,
  });
});

// Discount Calculator
const calculateDiscount = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculateDiscount(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Discount calculated successfully",
    data: result,
  });
});

// Binary To Hex
const convertBinaryToHex = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.convertBinaryToHex(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Binary converted to hex successfully",
    data: result,
  });
});

// Decimal To Octal
const convertDecimalToOctal = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.convertDecimalToOctal(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Decimal converted to octal successfully",
    data: result,
  });
});

// Octal To Decimal
const convertOctalToDecimal = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.convertOctalToDecimal(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Octal converted to decimal successfully",
    data: result,
  });
});

// HEX To RGB
const convertHEXToRGB = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.convertHEXToRGB(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "HEX converted to RGB successfully",
    data: result,
  });
});

// Octal Calculator
const calculateOctal = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculateOctal(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Octal calculation completed successfully",
    data: result,
  });
});

// Percentage Calculator
const calculatePercentage = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculatePercentage(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Percentage calculated successfully",
    data: result,
  });
});

// Decimal to ASCII
const convertDecimalToASCII = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.convertDecimalToASCII(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Decimal converted to ASCII successfully",
    data: result,
  });
});

// Text to HEX
const convertTextToHEX = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.convertTextToHEX(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Text converted to HEX successfully",
    data: result,
  });
});

// Adsense Calculator
const calculateAdsense = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculateAdsense(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Adsense calculated successfully",
    data: result,
  });
});

// Paypal Fee Calculator
const calculatePaypalFee = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculatePaypalFee(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "PayPal fee calculated successfully",
    data: result,
  });
});

// Upside Down Text Generator
const generateUpsideDownText = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.generateUpsideDownText(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Upside down text generated successfully",
    data: result,
  });
});

// Decimal To Binary
// const convertDecimalToBinary = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertDecimalToBinary(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Decimal converted to binary successfully",
//     data: result,
//   });
// });

// Cpc Calculator
// const calculateCPC = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.calculateCPC(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "CPC calculated successfully",
//     data: result,
//   });
// });

// Hex To Decimal
// const convertHexToDecimal = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertHexToDecimal(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Hex converted to decimal successfully",
//     data: result,
//   });
// });

// Hex To Binary
// const convertHexToBinary = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertHexToBinary(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Hex converted to binary successfully",
//     data: result,
//   });
// });

// Hex To Octal
// const convertHexToOctal = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertHexToOctal(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Hex converted to octal successfully",
//     data: result,
//   });
// });

// Octal To Hex
// const convertOctalToHex = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertOctalToHex(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Octal converted to hex successfully",
//     data: result,
//   });
// });

// Binary Calculator
// const calculateBinary = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.calculateBinary(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Binary calculation completed successfully",
//     data: result,
//   });
// });

// ASCII To Text
// const convertASCIIToText = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertASCIIToText(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "ASCII converted to text successfully",
//     data: result,
//   });
// });

// ASCII To Decimal
// const convertASCIIToDecimal = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertASCIIToDecimal(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "ASCII converted to decimal successfully",
//     data: result,
//   });
// });

// HEX to ASCII
// const convertHEXToASCII = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertHEXToASCII(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "HEX converted to ASCII successfully",
//     data: result,
//   });
// });

// Password Generator
const generatePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.generatePassword(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Password generated successfully",
    data: result,
  });
});

// Reverse Text Generator
const generateReverseText = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.generateReverseText(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Reverse text generated successfully",
    data: result,
  });
});

// Roman Numeral Converter
const convertRomanNumeral = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.convertRomanNumeral(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Roman numeral converted successfully",
    data: result,
  });
});

// LTV Calculator
const calculateLTV = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculateLTV(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "LTV calculated successfully",
    data: result,
  });
});

// Binary To Decimal
// const convertBinaryToDecimal = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertBinaryToDecimal(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Binary converted to decimal successfully",
//     data: result,
//   });
// });

// CPM Calculator
const calculateCPM = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculateCPM(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "CPM calculated successfully",
    data: result,
  });
});

// Decimal To Hex
// const convertDecimalToHex = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertDecimalToHex(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Decimal converted to hex successfully",
//     data: result,
//   });
// });

// Binary To Octal
// const convertBinaryToOctal = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertBinaryToOctal(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Binary converted to octal successfully",
//     data: result,
//   });
// });

// Octal To Binary
// const convertOctalToBinary = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertOctalToBinary(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Octal converted to binary successfully",
//     data: result,
//   });
// });

// Case Converter
// const convertCase = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertCase(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Case converted successfully",
//     data: result,
//   });
// });

// HEX Calculator
// const calculateHEX = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.calculateHEX(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "HEX calculation completed successfully",
//     data: result,
//   });
// });

// Text To ASCII
// const convertTextToASCII = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertTextToASCII(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Text converted to ASCII successfully",
//     data: result,
//   });
// });

// ASCII to HEX
// const convertASCIIToHEX = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertASCIIToHEX(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "ASCII converted to HEX successfully",
//     data: result,
//   });
// });

// HEX to Text
// const convertHEXToText = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertHEXToText(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "HEX converted to text successfully",
//     data: result,
//   });
// });

// Fake Name Generator
// const generateFakeName = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.generateFakeName(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Fake name generated successfully",
//     data: result,
//   });
// });

// Text to HEX (duplicate - keeping for consistency)
const convertTextToHEX2 = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.convertTextToHEX(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Text converted to HEX successfully",
    data: result,
  });
});

// Random Word Generator
const generateRandomWord = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.generateRandomWord(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Random word generated successfully",
    data: result,
  });
});

// Earnings Per Share Calculator
const calculateEPS = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculateEPS(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "EPS calculated successfully",
    data: result,
  });
});

// Sales Tax Calculator
const calculateSalesTax = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculateSalesTax(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Sales tax calculated successfully",
    data: result,
  });
});

// Average Calculator
const calculateAverage = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculateAverage(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Average calculated successfully",
    data: result,
  });
});

// Words to Pages
// const convertWordsToPages = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertWordsToPages(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Words converted to pages successfully",
//     data: result,
//   });
// });

// Text to Handwriting
// const convertTextToHandwriting = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertTextToHandwriting(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Text converted to handwriting successfully",
//     data: result,
//   });
// });

// Online Text Editor
// const editTextOnline = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.editTextOnline(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Text edited successfully",
//     data: result,
//   });
// });

// Probability Calculator
const calculateProbability = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculateProbability(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Probability calculated successfully",
    data: result,
  });
});

// GST Calculator
const calculateGST = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculateGST(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "GST calculated successfully",
    data: result,
  });
});

// Age Calculator
const calculateAge = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculateAge(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Age calculated successfully",
    data: result,
  });
});

// JPG To Word
// const convertJPGToWord = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertJPGToWord(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "JPG converted to Word successfully",
//     data: result,
//   });
// });

// PDF to Word
// const convertPDFToWord = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertPDFToWord(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "PDF converted to Word successfully",
//     data: result,
//   });
// });

// Text to Image
// const convertTextToImage = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertTextToImage(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Text converted to image successfully",
//     data: result,
//   });
// });

// Margin Calculator
const calculateMargin = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculateMargin(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Margin calculated successfully",
    data: result,
  });
});

// Lower and Upper Bound Calculator
const calculateBounds = catchAsync(async (req: Request, res: Response) => {
  const result = await MoreToolsService.calculateBounds(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Bounds calculated successfully",
    data: result,
  });
});

// Pre and Post Money Valuation
const calculateValuation = catchAsync(async (req: Request, res: Response) => {
  const result =await  MoreToolsService.calculateValuation(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Valuation calculated successfully",
    data: result,
  });
});

// PDF to Text
// const convertPDFToText = catchAsync(async (req: Request, res: Response) => {
//   const result = await MoreToolsService.convertPDFToText(req.body);
//   sendSuccessResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "PDF converted to text successfully",
//     data: result,
//   });
// }); 

export const MoreToolsController = {
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
  // convertDecimalToBinary,
  // calculateCPC,
  // convertHexToDecimal,
  // convertHexToBinary,
  // convertHexToOctal,
  // convertOctalToHex,
  // calculateBinary,
  // convertASCIIToText,
  // convertASCIIToDecimal,
  // convertHEXToASCII,
  generatePassword,
  generateReverseText,
  convertRomanNumeral,
  calculateLTV,
  calculateCPM,
  // convertBinaryToDecimal,
  // convertDecimalToHex,
  // convertBinaryToOctal,
  // convertOctalToBinary,
  // convertCase,
  // calculateHEX,
  // convertTextToASCII,
  // convertASCIIToHEX,
  // convertHEXToText,
  // generateFakeName,
  convertTextToHEX2,
  generateRandomWord,
  calculateEPS,
  calculateSalesTax,
  calculateAverage,
  // convertWordsToPages,
  // convertTextToHandwriting,
  // editTextOnline,
  calculateProbability,
  calculateGST,
  calculateAge,
  // convertJPGToWord,
  // convertPDFToWord,
  // convertTextToImage,
  calculateMargin,
  calculateBounds,
  calculateValuation,
  // convertPDFToText,
}; 