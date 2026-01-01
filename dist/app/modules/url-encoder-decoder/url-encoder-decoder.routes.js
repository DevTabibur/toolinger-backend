"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLEncoderDecoderRoute = void 0;
const express_1 = require("express");
const url_encoder_decoder_controller_1 = require("./url-encoder-decoder.controller");
const router = (0, express_1.Router)();
router.post("/check", url_encoder_decoder_controller_1.URLEncoderDecoderController.checkURL);
exports.URLEncoderDecoderRoute = router;
