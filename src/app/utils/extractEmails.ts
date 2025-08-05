export const extractEmails = (html: string): string[] => {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi;
  const found = html.match(emailRegex) || [];
  const uniqueEmails = Array.from(new Set(found)); // Remove duplicates
  return uniqueEmails;
};
