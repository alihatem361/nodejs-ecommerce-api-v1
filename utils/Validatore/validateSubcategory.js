import { param, check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import slugify from "slugify";

// ------------------ createSubcategoryValidator ------------------
export const createSubcategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  check("categoryId").notEmpty().withMessage("Category id is required"),
  validatorMiddleware,
];

// ------------------ getSubcategoryValidator ------------------
export const getSubcategoryValidator = [
  param("id").isMongoId().withMessage("Invalid subcategory id"),
  validatorMiddleware,
];

// ------------------ getSubcategoriesByCategoryIdValidator ------------------
export const getSubcategoriesByCategoryIdValidator = [
  param("categoryId").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];

// ------------------ updateSubcategoryValidator ------------------
export const updateSubcategoryValidator = [
  param("id").isMongoId().withMessage("Invalid subcategory id"),
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  // slugify name
  check("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorMiddleware,
];

// ------------------ deleteSubcategoryValidator ------------------
export const deleteSubcategoryValidator = [
  param("id").isMongoId().withMessage("Invalid subcategory id"),
  validatorMiddleware,
];
