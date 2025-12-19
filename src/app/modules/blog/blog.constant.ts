export const BLOG_STATUS = [
  "draft", // article is not completed
  "published",
  "scheduled", // future publish
  "private", // only admin
  "pending_review", // guest post approval
  "archived",
] as const;
export const AUTHOR_ROLE = ["admin", "editor", "guest"] as const;

export type BlogStatus = (typeof BLOG_STATUS)[number];
export type AuthorRole = (typeof AUTHOR_ROLE)[number];

export const BLOG_POST_FILTER_FIELDS = [
  // exact match
  "status", // draft | published
  "author.id", // admin/guest
  "categories", // category ObjectId
  "tags", // tag ObjectId
  "isFeatured", // boolean
  "isSponsored", // boolean
];
export const BLOG_POST_SEARCH__FIELDS = [
  // search for partial match
  "title",
  "slug",
];

export type BlogPostFilters = {
  searchTerm?: string;
};
