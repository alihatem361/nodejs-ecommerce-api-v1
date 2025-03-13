import CategoryModel from "../models/categoryModel.js";
import SubcategoryModel from "../models/subCategoryModel.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";
import {
  uploadSingleImage,
  resizeImage,
} from "../middlewares/uploadImageMiddleware.js";

// ------------------- Upload Category Image -------------------
// Method: POST
export const uploadCategoryImage = uploadSingleImage("image");

// ------------------- Resize Category Image -------------------
// Method: POST
export const resizeCategoryImage = resizeImage("categories", 500, 500);

// ------------------- Create Category -------------------
// Method: POST
// Path: /api/v1/categories
// Access: Public
// Description: Create a new category
export const createCategory = createOne(CategoryModel);

// ------------------- Get Categories -------------------
// Method: GET
// Path: /api/v1/categories
// Access: Public
// Description: Get all categories with pagination
export const getCategories = getAll(CategoryModel);

// ------------------- Get Subcategories By Category ID / Nested Routes -------------------
// Method: GET
// Path: /api/v1/categories/:categoryId/subcategories
// Access: Public
// Description: Get all subcategories by category ID
export const getSubcategoriesByCategoryId = asyncHandler(
  async (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
    const skip = (page - 1) * limit;

    const subcategories = await SubcategoryModel.find({
      categoryId: req.params.categoryId, // Correctly access categoryId
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

// ------------------- Get Category By ID -------------------
// Method: GET
// Path: /api/v1/categories/:id
// Access: Public
// Description: Get category by ID
export const getCategoryById = getOne(CategoryModel);

// ------------------- Update Category -------------------
// Method: PUT
// Path: /api/v1/categories/:id
// Access: Public
// Description: Update category by ID
export const updateCategory = updateOne(CategoryModel);

// ------------------- Delete Category -------------------
// Method: DELETE
// Path: /api/v1/categories/:id
// Access: Public
// Description: Delete category by ID
export const deleteCategory = deleteOne(CategoryModel);
