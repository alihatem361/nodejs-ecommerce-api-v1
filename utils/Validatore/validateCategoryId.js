import { param, check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

// ------------------ CreateCategoryValidator ------------------
export const createCategoryValidator = [
  check("name").notEmpty().isLength({ min: 3 }).withMessage("Name is required"),
  validatorMiddleware,
];

// ------------------ getCategoryValidator ------------------
export const getCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];

// ------------------ updateCategoryValidator ------------------
export const updateCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];

// ------------------ deleteCategoryValidator ------------------
export const deleteCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];
