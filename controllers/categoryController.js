import mongoose from "mongoose";
import CategoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { deleteOne, updateOne, createOne } from "./handlersFactory.js"; // Updated import

import SubcategoryModel from "../models/subCategoryModel.js";
// ------------------- Create Category -------------------
// Method: POST
// Path: /api/v1/categories
// Access: Public
// Description: Create a new category
export const createCategory = createOne(CategoryModel); // Updated

// ------------------- Get Categories -------------------
// Method: GET
// Path: /api/v1/categories
// Access: Public
// Description: Get all categories with pagination
export const getCategories = asyncHandler(async (req, res) => {
  // number of documents
  const numberOfDocuments = await CategoryModel.countDocuments();
  const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate(numberOfDocuments);

  const categories = await apiFeatures.mongooseQuery;
  res.status(200).json({
    result: categories.length,
    paginationResult: apiFeatures.paginationResult,
    total: numberOfDocuments,
    data: categories,
  });
});

// ------------------- Get Category By ID -------------------
// Method: GET
// Path: /api/v1/categories/:id
// Access: Public
// Description: Get category by ID
export const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // use ApiError class to handle errors
    return next(new ApiError("Invalid category ID", 400));
  }

  // get subcategories by category ID
  const subcategories = await SubcategoryModel.find({
    categoryId: id,
  }).select("_id");
  const category = await CategoryModel.findById(id).select("-__v");

  if (category) {
    res.status(200).json({
      data: {
        category,
        subcategories,
      },
    });
  } else {
    // use ApiError class to handle errors
    return next(new ApiError("Category not found", 404));
  }
});

// ------------------- Update Category -------------------
// Method: PUT
// Path: /api/v1/categories/:id
// Access: Public
// Description: Update category by ID
export const updateCategory = updateOne(CategoryModel); // Updated

// ------------------- Delete Category -------------------
// Method: DELETE
// Path: /api/v1/categories/:id
// Access: Public
// Description: Delete category by ID
export const deleteCategory = deleteOne(CategoryModel); // Updated
