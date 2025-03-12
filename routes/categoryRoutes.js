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
  uploadCategoryImage,
  resizeCategoryImage,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", uploadCategoryImage,resizeCategoryImage, createCategoryValidator, createCategory);
router.get("/", getCategories);

router.get("/:id", getCategoryValidator, getCategoryById);
router.put("/:id", updateCategoryValidator, updateCategory);
router.delete("/:id", deleteCategoryValidator, deleteCategory);
// Path: /api/v1/:categoryId/subcategories
router.get(
  "/:categoryId/subcategories",
  getSubcategoriesByCategoryIdValidator,
  getSubcategoriesByCategoryId
);
export default router;
