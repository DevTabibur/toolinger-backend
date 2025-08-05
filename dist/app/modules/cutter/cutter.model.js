"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Mp3CuttingSchema = new mongoose_1.Schema({
    filename: { type: String, required: true },
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    status: { type: String, default: 'processing' },
    outputFilePath: { type: String, required: true },
}, { timestamps: true });
const CutterModel = (0, mongoose_1.model)('Mp3Cutting', Mp3CuttingSchema);
exports.default = CutterModel;
