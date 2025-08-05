declare module '@nodesecure/domain-check' {
  export function whois(domain: string): Promise<{
    createdDate?: string;
    updatedDate?: string;
    expirationDate?: string;
    registrar?: string;
    [key: string]: any;
  }>;
}
