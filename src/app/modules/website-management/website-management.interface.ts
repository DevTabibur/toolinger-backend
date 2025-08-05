// Website Management Tools Interfaces

export interface DNSRecordsRequest {
  domain: string;
}

export interface DNSRecordsResponse {
  domain: string;
  aRecords: string[];
  mxRecords: any[];
  txtRecords: string[][];
  cnameRecords: string[];
}

export interface DNSPropagationRequest {
  domain: string;
}

export interface DNSPropagationResponse {
  domain: string;
  status: number;
  answers: any[];
  authority: any[];
  additional: any[];
}

export interface IPLocationRequest {
  ip: string;
}

export interface IPLocationResponse {
  ip: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}

export interface TracerouteRequest {
  host: string;
}

export interface TracerouteResponse {
  host: string;
  hops: Array<{
    hop: number;
    ip: string;
    time: string;
  }>;
}

export interface GoogleIndexRequest {
  url: string;
}

export interface GoogleIndexResponse {
  url: string;
  indexed: boolean;
  lastCrawled: string;
  cacheUrl: string;
}

export interface HTMLEncoderDecoderRequest {
  text: string;
  operation: 'encode' | 'decode';
}

export interface HTMLEncoderDecoderResponse {
  originalText: string;
  result: string;
  operation: string;
}

export interface FaviconGeneratorRequest {
  text: string;
  size?: number;
}

export interface FaviconGeneratorResponse {
  text: string;
  size: number;
  faviconUrl: string;
  formats: string[];
}

export interface MinifyHTMLRequest {
  html: string;
}

export interface MinifyHTMLResponse {
  original: string;
  minified: string;
  sizeReduction: string;
}

export interface BeautifyJSRequest {
  code: string;
}

export interface BeautifyJSResponse {
  original: string;
  beautified: string;
  lines: number;
}

export interface BeautifyPHPRequest {
  code: string;
}

export interface BeautifyPHPResponse {
  original: string;
  beautified: string;
  lines: number;
}

export interface RGBToHEXRequest {
  r: number;
  g: number;
  b: number;
}

export interface RGBToHEXResponse {
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  hex: string;
  hsl: {
    h: number;
    s: number;
    l: number;
  };
}

export interface ReverseNSRequest {
  ip: string;
}

export interface ReverseNSResponse {
  ip: string;
  ptrRecords: any[];
  status: number;
}

export interface ServerPortScannerRequest {
  host: string;
  ports?: number[];
}

export interface ServerPortScannerResponse {
  host: string;
  scanResults: Array<{
    port: number;
    status: string;
    service: string;
  }>;
  openPorts: number;
}

export interface ServerStatusRequest {
  url: string;
}

export interface ServerStatusResponse {
  url: string;
  status: number;
  statusText: string;
  responseTime: string;
  server: string;
  contentType: string;
}

export interface SpiderSimulatorRequest {
  url: string;
  depth?: number;
}

export interface SpiderSimulatorResponse {
  url: string;
  depth: number;
  pagesFound: number;
  linksFound: number;
  imagesFound: number;
  crawlTime: string;
}

export interface WebsitePageSnooperRequest {
  url: string;
}

export interface WebsitePageSnooperResponse {
  url: string;
  title: string;
  metaDescription: string;
  headings: string[];
  links: string[];
  images: string[];
  wordCount: number;
}

export interface DomainIPLookupRequest {
  domain: string;
}

export interface DomainIPLookupResponse {
  domain: string;
  ips: string[];
  count: number;
}

export interface MinifyCSSRequest {
  css: string;
}

export interface MinifyCSSResponse {
  original: string;
  minified: string;
  sizeReduction: string;
}

export interface MinifyJSONRequest {
  json: string;
}

export interface MinifyJSONResponse {
  original: string;
  minified: string;
  sizeReduction: string;
}

export interface BeautifyHTMLRequest {
  html: string;
}

export interface BeautifyHTMLResponse {
  original: string;
  beautified: string;
  lines: number;
}

export interface BeautifyXMLRequest {
  xml: string;
}

export interface BeautifyXMLResponse {
  original: string;
  beautified: string;
  lines: number;
}

export interface WebsiteSEOScoreRequest {
  url: string;
}

export interface WebsiteSEOScoreResponse {
  url: string;
  score: number;
  grade: string;
  issues: string[];
  recommendations: string[];
}

export interface DNSReportRequest {
  domain: string;
}

export interface DNSReportResponse {
  domain: string;
  aRecords: string[];
  mxRecords: any[];
  txtRecords: string[][];
  cnameRecords: string[];
  summary: {
    hasARecords: boolean;
    hasMXRecords: boolean;
    hasTXTRecords: boolean;
    hasCNAMERecords: boolean;
  };
}

export interface ClassCIPRequest {
  ip: string;
}

export interface ClassCIPResponse {
  ip: string;
  classC: string;
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
}

export interface DifferentLocationsPingRequest {
  host: string;
}

export interface DifferentLocationsPingResponse {
  host: string;
  locations: Array<{
    location: string;
    ping: number;
    status: string;
  }>;
  averagePing: number;
}

export interface GoogleIndexToolRequest {
  url: string;
}

export interface GoogleIndexToolResponse {
  url: string;
  indexed: boolean;
  lastCrawled: string;
  cacheUrl: string;
  searchResults: number;
}

export interface URLEncoderDecoderRequest {
  url: string;
  operation: 'encode' | 'decode';
}

export interface URLEncoderDecoderResponse {
  originalUrl: string;
  result: string;
  operation: string;
}

export interface CropImageOnlineRequest {
  imageUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropImageOnlineResponse {
  originalUrl: string;
  cropDimensions: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  croppedUrl: string;
  format: string;
}

export interface MinifyJSRequest {
  code: string;
}

export interface MinifyJSResponse {
  original: string;
  minified: string;
  sizeReduction: string;
}

export interface BeautifyCSSRequest {
  css: string;
}

export interface BeautifyCSSResponse {
  original: string;
  beautified: string;
  lines: number;
}

export interface BeautifyJSONRequest {
  json: string;
}

export interface BeautifyJSONResponse {
  original: string;
  beautified: string;
  lines: number;
}

export interface ICOConverterRequest {
  imageUrl: string;
  sizes?: number[];
}

export interface ICOConverterResponse {
  originalUrl: string;
  icoUrl: string;
  sizes: number[];
  format: string;
} 