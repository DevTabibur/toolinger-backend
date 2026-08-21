"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_MODE_DEV = exports.IS_MODE_PROD = exports.NODE_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
/* This code is using the `dotenv` package to load environment variables from a `.env` file located in
the root directory of the project. process.cwd() means the root directory */
dotenv_1.default.config({
    path: path_1.default.join(process.cwd(), ".env"),
});
exports.NODE_ENV = {
    PROD: "production",
    DEV: "development",
};
exports.IS_MODE_PROD = process.env.NODE_ENV === exports.NODE_ENV.PROD;
exports.IS_MODE_DEV = process.env.NODE_ENV === exports.NODE_ENV.DEV;
exports.default = {
    base_url: process.env.BASE_URL,
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5000,
    allowed_origin_prod: process.env.ALLOWED_ORIGIN_PROD,
    allowed_origin_dev: process.env.ALLOWED_ORIGIN_DEV,
    database_string: process.env.DATABASE_STRING,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    jwt: {
        accessToken: process.env.ACCESS_TOKEN,
        accessToken_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
        refreshToken: process.env.REFRESH_TOKEN,
        refreshToken_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    },
    // stripe: {
    //   stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    // },
    // sms_api_key: process.env.SMS_API_KEY,
    // sms_api_sender_id: process.env.SMS_SENDER_ID,
    // sms_api_url: process.env.SMS_API_URL,
    reset_link: process.env.RESET_PASS_UI_LINK,
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS,
    zeptomail: {
        url: process.env.ZEPTOMAIL_URL,
        token: process.env.ZEPTOMAIL_TOKEN,
    },
};
