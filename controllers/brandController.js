import mongoose from "mongoose";
import BrandModel from "../models/brandModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";

// ------------------- Create Brand -------------------
// Method: POST
// Path: /api/v1/brands
// Access: Public
// Description: Create a new brand
export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const newBrand = new BrandModel({ name, slug: slugify(name) });

  try {
    await newBrand.save();
    res
      .status(201)
      .json({ message: "تم إنشاء العلامة التجارية بنجاح!", data: newBrand });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "هذه العلامة التجارية موجودة بالفعل!" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// ------------------- Get Brands -------------------
// Method: GET
// Path: /api/v1/brands
// Access: Public
// Description: Get all brands with pagination
export const getBrands = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
  const skip = (page - 1) * limit;

  const brands = await BrandModel.find().select("-__v").skip(skip).limit(limit);
  const totalBrands = await BrandModel.countDocuments();

  res.status(200).json({
    result: brands.length,
    total: totalBrands,
    page,
    pages: Math.ceil(totalBrands / limit),
    data: brands,
  });
});

// ------------------- Get Brand By ID -------------------
// Method: GET
// Path: /api/v1/brands/:id
// Access: Public
// Description: Get brand by ID
export const getBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // use ApiError class to handle errors
    return next(new ApiError("Invalid brand ID", 400));
  }

  const brand = await BrandModel.findById(id).select("-__v");
  if (brand) {
    res.status(200).json({
      data: brand,
    });
  } else {
    // use ApiError class to handle errors
    return next(new ApiError("Brand not found", 404));
  }
});

// ------------------- Update Brand -------------------
// Method: PUT
// Path: /api/v1/brands/:id
// Access: Public
// Description: Update brand by ID
export const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("رقم العلامة التجارية غير صحيح", 400));
  }

  const brand = await BrandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (brand) {
    await brand.save();
    res
      .status(200)
      .json({ message: "تم تحديث العلامة التجارية بنجاح!", data: brand });
  } else {
    return next(new ApiError("Brand not found", 404));
  }
});

// ------------------- Delete Brand -------------------
// Method: DELETE
// Path: /api/v1/brands/:id
// Access: Public
// Description: Delete brand by ID
export const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId before deleting
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid brand ID", 400));
  }

  const brand = await BrandModel.findById(id);
  if (brand) {
    await BrandModel.deleteOne({ _id: id });
    res.status(200).json({ message: "تم حذف العلامة التجارية بنجاح!" });
  } else {
    res.status(404).json({ message: "العلامة التجارية غير موجودة!" });
  }
});
