import SubcategoryModel from "../models/subCategoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js"; // Import ApiError

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
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
  const skip = (page - 1) * limit;
  const subcategories = await SubcategoryModel.find()
    .select("-__v")
    .skip(skip)
    .limit(limit)
    .populate("categoryId", "name -_id");

  res.status(200).json({
    status: "تمت العملية بنجاح",
    total: await SubcategoryModel.countDocuments(),
    results: subcategories.length,
    page,
    data: {
      subcategories,
    },
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
export const updateSubcategory = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  console.log(req.params);
  const subcategory = await SubcategoryModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: slugify(req.body.name),
      categoryId: req.body.categoryId,
    },
    {
      new: true,
      runValidators: true,
    }
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

// ------------------- Delete Subcategory -------------------
// Method: DELETE
// Path: /api/v1/subcategories/:id
// Access: Public
// Description: Delete subcategory by ID
export const deleteSubcategory = asyncHandler(async (req, res, next) => {
  const subcategory = await SubcategoryModel.findByIdAndDelete(req.params.id);
  if (!subcategory) {
    return next(new ApiError("Subcategory not found", 404)); // Error handling
  }
  res.status(200).json({
    massage: "Subcategory deleted successfully",
  });
});
