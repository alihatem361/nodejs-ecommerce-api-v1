import SubcategoryModel from "../models/subcategoryModel.js";
import slugify from "slugify";
import mongoose from "mongoose";

// ------------------- Create Category -------------------
// Method: POST
// Path: /api/v1/subcategories
// Access: Public
// Description: Create a new subcategory
export const createSubcategory = async (req, res) => {
  const subcategory = new SubcategoryModel({
    name: req.body.name,
    slug: slugify(req.body.name),
    categoryId: req.body.categoryId,
  });

  try {
    await subcategory.save();
    res.status(201).json({
      status: "تم إنشاء الفئة الفرعية بنجاح!",
    });
  } catch (error) {
    res.status(400).json({
      status: "حدث خطأ",
      message: error.message,
    });
  }
};

// ------------------- Get Subcategories -------------------
// Method: GET
// Path: /api/v1/subcategories
// Access: Public
// Description: Get all subcategories
export const getAllSubcategories = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
  const skip = (page - 1) * limit;
  const subcategories = await SubcategoryModel.find()
    .select("-__v")
    .skip(skip)
    .limit(limit);

  try {
    res.status(200).json({
      status: "تمت العملية بنجاح",
      total: await SubcategoryModel.countDocuments(),
      results: subcategories.length,
      page,
      data: {
        subcategories,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "حدث خطأ",
      message: error.message,
    });
  }
};

// ------------------- Get Subcategories By Category ID -------------------
// Method: GET
// Path: /api/v1/subcategories/category/:categoryId
// Access: Public
// Description: Get all subcategories by category ID
export const getSubcategoriesByCategoryId = async (req, res) => {
  console.log(req.params.categoryId);
  if (!mongoose.Types.ObjectId.isValid(req.params.categoryId)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid categoryId",
    });
  }

  try {
    const subcategories = await SubcategoryModel.find({
      categoryId: req.params.categoryId,
    }).select("-__v");
    res.status(200).json({
      status: "success",
      results: subcategories.length,
      data: {
        subcategories,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ------------------- Get Subcategory By ID -------------------
// Method: GET
// Path: /api/v1/subcategories/:id
// Access: Public
// Description: Get subcategory by ID
export const getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await SubcategoryModel.findById(req.params.id).select(
      "-__v"
    );
    if (!subcategory) {
      return res.status(404).json({
        status: "fail",
        message: "Subcategory not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        subcategory,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Update a subcategory by ID
export const updateSubcategory = async (req, res) => {
  // print the request body
  console.log(req.body);
  //   // print the request params
  console.log(req.params);
  try {
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
      return res.status(404).json({
        status: "fail",
        message: "Subcategory not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        subcategory,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Delete a subcategory by ID
export const deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await SubcategoryModel.findByIdAndDelete(req.params.id);
    if (!subcategory) {
      return res.status(404).json({
        status: "fail",
        message: "Subcategory not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
