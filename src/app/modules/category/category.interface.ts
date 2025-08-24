export enum CategoryStatus {
  ACTIVE = "active",
  PAUSED = "paused",
}

export interface ICategory {
  name: string; // Category name
  slug: string; // SEO-friendly URL
  description: string; // Category description
  status: CategoryStatus; // Whether the category is active
}
