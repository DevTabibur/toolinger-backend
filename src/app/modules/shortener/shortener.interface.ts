export interface IShortenedURL {
  originalUrl: string;
  shortUrl: string;
  clicks: number; // Ensure clicks is required
  lastAccessed?: Date;
  expiry: Date;
}
