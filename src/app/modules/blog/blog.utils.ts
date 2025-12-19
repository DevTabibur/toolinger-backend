export const generateSlug = (title: string): string => {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

export const generateExcerpt = (content: string, maxLength = 160): string => {
  if (!content) return "";

  // 1. Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, "");

  // 2. Normalize spaces
  const cleaned = plainText.replace(/\s+/g, " ").trim();

  // 3. Cut safely
  if (cleaned.length <= maxLength) return cleaned;

  return cleaned.slice(0, maxLength).trim() + "...";
};
