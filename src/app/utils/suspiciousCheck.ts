import axios from "axios";

export const checkIfDomainIsSuspicious = async (url: string): Promise<{ url: string, status: "Safe" | "Suspicious" }> => {
  try {
    // HEAD request to avoid downloading whole page
    const response = await axios.head(url, {
      maxRedirects: 5,
      timeout: 5000,
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const contentType = response.headers["content-type"] || "";

    if (response.status >= 400 || contentType.includes("application/octet-stream")) {
      return { url, status: "Suspicious" };
    }

    return { url, status: "Safe" };
  } catch (error) {
    return { url, status: "Suspicious" };
  }
};
