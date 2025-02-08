import mongoose from "mongoose";
import ProductModel from "../models/productModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { deleteOne, updateOne, createOne, getOne } from "./handlersFactory.js"; // Updated import

// ------------------- Create Product -------------------
// Method: POST
// Path: /api/v1/products
// Access: Public
// Description: Create a new product
export const createProduct = createOne(ProductModel); // Updated function call

// ------------------- Get Products -------------------
// Method: GET
// Path: /api/v1/products
// Access: Public
// Description: Get all products with pagination
export const getProducts = asyncHandler(async (req, res) => {
  const numberOfDocuments = await ProductModel.countDocuments();
  const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
    .filter()
    .search("Products")
    .sort()
    .limitFields()
    .paginate(numberOfDocuments);

  const products = await apiFeatures.mongooseQuery;
  res.status(200).json({
    result: products.length,
    paginationResult: apiFeatures.paginationResult,
    total: numberOfDocuments,
    data: products,
  });
});

// ------------------- Get Product By ID -------------------
// Method: GET
// Path: /api/v1/products/:id
// Access: Public
// Description: Get product by ID
export const getProductById = getOne(ProductModel, {
  path: "category",
  select: "name -_id",
}); // Updated function call

// ------------------- Update Product -------------------
// Method: PUT
// Path: /api/v1/products/:id
// Access: Public
// Description: Update product by ID
export const updateProduct = updateOne(ProductModel); // Updated function call
// ------------------- Delete Product -------------------
// Method: DELETE
// Path: /api/v1/products/:id
// Access: Public
// Description: Delete product by ID
export const deleteProduct = deleteOne(ProductModel); // Updated function call
