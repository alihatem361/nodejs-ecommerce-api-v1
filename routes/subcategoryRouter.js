import express from "express";
import {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
  getSubcategoriesByCategoryId,
} from "../controllers/subcategoryController.js";
import {
  createSubcategoryValidator,
  getSubcategoryValidator,
  updateSubcategoryValidator,
  deleteSubcategoryValidator,
  getSubcategoriesByCategoryIdValidator,
} from "../utils/Validatore/validateSubcategory.js";

const router = express.Router();

router
  .route("/")
  .post(createSubcategoryValidator, createSubcategory)
  .get(getAllSubcategories);

router
  .route("/category/:categoryId")
  .get(getSubcategoriesByCategoryIdValidator, getSubcategoriesByCategoryId);

router
  .route("/:id")
  .get(getSubcategoryValidator, getSubcategoryById)
  .patch(updateSubcategoryValidator, updateSubcategory)
  .delete(deleteSubcategoryValidator, deleteSubcategory);

export default router;
