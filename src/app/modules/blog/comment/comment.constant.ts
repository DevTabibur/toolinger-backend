export const COMMENT_STATUS = [
  "pending",
  "approved",
  "rejected",
  "spam",
] as const;

// exact match
export const COMMENT_FILTER_FIELDS = [
  "status",
  "blogPost",
  "author.user",
  "parentComment",
];

// partial match
export const COMMENT_SEARCH_FIELDS = ["content", "author._id", "author.email"];
