import express from "express";
import {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
  getSubcategoriesByCategoryId,
} from "../controllers/subcategoryController.js";

const router = express.Router();

router.route("/").post(createSubcategory).get(getAllSubcategories);

router.route("/category/:categoryId").get(getSubcategoriesByCategoryId);

router
  .route("/:id")
  .get(getSubcategoryById)
  .patch(updateSubcategory)
  .delete(deleteSubcategory);

export default router;
