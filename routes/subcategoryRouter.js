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

// ال mergeParams: true يسمح لنا بالوصول إلى الوسائط المتغيرة في الطرق الفرعية
// mergeParams: true allows us to access the route parameters in the sub-routes
const router = express.Router({ mergeParams: true });

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
