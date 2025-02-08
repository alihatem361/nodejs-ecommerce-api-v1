import SubcategoryModel from "../models/subCategoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js"; // Import ApiError
import ApiFeatures from "../utils/apiFeatures.js"; // Import ApiFeatures
import { deleteOne, updateOne } from "./handlersFactory.js"; // Updated import

// ------------------- Create Category -------------------
// Method: POST
// Path: /api/v1/subcategories
// Access: Public
// Description: Create a new subcategory
export const createSubcategory = asyncHandler(async (req, res, next) => {
  const subcategory = new SubcategoryModel({
    name: req.body.name,
    slug: slugify(req.body.name),
    categoryId: req.body.categoryId,
  });

  await subcategory.save();
  res.status(201).json({
    status: "تم إنشاء الفئة الفرعية بنجاح!",
  });
});

// ------------------- Get Subcategories -------------------
// Method: GET
// Path: /api/v1/subcategories
// Access: Public
// Description: Get all subcategories
export const getAllSubcategories = asyncHandler(async (req, res, next) => {
  const numberOfDocuments = await SubcategoryModel.countDocuments();
  const apiFeatures = new ApiFeatures(SubcategoryModel.find(), req.query)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate(numberOfDocuments);

  const subcategories = await apiFeatures.mongooseQuery;
  res.status(200).json({
    result: subcategories.length,
    paginationResult: apiFeatures.paginationResult,
    total: numberOfDocuments,
    data: subcategories,
  });
});

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
export const getSubcategoryById = asyncHandler(async (req, res, next) => {
  const subcategory = await SubcategoryModel.findById(req.params.id).select(
    "-__v"
  );
  if (!subcategory) {
    return next(new ApiError("Subcategory not found", 404)); // Error handling
  }
  res.status(200).json({
    status: "success",
    data: {
      subcategory,
    },
  });
});

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
