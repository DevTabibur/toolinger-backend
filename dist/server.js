"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.IO = void 0;
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const config_1 = __importStar(require("./config"));
const socketManager_1 = __importDefault(require("./app/utils/socketManager"));
const dbConnect_1 = __importDefault(require("./app/utils/dbConnect"));
const logger_1 = require("./shared/logger");
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = config_1.default.port || 5000;
const server = new http_1.Server(app_1.default);
exports.IO = new socket_io_1.Server(server, {
    cors: {
        origin: config_1.IS_MODE_PROD
            ? config_1.default.allowed_origin_prod
            : config_1.default.allowed_origin_dev,
        methods: ["GET", "POST"],
    },
});
// Call the setupSocketManager function to initialize the socket handlers
(0, socketManager_1.default)(exports.IO);
// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});
// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
    console.error("Unhandled Rejection:", error);
    server.close(() => process.exit(1));
});
// Handle SIGTERM for graceful shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    server.close(() => process.exit(0));
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, dbConnect_1.default)(); // Connect to the database first
        server.listen(PORT, () => {
            // console.log(`🌐 Server started on port ${PORT}`);
            logger_1.logger.info(`🌐 Server started on port ${PORT}`);
        });
    }
    catch (error) {
        // console.error("Server Error:", error.message);
        logger_1.errorLogger.error("Server Error:", error.message);
    }
});
startServer();
