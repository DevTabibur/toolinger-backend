import { Router } from "express";
import { URLEncoderDecoderController } from "./url-encoder-decoder.controller";

const router = Router();

router.post("/check", URLEncoderDecoderController.checkURL);

export const URLEncoderDecoderRoute = router;
