import cors from "cors";
import compression from "compression";
import path from "path";
import express, { Application, Request, Response, NextFunction } from "express";
import status from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import ApiError from "./errors/ApiError";
// import ShortenedURLModel from "./app/modules/shortener/shortener.model";
// import { redirectUrl } from "./app/modules/shortener/shortener.utils";
import config, { IS_MODE_PROD } from "./config";

const app: Application = express();
app.use(compression());
app.use(
  cors({
    // origin: "*",
    origin: IS_MODE_PROD
      ? [
          "https://toolinger.com",
          "https://www.toolinger.com",
          "https://dashboard.toolinger.com",
        ]
      : [
          "https://toolinger.com",
          "https://www.toolinger.com",
          "https://dashboard.toolinger.com",
          "http://localhost:3000",
          "http://localhost:3001",
        ],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    maxAge: 86400, // 24 hours
    optionsSuccessStatus: 200,
  }),
);

// // Enable CORS
// app.use(
//   cors({
//     origin: 'http://localhost:3000', // for automatically storing jwt with cookie
//     credentials: true, // for automatically storing jwt with cookie
//     methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PATCH', 'PUT'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   }),
// ) // for cookie (refresh token)
// Handle preflight requests with same CORS config
app.options("*", cors());
app.use(express.json({ limit: "500mb" })); // to handle too many request entity
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static("./upload")); // Serve uploaded files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Adjust path as needed
// app.use(
//   express.static(path.join(process.cwd(), "upload"))
// );

app.use("/upload", express.static(path.join(process.cwd(), "upload"))); // http://localhost:5000/upload/20260104587-LogoPNG.webp
app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs");
});

// ** all routes
app.use("/api/v1", routes);

// Route for redirecting short URLs with correct type annotations
// app.get("/:shortUrl", async (req: Request, res: Response): Promise<any> => {
//   const { shortUrl } = req.params;
//   try {
//     const originalUrl = await redirectUrl(shortUrl);

//     if (!originalUrl) {
//       throw new ApiError(httpStatus.BAD_REQUEST, "URL not found");
//     }

//     // Perform the redirect to the original URL
//     res.redirect(originalUrl);
//   } catch (error) {
//     // Handle any errors here (optional)
//     return res
//       .status(500)
//       .send("An error occurred while processing the request.");
//   }
// });

// console.log("env development =>>>", app.get("env"));

//! global error handler
app.use(globalErrorHandler);

//! handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
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

export default app;
