import { HtmlUrlChecker } from "broken-link-checker";

// broken: true means statusCode 403 ==> Status = Okay hobe
// broken: false means statusCode 200 ==> Status = Okay hobe

const checkBrokenLink = async (
  url: string
) => {
  // return new Promise((resolve, reject) => {
  //   const results: Array<{
  //     url: string;
  //     broken: boolean;
  //     statusCode: number | null;
  //   }> = [];

  //   const checker = new HtmlUrlChecker(
  //     {},
  //     {
  //       link: (result) => {
  //         results.push({
  //           url: result.url.resolved,
  //           broken: result.broken,
  //           statusCode: result.http?.statusCode || null,
  //         });
  //       },
  //       end: () => {
  //         resolve(results);
  //       },
  //       error: (error: any) => {
  //         reject(error);
  //       },
  //     }
  //   );

  //   checker.enqueue(url, {}); // ✅ 2nd arg: customData
  // });
};

export const BrokenLinkService = { checkBrokenLink };
