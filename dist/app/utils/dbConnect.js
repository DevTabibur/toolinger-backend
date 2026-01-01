"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const logger_1 = require("../../shared/logger");
const URI = config_1.default.database_string;
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!URI) {
            // console.error("❌ Database connection string is not found");
            logger_1.errorLogger.error("❌ Database connection string is not found");
            throw new Error("Database connection string is missing");
        }
        yield mongoose_1.default.connect(URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if MongoDB is unreachable
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            connectTimeoutMS: 10000, // Timeout for initial connection
        });
        // console.log("🛢 Database is connected successfully");
        logger_1.logger.info("🛢 Database is connected successfully");
    }
    catch (error) {
        // console.error("❌ Failed to connect to the database:", error.message);
        logger_1.errorLogger.error("❌ Failed to connect to the database:", error.message);
        // Exit the process to prevent further issues
        process.exit(1);
    }
    // Mongoose Connection Events for Debugging
    mongoose_1.default.connection.on("connected", () => {
        // console.log("✅ Mongoose connected to the database");
        logger_1.logger.info("✅ Mongoose connected to the database");
    });
    mongoose_1.default.connection.on("error", (err) => {
        // console.error("❌ Mongoose connection error:", err.message);
        logger_1.errorLogger.error("❌ Mongoose connection error:", err.message);
    });
    mongoose_1.default.connection.on("disconnected", () => {
        // console.warn("⚠️ Mongoose disconnected");
        logger_1.errorLogger.error("⚠️ Mongoose disconnected");
    });
    // Handle SIGINT for graceful shutdown
    process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
        // console.log("🛑 SIGINT received. Closing MongoDB connection...");
        logger_1.logger.info("🛑 SIGINT received. Closing MongoDB connection...");
        yield mongoose_1.default.connection.close();
        process.exit(0);
    }));
});
exports.default = dbConnect;
