export interface IDashboardAnalytics {
  totalBlogs: number;
  totalUsers: number;
  totalComments: number;
  totalCategories: number;
  totalTags: number;
  totalViews: number;
  monthlyBlogs: { _id: string; count: number }[];
  monthlyUsers: { _id: string; count: number }[];
}
