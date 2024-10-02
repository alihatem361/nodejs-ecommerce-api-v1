import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/categories", createCategory);
router.get("/categories", getCategories);

// طريقة اخرى للتصدير والاستيراد للدوال تلخص الكود السابق
// router.route("/categories").post(createCategory).get(getCategories);

export default router;
