"use strict";
// import { Response, Request } from "express";
// import catchAsync from "../../../shared/catchAsync";
// import httpStatus from "http-status";
// import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
// import { CutterService } from "./cutter.service";
// import multer from "multer";
// import * as fs from "fs";
// import * as path from "path";
// // Multer configuration for file uploads
// const uploadDir = path.join(__dirname, "../../uploads");
// const upload = multer({ dest: uploadDir });
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAndTrim = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const cutter_service_1 = require("./cutter.service");
const multer_1 = __importDefault(require("multer"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const uploadDir = path.join(__dirname, "../../uploads");
const upload = (0, multer_1.default)({ dest: uploadDir });
cutter_service_1.CutterService.ensureDirectoriesExist();
exports.uploadAndTrim = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        const { startTime, endTime } = req.body;
        if (!file || !startTime || !endTime) {
            res.status(400).json({ error: "Missing file or time parameters" });
            return;
        }
        const trimmedFilePath = yield cutter_service_1.CutterService.trimAudio(file.path, parseFloat(startTime), parseFloat(endTime));
        res.download(trimmedFilePath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                return res.status(500).json({ error: "Failed to send file" });
            }
            fs.unlinkSync(file.path);
            fs.unlinkSync(trimmedFilePath);
        });
        return; // Ensure function always returns void
    }
    catch (error) {
        console.error("Error processing audio:", error);
        next(error);
    }
}));
