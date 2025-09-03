import path from "path";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { TransformableInfo } from "logform";

const { combine, timestamp, label, printf } = format;

// Define a custom interface that includes the timestamp property
interface CustomTransformableInfo extends TransformableInfo {
  timestamp?: string;
}

// Custom Log Format
const myFormat = printf(
  ({ level, message, label, timestamp }: CustomTransformableInfo) => {
    if (timestamp) {
      const date = new Date(timestamp);
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
    }
    return `[${label}] ${level}: ${message}`;
  },
);

// Success Logger
const logger = createLogger({
  level: "info",
  format: combine(label({ label: "Toolinger" }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "successes",
        "Toolinger-%DATE%-success.log",
      ),
      datePattern: "YYYY-DD-MM-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

// Error Logger
const errorLogger = createLogger({
  level: "error",
  format: combine(label({ label: "Toolinger" }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "errors",
        "Toolinger-%DATE%-error.log",
      ),
      datePattern: "YYYY-DD-MM-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export { logger, errorLogger };
