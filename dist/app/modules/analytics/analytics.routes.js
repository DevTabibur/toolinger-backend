"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRoute = void 0;
const express_1 = require("express");
const analytics_controller_1 = require("./analytics.controller");
const router = (0, express_1.Router)();
router.get("/", analytics_controller_1.AnalyticsController.getAnalytics);
exports.AnalyticsRoute = router;
