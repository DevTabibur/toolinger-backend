"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokenLinkService = void 0;
// broken: true means statusCode 403 ==> Status = Okay hobe
// broken: false means statusCode 200 ==> Status = Okay hobe
const checkBrokenLink = (url) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.BrokenLinkService = { checkBrokenLink };
