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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await ProductModel.find()
    .select("-__v")
    .skip(skip)
    .limit(limit);
  const totalProducts = await ProductModel.countDocuments();

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

  const product = await ProductModel.findById(id).select("-__v");
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
  const { title, description, quantity, price, category, imageCover } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid product ID", 400));
  }

  const product = await ProductModel.findOneAndUpdate(
    { _id: id },
    {
      title,
      slug: slugify(title),
      description,
      quantity,
      price,
      category,
      imageCover,
    },
    { new: true }
  );

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
