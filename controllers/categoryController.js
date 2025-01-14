import mongoose from "mongoose";
import CategoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";

// ------------------- Create Category -------------------
// Method: POST
// Path: /api/v1/categories
// Access: Public
// Description: Create a new category
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const newCategory = new CategoryModel({ name, slug: slugify(name) });

  try {
    await newCategory.save();
    res
      .status(201)
      .json({ message: "تم إنشاء القسم بنجاح!", data: newCategory });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "هذا القسم موجود بالفعل!" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// ------------------- Get Categories -------------------
// Method: GET
// Path: /api/v1/categories
// Access: Public
// Description: Get all categories with pagination
export const getCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
  const skip = (page - 1) * limit;

  const categories = await CategoryModel.find()
    .select("-__v")
    .skip(skip)
    .limit(limit);
  const totalCategories = await CategoryModel.countDocuments();

  res.status(200).json({
    result: categories.length,
    total: totalCategories,
    page,
    pages: Math.ceil(totalCategories / limit),
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

  const category = await CategoryModel.findById(id).select("-__v");
  if (category) {
    res.status(200).json({
      data: category,
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
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("رقم القسم غير صحيح", 400));
  }

  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (category) {
    await category.save();
    res.status(200).json({ message: "تم تحديث القسم بنجاح!" });
  } else {
    return next(new ApiError("Category not found", 404));
  }
});

// ------------------- Delete Category -------------------
// Method: DELETE
// Path: /api/v1/categories/:id
// Access: Public
// Description: Delete category by ID
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId before deleting
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid category ID", 400));
  }

  const category = await CategoryModel.findById(id);
  if (category) {
    await CategoryModel.deleteOne({ _id: id });
    res.status(200).json({ message: "تم حذف القسم بنجاح!" });
  } else {
    res.status(404).json({ message: "القسم غير موجود!" });
  }
});
