import { Router } from "express";
import uploadMiddleware from "../../../middlewares/fileUploadAndConvertToWebP";
import authGuard from "../../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "../../user/user.constant";
import { TagController } from "./tag.controller";

const router = Router();

// ** Create a new tag
router.post(
  "/",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.GUEST, USER_ROLE_ENUM.EDITOR),
  TagController.createTag,
);

// ** Get all tags
router.get("/", TagController.getAllTags);

// ** Get a tag by slug
// router.get("/slug/:slug", TagController.getCategoryBySlug);

// ** Get a single tag by ID
router.get(
  "/:tagId",
  authGuard(USER_ROLE_ENUM.ADMIN),
  TagController.getTagDetails,
);

// ** Delete a tag by ID
router.delete(
  "/:tagId",
  authGuard(USER_ROLE_ENUM.ADMIN),
  TagController.deleteTag,
);

// ** Update a tag (full update: name, description, etc.)
router.patch(
  "/:tagId",
  authGuard(USER_ROLE_ENUM.ADMIN),
  TagController.updateTag,
);

export const TagRoute = router;
