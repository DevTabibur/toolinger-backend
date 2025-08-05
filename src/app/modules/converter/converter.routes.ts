import { Router } from "express";
import { ConvertController } from "./converter.controller";

const router = Router();

router.post("/", ConvertController.convertURLToMP3orMP4);

export const ConverterRoute = router;
