import mongoose from "mongoose";
import ProductModel from "../models/productModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";

// ------------------- Create Product -------------------
// Method: POST
// Path: /api/v1/products
// Access: Public
// Description: Create a new product
export const createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const newProduct = new ProductModel(req.body);

  try {
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully!", data: newProduct });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
});

// ------------------- Get Products -------------------
// Method: GET
// Path: /api/v1/products
// Access: Public
// Description: Get all products with pagination
export const getProducts = asyncHandler(async (req, res) => {
  // Pagination logic
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Filtering logic
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  // Advanced filtering
  //   فايدة الجزء ده:
  // تحويل Query Parameters لشيء مفهوم ومقبول من MongoDB.
  // تسهيل عمليات الفلترة بناءً على قيم معينة (زي السعر، التاريخ... إلخ).
  // جعل الكود ديناميكي، بحيث يدعم شروط فلترة متعددة زي (gte, lte, gt, lt) بسهولة. 💪
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // Query execution
  const query = ProductModel.find(JSON.parse(queryStr))
    .select("-__v")
    .skip(skip)
    .limit(limit)
    .populate("category", "name -_id");

  const products = await query;
  const totalProducts = await ProductModel.countDocuments(JSON.parse(queryStr));

  res.status(200).json({
    result: products.length,
    total: totalProducts,
    page,
    pages: Math.ceil(totalProducts / limit),
    data: products,
  });
});

// ------------------- Get Product By ID -------------------
// Method: GET
// Path: /api/v1/products/:id
// Access: Public
// Description: Get product by ID
export const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid product ID", 400));
  }

  const product = await ProductModel.findById(id)
    .select("-__v")
    .populate("category", "name -_id");
  if (product) {
    res.status(200).json({ data: product });
  } else {
    return next(new ApiError("Product not found", 404));
  }
});

// ------------------- Update Product -------------------
// Method: PUT
// Path: /api/v1/products/:id
// Access: Public
// Description: Update product by ID
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid product ID", 400));
  }

  const product = await ProductModel.findOneAndUpdate({ _id: id }, req.body);

  if (product) {
    await product.save();
    res.status(200).json({ message: "Product updated successfully!" });
  } else {
    return next(new ApiError("Product not found", 404));
  }
});

// ------------------- Delete Product -------------------
// Method: DELETE
// Path: /api/v1/products/:id
// Access: Public
// Description: Delete product by ID
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid product ID", 400));
  }

  const product = await ProductModel.findById(id);
  if (product) {
    await ProductModel.deleteOne({ _id: id });
    res.status(200).json({ message: "Product deleted successfully!" });
  } else {
    return next(new ApiError("Product not found", 404));
  }
});
