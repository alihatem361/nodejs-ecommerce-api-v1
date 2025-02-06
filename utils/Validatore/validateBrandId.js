import { param, check, body } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import slugify from "slugify";

// ------------------ createBrandValidator ------------------
export const createBrandValidator = [
  check("name").notEmpty().isLength({ min: 3 }).withMessage("Name is required"),
  validatorMiddleware,
];

// ------------------ getBrandValidator ------------------
export const getBrandValidator = [
  param("id").isMongoId().withMessage("Invalid brand id"),
  validatorMiddleware,
];

// ------------------ updateBrandValidator ------------------
export const updateBrandValidator = [
  param("id").isMongoId().withMessage("Invalid brand id"),
  // slugyfy name
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorMiddleware,
];

// ------------------ deleteBrandValidator ------------------
export const deleteBrandValidator = [
  param("id").isMongoId().withMessage("Invalid brand id"),
  validatorMiddleware,
];
