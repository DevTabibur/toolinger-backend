"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPGenerator = OTPGenerator;
function OTPGenerator(length) {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
}
