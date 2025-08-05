import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

// create blog category
router.post("/", categoryController.createCategory);

// get all category
router.get("/", categoryController.getAllCategory);

// ** get category by userId
router.get("/:userId", categoryController.getSingleCategory);

export const CategoryRoute = router;
