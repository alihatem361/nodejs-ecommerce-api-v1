import { param, check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

// ------------------ createProductValidator ------------------
export const createProductValidator = [
  check("title").notEmpty().withMessage("Title is required"),
  check("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  check("category").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];

// ------------------ getProductValidator ------------------
export const getProductValidator = [
  param("id").isMongoId().withMessage("Invalid product id"),
  validatorMiddleware,
];

// ------------------ updateProductValidator ------------------
export const updateProductValidator = [
  param("id").isMongoId().withMessage("Invalid product id"),
  check("title").optional().notEmpty().withMessage("Title is required"),
  check("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),
  check("category").optional().isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];

// ------------------ deleteProductValidator ------------------
export const deleteProductValidator = [
  param("id").isMongoId().withMessage("Invalid product id"),
  validatorMiddleware,
];
