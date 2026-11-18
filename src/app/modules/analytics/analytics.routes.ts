import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";

const router = Router();

// router.get("/", AnalyticsController.getAnalytics);
router.get("/dashboard", AnalyticsController.getDashboardAnalytics);

export const AnalyticsRoute = router;
