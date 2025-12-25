import { Router } from "express";
import { UserController } from "./user.controller";
const router = Router();

// ** get all car owner profile
router.get("/", UserController.getAllUser);

// update profile
router.patch("/:userId", UserController.updateProfile);

// ** get user specific details for user
router.get("/:userId", UserController.getSingleUserById);

export const UserRoute = router;
