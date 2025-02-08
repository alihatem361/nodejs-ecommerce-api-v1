import mongoose from "mongoose";
import BrandModel from "../models/brandModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { deleteOne, updateOne, createOne, getOne } from "./handlersFactory.js"; // Updated import

// ------------------- Create Brand -------------------
// Method: POST
// Path: /api/v1/brands
// Access: Public
// Description: Create a new brand
export const createBrand = createOne(BrandModel); // Updated function call

// ------------------- Get Brands -------------------
// Method: GET
// Path: /api/v1/brands
// Access: Public
// Description: Get all brands with pagination
export const getBrands = asyncHandler(async (req, res) => {
  // number of documents
  const numberOfDocuments = await BrandModel.countDocuments();
  const apiFeatures = new ApiFeatures(BrandModel.find(), req.query)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate(numberOfDocuments);

  const brands = await apiFeatures.mongooseQuery;
  res.status(200).json({
    result: brands.length,
    paginationResult: apiFeatures.paginationResult,
    total: numberOfDocuments,
    data: brands,
  });
});

// ------------------- Get Brand By ID -------------------
// Method: GET
// Path: /api/v1/brands/:id
// Access: Public
// Description: Get brand by ID
export const getBrandById = getOne(BrandModel); // Updated function call

// ------------------- Update Brand -------------------
// Method: PUT
// Path: /api/v1/brands/:id
// Access: Public
// Description: Update brand by ID
export const updateBrand = updateOne(BrandModel);

// ------------------- Delete Brand -------------------
// Method: DELETE
// Path: /api/v1/brands/:id
// Access: Public
// Description: Delete brand by ID
export const deleteBrand = deleteOne(BrandModel);
