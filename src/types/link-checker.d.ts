declare module "link-checker" {
  type LinkStatus = "alive" | "dead";

  export interface LinkCheckResult {
    link: string;
    status: LinkStatus;
    statusCode: number;
  }

  const linkChecker: (
    url: string,
    options: Record<string, unknown>,
    callback: (err: Error | null, result: LinkCheckResult[]) => void
  ) => void;

  export default linkChecker;
}
