import express from "express";
import { DynamicPagesArticleAndSeoController } from "./pages-management.controller";
import { DynamicPagesArticleAndSeoValidation } from "./pages-management.validation";
import zodValidateRequest from "../../middlewares/zodValidateRequest";
import authGuard from "../../middlewares/authGuard";

const router = express.Router();

// Public routes (no authentication required)
router.get(
  "/",
  DynamicPagesArticleAndSeoController.getAllDynamicPagesArticleAndSeo,
);

router.get(
  "/slug/:slug",
  authGuard(),
  DynamicPagesArticleAndSeoController.getDynamicPagesArticleAndSeoBySlug,
);

// Create dynamic pages article with SEO
router.post(
  "/",
  // zodValidateRequest(DynamicPagesArticleAndSeoValidation.createDynamicPagesArticleAndSeoSchema),
  authGuard(),
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

// Delete dynamic pages article by ID
router.delete(
  "/:id",
  authGuard(),
  DynamicPagesArticleAndSeoController.deleteDynamicPagesArticleAndSeo,
);

export const DynamicPagesArticleAndSeoRoute = router;
