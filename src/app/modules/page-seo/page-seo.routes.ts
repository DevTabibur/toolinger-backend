import { Router } from "express";
import { PageSEOController } from "./page-seo.controller";

const router = Router();

// Create page SEO
router.post("/", PageSEOController.createPageSEO);

// Get all page SEO
router.get("/", PageSEOController.getAllPageSEO);

// Get available pages
router.get("/available-pages", PageSEOController.getAvailablePages);

// Get single page SEO by ID
router.get("/:pageSEOId", PageSEOController.getPageSEOById);

// Get page SEO by page name
router.get("/page/:page", PageSEOController.getPageSEOByPage);

// Update page SEO
router.patch("/:pageSEOId", PageSEOController.updatePageSEO);

// Delete page SEO
router.delete("/:pageSEOId", PageSEOController.deletePageSEO);

export const PageSEORoute = router;
