import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import config, { IS_MODE_PROD } from "./config";
import setupSocketManager from "./app/utils/socketManager";
import dbConnect from "./app/utils/dbConnect";
import { errorLogger, logger } from "./shared/logger";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = config.port || 5000;
const server = new Server(app);

export const IO = new SocketIOServer(server, {
  cors: {
    origin: IS_MODE_PROD
      ? config.allowed_origin_prod
      : config.allowed_origin_dev,
    methods: ["GET", "POST"],
  },
});

// Call the setupSocketManager function to initialize the socket handlers
setupSocketManager(IO);

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

const startServer = async (): Promise<void> => {
  try {
    await dbConnect(); // Connect to the database first
    server.listen(PORT, () => {
      // console.log(`🌐 Server started on port ${PORT}`);
      logger.info(`🌐 Server started on port ${PORT}`);
    });
  } catch (error: any) {
    // console.error("Server Error:", error.message);
    errorLogger.error("Server Error:", error.message);
  }
};

startServer();
