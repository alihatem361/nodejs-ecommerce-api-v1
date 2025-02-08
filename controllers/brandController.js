import BrandModel from "../models/brandModel.js";

import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js"; // Updated import

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
export const getBrands = getAll(BrandModel); // Updated function call

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
