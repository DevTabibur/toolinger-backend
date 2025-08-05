// seo/seo.routes.ts
import { Router } from "express";
import { SEOController } from "./seo.controller";

const router = Router();

// create dynamic seo based on page
router.post("/", SEOController.createSEO);

// get all dynamic seo
router.get("/", SEOController.getAllSEO);

// get single seo details by page name
router.get("/:seoId", SEOController.getSEOById);

// get seo by page name
router.get("/details/:page", SEOController.getSEOByPage);

// update single seo details by page name
router.patch("/:seoId", SEOController.updateSEO);

// delete single seo details by page name
router.delete("/:seoId", SEOController.deleteSEO);

// Revalidate route for cache invalidation
router.post("/revalidate", SEOController.revalidateSEO);

export const SEORoute = router;
