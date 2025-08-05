"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEORoute = void 0;
// seo/seo.routes.ts
const express_1 = require("express");
const seo_controller_1 = require("./seo.controller");
const router = (0, express_1.Router)();
// create dynamic seo based on page
router.post("/", seo_controller_1.SEOController.createSEO);
// get all dynamic seo
router.get("/", seo_controller_1.SEOController.getAllSEO);
// get single seo details by page name
router.get("/:seoId", seo_controller_1.SEOController.getSEOById);
// get seo by page name
router.get("/details/:page", seo_controller_1.SEOController.getSEOByPage);
// update single seo details by page name
router.patch("/:seoId", seo_controller_1.SEOController.updateSEO);
// delete single seo details by page name
router.delete("/:seoId", seo_controller_1.SEOController.deleteSEO);
// Revalidate route for cache invalidation
router.post("/revalidate", seo_controller_1.SEOController.revalidateSEO);
exports.SEORoute = router;
