"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageSEORoute = void 0;
const express_1 = require("express");
const page_seo_controller_1 = require("./page-seo.controller");
const router = (0, express_1.Router)();
// Create page SEO
router.post("/", page_seo_controller_1.PageSEOController.createPageSEO);
// Get all page SEO
router.get("/", page_seo_controller_1.PageSEOController.getAllPageSEO);
// Get available pages
router.get("/available-pages", page_seo_controller_1.PageSEOController.getAvailablePages);
// Get single page SEO by ID
router.get("/:pageSEOId", page_seo_controller_1.PageSEOController.getPageSEOById);
// Get page SEO by page name
router.get("/page/:page", page_seo_controller_1.PageSEOController.getPageSEOByPage);
// Update page SEO
router.patch("/:pageSEOId", page_seo_controller_1.PageSEOController.updatePageSEO);
// Delete page SEO
router.delete("/:pageSEOId", page_seo_controller_1.PageSEOController.deletePageSEO);
exports.PageSEORoute = router;
