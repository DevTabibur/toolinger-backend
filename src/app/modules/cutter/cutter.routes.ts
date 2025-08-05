import { uploadAndTrim } from "./cutter.controller";
import express, { Router } from "express";
import multer from "multer";
import * as path from "path";

const router = Router();

const uploadDir = path.join(__dirname, "../../uploads");
const upload = multer({ dest: uploadDir });

router.post(
  "/trim",
  upload.single("file"),
  express.json(),
  express.urlencoded({ extended: true }),
  uploadAndTrim, // No need to wrap in another function, since it's already handled
);

export const CutterRoute = router;
