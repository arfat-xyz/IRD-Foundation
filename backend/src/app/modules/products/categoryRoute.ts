import { Router } from "express";
import { CategoryController } from "./categoriesController";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get("/dua", CategoryController.getAllDuas);

export const CategoryRoutes = router;
