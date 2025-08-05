import { Schema, model } from "mongoose";
import { IAnalytics } from "./analytics.interface";

const AnalyticsSchema = new Schema<IAnalytics>(
  {
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
  },
  { timestamps: true },
);

const AnalyticsModel = model<IAnalytics>("Analytics", AnalyticsSchema);
export default AnalyticsModel;
