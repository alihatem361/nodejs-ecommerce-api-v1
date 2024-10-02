import CategoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";

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
    res.status(201).json({ message: "تم إنشاء القسم بنجاح!" });
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
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ message: "القسم غير موجود!" });
  }
});
