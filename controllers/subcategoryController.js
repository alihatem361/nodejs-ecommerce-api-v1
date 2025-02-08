import SubcategoryModel from "../models/subCategoryModel.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js"; // Import ApiError
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js"; // Updated import

// ------------------- Create Category -------------------
// Method: POST
// Path: /api/v1/subcategories
// Access: Public
// Description: Create a new subcategory
export const createSubcategory = createOne(SubcategoryModel); // Updated createSubcategory

// ------------------- Get Subcategories -------------------
// Method: GET
// Path: /api/v1/subcategories
// Access: Public
// Description: Get all subcategories
export const getAllSubcategories = getAll(SubcategoryModel); // Updated getAllSubcategories

// ------------------- Get Subcategories By Category ID / Nested Routes -------------------
// Method: GET
// Path: /api/v1/subcategories/category/:categoryId
// Access: Public
// Description: Get all subcategories by category ID
export const getSubcategoriesByCategoryId = asyncHandler(
  async (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
    const skip = (page - 1) * limit;

    const subcategories = await SubcategoryModel.find({
      categoryId: req.params.categoryId,
    })
      .select("-__v")
      .skip(skip)
      .limit(limit);

    if (subcategories.length === 0) {
      return next(new ApiError("Subcategories not found", 404)); // Error handling
    }
    res.status(200).json({
      status: "success",
      results: subcategories.length,
      data: {
        subcategories,
      },
    });
  }
);

// ------------------- Get Subcategory By ID -------------------
// Method: GET
// Path: /api/v1/subcategories/:id
// Access: Public
// Description: Get subcategory by ID
export const getSubcategoryById = getOne(SubcategoryModel); // Updated getSubcategoryById

// ------------------- Update Subcategory -------------------
// Method: PUT
// Path: /api/v1/subcategories/:id
// Access: Public
// Description: Update subcategory by ID
export const updateSubcategory = updateOne(SubcategoryModel); // Updated updateSubcategory

// ------------------- Delete Subcategory -------------------
// Method: DELETE
// Path: /api/v1/subcategories/:id
// Access: Public
// Description: Delete subcategory by ID
export const deleteSubcategory = deleteOne(SubcategoryModel); // Updated deleteSubcategory
