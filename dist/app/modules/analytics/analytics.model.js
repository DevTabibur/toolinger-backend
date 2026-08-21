"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AnalyticsSchema = new mongoose_1.Schema({
    totalShort: { type: Number, default: 0 },
    shortPercentageChange: { type: Number, default: 0 },
    lastUsedShort: { type: Date },
    totalMP3: { type: Number, default: 0 },
    lastUsedMP3: { type: Date },
    mp3PercentageChange: { type: Number, default: 0 },
    totalMP4: { type: Number, default: 0 },
    mp4PercentageChange: { type: Number, default: 0 },
    lastUsedMP4: { type: Date },
    totalCutter: { type: Number, default: 0 },
    cutterPercentageChange: { type: Number, default: 0 },
    lastUsedCutter: { type: Date },
}, { timestamps: true });
const AnalyticsModel = (0, mongoose_1.model)("Analytics", AnalyticsSchema);
exports.default = AnalyticsModel;
