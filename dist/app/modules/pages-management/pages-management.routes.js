"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicPagesArticleAndSeoRoute = void 0;
const express_1 = __importDefault(require("express"));
const pages_management_controller_1 = require("./pages-management.controller");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const fileUploadAndConvertToWebP_1 = __importDefault(require("../../middlewares/fileUploadAndConvertToWebP"));
const router = express_1.default.Router();
// Public routes (no authentication required)
router.get("/", pages_management_controller_1.DynamicPagesArticleAndSeoController.getAllDynamicPagesArticleAndSeo);
// /seo or /article to fetch that realted data only.
router.get("/:type", pages_management_controller_1.DynamicPagesArticleAndSeoController.GetAllSEOAndArticle);
router.get("/slug/:slug", pages_management_controller_1.DynamicPagesArticleAndSeoController.getDynamicPagesArticleAndSeoBySlug);
// Create dynamic pages article with SEO
router.post("/", 
// zodValidateRequest(DynamicPagesArticleAndSeoValidation.createDynamicPagesArticleAndSeoSchema),
(0, authGuard_1.default)(), fileUploadAndConvertToWebP_1.default, pages_management_controller_1.DynamicPagesArticleAndSeoController.createDynamicPagesArticleAndSeo);
// Get dynamic pages article by ID
router.get("/:id", (0, authGuard_1.default)(), pages_management_controller_1.DynamicPagesArticleAndSeoController.getDynamicPagesArticleAndSeoById);
// Update dynamic pages article by ID
router.patch("/:id", (0, authGuard_1.default)(), pages_management_controller_1.DynamicPagesArticleAndSeoController.updateDynamicPagesArticleAndSeo);
// Delete dynamic pages data by type (SEO or Article) and Id
router.delete("/:id", (0, authGuard_1.default)(), pages_management_controller_1.DynamicPagesArticleAndSeoController.deleteDynamicPagesData);
exports.DynamicPagesArticleAndSeoRoute = router;
