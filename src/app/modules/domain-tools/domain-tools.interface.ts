export interface IDomainTools {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDomainAuthorityResult {
  domain: string;
  authority: number;
  trustFlow: number;
  citationFlow: number;
  backlinks: number;
  referringDomains: number;
}

export interface IDomainIPHistory {
  domain: string;
  ipHistory: Array<{
    ip: string;
    date: string;
    location: string;
  }>;
}

export interface ISitemapResult {
  domain: string;
  sitemapUrl: string;
  sitemapContent: string;
  urlCount: number;
}

export interface IAlexaRankComparison {
  domain1: string;
  domain2: string;
  domain1Rank: number;
  domain2Rank: number;
  difference: number;
}

export interface IBlogSearchResult {
  query: string;
  results: Array<{
    title: string;
    url: string;
    description: string;
    date: string;
  }>;
}

export interface ILinkExtractorResult {
  url: string;
  links: Array<{
    url: string;
    text: string;
    isExternal: boolean;
  }>;
  totalLinks: number;
  externalLinks: number;
  internalLinks: number;
}

export interface IReverseIPResult {
  ip: string;
  domains: string[];
  totalDomains: number;
}

export interface IGoogleMalwareResult {
  url: string;
  isMalicious: boolean;
  threats: string[];
  lastChecked: string;
}

export interface IBacklinkMakerResult {
  url: string;
  backlinks: Array<{
    platform: string;
    url: string;
    status: string;
  }>;
}

export interface IBrokenLinksResult {
  url: string;
  brokenLinks: Array<{
    url: string;
    statusCode: number;
    error: string;
  }>;
  totalLinks: number;
  brokenCount: number;
}

export interface IGoogleIndexerResult {
  url: string;
  isIndexed: boolean;
  indexedPages: number;
  lastCrawled: string;
}

export interface IWhoisResult {
  domain: string;
  registrar: string;
  creationDate: string;
  expirationDate: string;
  updatedDate: string;
  status: string[];
  nameServers: string[];
}

export interface IReverseWhoisResult {
  email: string;
  domains: string[];
  totalDomains: number;
}

export interface IAlexaRankResult {
  domain: string;
  globalRank: number;
  countryRank: number;
  category: string;
}

export interface ISocialMediaCounterResult {
  url: string;
  facebook: number;
  twitter: number;
  linkedin: number;
  pinterest: number;
  total: number;
}

export interface IGooglePRResult {
  domain: string;
  pageRank: number;
  lastUpdated: string;
} 