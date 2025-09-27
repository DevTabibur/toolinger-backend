import express from "express";
import { DynamicPagesArticleAndSeoController } from "./pages-management.controller";
import { DynamicPagesArticleAndSeoValidation } from "./pages-management.validation";
import zodValidateRequest from "../../middlewares/zodValidateRequest";
import authGuard from "../../middlewares/authGuard";
import uploadMiddleware from "../../middlewares/fileUploadAndConvertToWebP";

const router = express.Router();

// Public routes (no authentication required)
router.get(
  "/",
  DynamicPagesArticleAndSeoController.getAllDynamicPagesArticleAndSeo,
);

// /seo or /article to fetch that realted data only.
router.get("/:type", DynamicPagesArticleAndSeoController.GetAllSEOAndArticle);

router.get(
  "/slug/:slug",
  DynamicPagesArticleAndSeoController.getDynamicPagesArticleAndSeoBySlug,
);

// Create dynamic pages article with SEO
router.post(
  "/",
  // zodValidateRequest(DynamicPagesArticleAndSeoValidation.createDynamicPagesArticleAndSeoSchema),
  authGuard(),
  uploadMiddleware,
  DynamicPagesArticleAndSeoController.createDynamicPagesArticleAndSeo,
);

// Get dynamic pages article by ID
router.get(
  "/:id",
  authGuard(),
  DynamicPagesArticleAndSeoController.getDynamicPagesArticleAndSeoById,
);

// Update dynamic pages article by ID
router.patch(
  "/:id",
  authGuard(),
  DynamicPagesArticleAndSeoController.updateDynamicPagesArticleAndSeo,
);

// Delete dynamic pages data by type (SEO or Article) and Id
router.delete(
  "/:id",
  authGuard(),
  DynamicPagesArticleAndSeoController.deleteDynamicPagesData,
);

export const DynamicPagesArticleAndSeoRoute = router;
