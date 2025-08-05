import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";
import { ShortenerService } from "./shortener.service";
import ApiError from "../../../errors/ApiError";

const createShortUrl = catchAsync(async (req: Request, res: Response) => {
  const result = await ShortenerService.createShortUrl(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "URL Shortened Successfully",
    data: result,
  });
});

// const redirectUrl = catchAsync(async (req: Request, res: Response) => {
//     const { shortUrl } = req.params
//     const result = await ShortenerService.redirectUrl(shortUrl)
//     sendSuccessResponse(res, {
//         statusCode: httpStatus.OK,
//         message: "URL Redirected Successfully",
//         data: result
//     })
// })

// const redirectUrl = catchAsync(async (req: Request, res: Response) => {
//     const { shortUrl } = req.params;
//     console.log('shortUrl', shortUrl)
//     const originalUrl = await ShortenerService.redirectUrl(shortUrl);

//     if (!originalUrl) {
//         throw new ApiError(httpStatus.NOT_FOUND, "Short URL not found")
//     }

//     // // Redirect to the original URL
//     return res.redirect(originalUrl as unknown as string);
// });

export const ShortenerController = {
  createShortUrl,
  // redirectUrl,
};
