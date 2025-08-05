export const extractHostname = (urlOrDomain: string) => {
  try {
    const url = new URL(urlOrDomain.startsWith('http') ? urlOrDomain : `http://${urlOrDomain}`);
    return url.hostname;
  } catch (e) {
    return urlOrDomain; // fallback
  }
};
