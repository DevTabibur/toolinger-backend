import { JSDOM } from 'jsdom';

export const extractVisibleText = (html: string): string => {
  const dom = new JSDOM(html);
  const textContent = dom.window.document.body.textContent || '';
  return textContent.replace(/\s+/g, ' ').trim();
};
