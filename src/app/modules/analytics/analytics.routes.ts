import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";

const router = Router();

router.get("/", AnalyticsController.getAnalytics);

export const AnalyticsRoute = router;
