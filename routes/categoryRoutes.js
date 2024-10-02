import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

// طريقة اخرى للتصدير والاستيراد للدوال تلخص الكود السابق
// router.route("/categories").post(createCategory).get(getCategories);
// router.route("/categories/:id").get(getCategoryById).put(updateCategory).delete(deleteCategory);

export default router;
