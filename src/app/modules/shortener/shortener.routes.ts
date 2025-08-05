import { Router } from "express";
import { ShortenerController } from "./shortener.controller";

const router = Router();

//** Create Shortened URL*/
router.post("/create", ShortenerController.createShortUrl);

// ** Redirect the URL
// router.get('/:shortUrl', ShortenerController.redirectUrl);

export const ShortenerRoute = router;
