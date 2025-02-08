import express from "express";
import {
  getCategoryValidator,
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
  getSubcategoriesByCategoryIdValidator,
} from "../utils/Validatore/validateCategoryId.js";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getSubcategoriesByCategoryId,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/categories", createCategoryValidator, createCategory);
router.get("/categories", getCategories);

router.get("/categories/:id", getCategoryValidator, getCategoryById);
router.put("/categories/:id", updateCategoryValidator, updateCategory);
router.delete("/categories/:id", deleteCategoryValidator, deleteCategory);
// Path: /api/v1/categories/:categoryId/subcategories
router.get(
  "/categories/:categoryId/subcategories",
  getSubcategoriesByCategoryIdValidator,
  getSubcategoriesByCategoryId
);
export default router;
