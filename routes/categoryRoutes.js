import express from "express";
import {
  getCategoryValidator,
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} from "../utils/Validatore/validateCategoryId.js";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/categories", createCategoryValidator, createCategory);
router.get("/categories", getCategories);

router.get("/categories/:id", getCategoryValidator, getCategoryById);
router.put("/categories/:id", updateCategoryValidator, updateCategory);
router.delete("/categories/:id", deleteCategoryValidator, deleteCategory);

export default router;
