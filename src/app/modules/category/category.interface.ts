export enum CategoryStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface ICategory {
  name: string; // Category name
  slug: string; // SEO-friendly URL
  description: string; // Category description
  status: CategoryStatus; // Whether the category is active
}
