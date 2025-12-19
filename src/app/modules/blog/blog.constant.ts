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
