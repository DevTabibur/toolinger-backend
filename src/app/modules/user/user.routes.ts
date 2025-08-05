import { Router } from "express";
import { UserController } from "./user.controller";
const router = Router();

// ** get all car owner profile
router.get("/all/car-owner", UserController.getAllCarOwner);

// get all mechanic list
router.get("/all/mechanic", UserController.getAllMechanic);

// update profile
router.patch("/:userId", UserController.updateProfile);

// ** get user specific details for user
router.get("/:userId", UserController.getSingleUserById);

export const UserRoute = router;
