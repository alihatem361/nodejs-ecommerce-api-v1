import { param, check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import slugify from "slugify";

// ------------------ CreateCategoryValidator ------------------
export const createCategoryValidator = [
  check("name").notEmpty().isLength({ min: 3 }).withMessage("Name is required"),
  // slugify name
  check("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
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
  // slugyfy name
  check("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorMiddleware,
];

// ------------------ deleteCategoryValidator ------------------
export const deleteCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];
