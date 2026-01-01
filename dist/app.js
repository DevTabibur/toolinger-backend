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
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const http_status_2 = __importDefault(require("http-status"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ApiError_1 = __importDefault(require("./errors/ApiError"));
const shortener_utils_1 = require("./app/modules/shortener/shortener.utils");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    origin: config_1.IS_MODE_PROD
        ? ["https://toolinger.com", "https://www.toolinger.com"]
        : [
            "https://toolinger.com",
            "https://www.toolinger.com",
            "http://localhost:3000",
            "http://localhost:3001",
        ],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    maxAge: 86400, // 24 hours
    optionsSuccessStatus: 200,
}));
// // Enable CORS
// app.use(
//   cors({
//     origin: 'http://localhost:3000', // for automatically storing jwt with cookie
//     credentials: true, // for automatically storing jwt with cookie
//     methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PATCH', 'PUT'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   }),
// ) // for cookie (refresh token)
app.use(express_1.default.json({ limit: "500mb" })); // to handle too many request entity
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static("./upload")); // Serve uploaded files
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views")); // Adjust path as needed
app.get("/", (req, res) => {
    res.render("index.ejs");
});
// ** all routes
app.use("/api/v1", routes_1.default);
// Route for redirecting short URLs with correct type annotations
app.get("/:shortUrl", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortUrl } = req.params;
    try {
        const originalUrl = yield (0, shortener_utils_1.redirectUrl)(shortUrl);
        if (!originalUrl) {
            throw new ApiError_1.default(http_status_2.default.BAD_REQUEST, "URL not found");
        }
        // Perform the redirect to the original URL
        res.redirect(originalUrl);
    }
    catch (error) {
        // Handle any errors here (optional)
        return res
            .status(500)
            .send("An error occurred while processing the request.");
    }
}));
// console.log("env development =>>>", app.get("env"));
//! global error handler
app.use(globalErrorHandler_1.default);
//! handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: `No API is found. Try Another API`,
        errorMessages: [
            {
                message: `No API is found for ${req.method} Method & ${req.originalUrl}`,
                path: req.originalUrl,
            },
        ],
    });
    next();
});
exports.default = app;
