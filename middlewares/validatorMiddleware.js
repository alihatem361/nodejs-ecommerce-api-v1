// validatorMiddleware.js

import { validationResult } from "express-validator";

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default validatorMiddleware;
// The validatorMiddleware function is a middleware function that checks if there are any validation errors in the request. If there are any errors, it sends a response with a status of 400 and an array of errors. Otherwise, it calls the next middleware in the stack.
