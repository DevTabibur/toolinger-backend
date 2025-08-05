"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerRoute = void 0;
const express_1 = require("express");
const shortener_controller_1 = require("./shortener.controller");
const router = (0, express_1.Router)();
//** Create Shortened URL*/
router.post("/create", shortener_controller_1.ShortenerController.createShortUrl);
// ** Redirect the URL
// router.get('/:shortUrl', ShortenerController.redirectUrl);
exports.ShortenerRoute = router;
