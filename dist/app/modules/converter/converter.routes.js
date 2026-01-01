"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConverterRoute = void 0;
const express_1 = require("express");
const converter_controller_1 = require("./converter.controller");
const router = (0, express_1.Router)();
router.post("/", converter_controller_1.ConvertController.convertURLToMP3orMP4);
exports.ConverterRoute = router;
