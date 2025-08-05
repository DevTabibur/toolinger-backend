export interface IAnalytics {
  totalShort?: number;
  lastUsedShort?: Date;
  shortPercentageChange?: number;

  totalMP3?: number;
  lastUsedMP3?: Date;
  mp3PercentageChange?: number;

  totalMP4?: number;
  lastUsedMP4?: Date;
  mp4PercentageChange?: number;

  totalCutter?: number;
  lastUsedCutter?: Date;
  cutterPercentageChange?: number;
}
