import mongoose from "mongoose";
import dbConnect from "../utils/dbConnect";
import { errorLogger, logger } from "../../shared/logger";
import UserModel from "../modules/user/user.model";
import { USER_ROLE_ENUM, USER_STATUS } from "../modules/user/user.constant";

//! Admin credentials — override via env when needed
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@toolinger.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@1234";
const ADMIN_FIRST_NAME = process.env.ADMIN_FIRST_NAME || "Super";
const ADMIN_LAST_NAME = process.env.ADMIN_LAST_NAME || "Admin";

const seedAdmin = async (): Promise<void> => {
  try {
    await dbConnect();

    //! Do not create a duplicate admin
    const isAdminExist = await UserModel.findOne({ email: ADMIN_EMAIL });
    if (isAdminExist) {
      logger.info(`ℹ️ Admin already exists: ${ADMIN_EMAIL} — skipping seed`);
      return;
    }

    //! Password is hashed by the userSchema pre("save") hook — use create()
    await UserModel.create({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      firstName: ADMIN_FIRST_NAME,
      lastName: ADMIN_LAST_NAME,
      role: USER_ROLE_ENUM.ADMIN,
      status: USER_STATUS.ACTIVE,
    });

    logger.info(`✅ Admin seeded successfully: ${ADMIN_EMAIL}`);
  } catch (error: any) {
    errorLogger.error("❌ Failed to seed admin:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    process.exit(process.exitCode ?? 0);
  }
};

seedAdmin();
