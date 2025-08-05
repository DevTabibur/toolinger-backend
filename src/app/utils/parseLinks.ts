import { JSDOM } from 'jsdom';

export const parseLinks = (html: string, baseUrl: string) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const anchors = document.querySelectorAll('a[href]');
  const links = Array.from(anchors).map(a => a.getAttribute('href')).filter(Boolean) as string[];

  const internalLinks = links.filter(link =>
    link.startsWith('/') || link.includes(new URL(baseUrl).hostname)
  );

  const externalLinks = links.filter(link =>
    !link.startsWith('/') && !link.includes(new URL(baseUrl).hostname)
  );

  return {
    total: links.length,
    internal: internalLinks.length,
    external: externalLinks.length,
  };
};
