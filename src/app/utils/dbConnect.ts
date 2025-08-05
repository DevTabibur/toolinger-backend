import mongoose from "mongoose";
import config from "../../config";
import { errorLogger, logger } from "../../shared/logger";

const URI = config.database_string;

const dbConnect = async (): Promise<void> => {
  try {
    if (!URI) {
      // console.error("❌ Database connection string is not found");
      errorLogger.error("❌ Database connection string is not found");
      throw new Error("Database connection string is missing");
    }

    await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if MongoDB is unreachable
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      connectTimeoutMS: 10000, // Timeout for initial connection
    });

    // console.log("🛢 Database is connected successfully");
    logger.info("🛢 Database is connected successfully");
  } catch (error: any) {
    // console.error("❌ Failed to connect to the database:", error.message);
    errorLogger.error("❌ Failed to connect to the database:", error.message);

    // Exit the process to prevent further issues
    process.exit(1);
  }

  // Mongoose Connection Events for Debugging
  mongoose.connection.on("connected", () => {
    // console.log("✅ Mongoose connected to the database");
    logger.info("✅ Mongoose connected to the database");
  });

  mongoose.connection.on("error", (err) => {
    // console.error("❌ Mongoose connection error:", err.message);
    errorLogger.error("❌ Mongoose connection error:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    // console.warn("⚠️ Mongoose disconnected");
    errorLogger.error("⚠️ Mongoose disconnected");
  });

  // Handle SIGINT for graceful shutdown
  process.on("SIGINT", async () => {
    // console.log("🛑 SIGINT received. Closing MongoDB connection...");
    logger.info("🛑 SIGINT received. Closing MongoDB connection...");
    await mongoose.connection.close();
    process.exit(0);
  });
};

export default dbConnect;
