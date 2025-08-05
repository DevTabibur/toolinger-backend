import AnalyticsModel from "./analytics.model";

const getAnalytics = async () => {
  const result = await AnalyticsModel.find();
  return result;
};

export const AnalyticsService = { getAnalytics };
