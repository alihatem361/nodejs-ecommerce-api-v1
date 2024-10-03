import { param } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

const getCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];

export default getCategoryValidator;
