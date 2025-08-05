import dotenv from "dotenv";
import path from "path";
/* This code is using the `dotenv` package to load environment variables from a `.env` file located in
the root directory of the project. process.cwd() means the root directory */
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export const NODE_ENV = {
  PROD: "production",
  DEV: "development",
} as const;

export const IS_MODE_PROD = process.env.NODE_ENV === NODE_ENV.PROD;
export const IS_MODE_DEV = process.env.NODE_ENV === NODE_ENV.DEV;

export default {
  base_url: process.env.BASE_URL,
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  allowed_origin_prod: process.env.ALLOWED_ORIGIN_PROD,
  allowed_origin_dev: process.env.ALLOWED_ORIGIN_DEV,
  mapbox_access_token: process.env.MAPBOX_ACCESS_TOKEN,
  database_string: process.env.DATABASE_STRING,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  email: process.env.NODEMAILER_EMAIL,
  app_pass: process.env.NODEMAILER_APP_PASS,
  youtube_mp3_or_mp4_downlaod:
    process.env.YT_TO_MP3_OR_MP4_CONVERTER_AND_DOWNLOADER_PASS_KEY,
  jwt: {
    accessToken: process.env.ACCESS_TOKEN,
    accessToken_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
  },
  stripe: {
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  },
  sms_api_key: process.env.SMS_API_KEY,
  sms_api_sender_id: process.env.SMS_SENDER_ID,
  sms_api_url: process.env.SMS_API_URL,
};
