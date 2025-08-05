"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// ** get all car owner profile
router.get("/all/car-owner", user_controller_1.UserController.getAllCarOwner);
// get all mechanic list
router.get("/all/mechanic", user_controller_1.UserController.getAllMechanic);
// update profile
router.patch("/:userId", user_controller_1.UserController.updateProfile);
// ** get user specific details for user
router.get("/:userId", user_controller_1.UserController.getSingleUserById);
exports.UserRoute = router;
