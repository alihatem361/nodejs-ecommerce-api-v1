import multer from "multer";
import ApiError from "../utils/ApiError.js";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import sharp from "sharp";
import { uploadMultipleImages } from "../middlewares/uploadImageMiddleware.js";
import ProductModel from "../models/productModel.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js"; // Updated import

// Middleware to upload product media images
export const uploadProductMediaImages = uploadMultipleImages([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

// Middleware to resize the uploaded product image
export const resizeProductImage = async (req, res, next) => {
  if (!req.files.imageCover) return next();

  // 1) Image Cover using uuid
  const imageCoverFilename = `product-${uuidv4()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/products/${imageCoverFilename}`);

  req.body.imageCover = imageCoverFilename;
  console.log("===>", req.body.imageCover);
  console.log("===>", imageCoverFilename);

  // 2) Images using uuid and map
  // check if there are images
  if (!req.files.images) return next();
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `product-${uuidv4()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
};

// ------------------- Create Product -------------------
// Method: POST
// Path: /api/v1/products
// Access: Public
// Description: Create a new product
export const createProduct = createOne(ProductModel); // Updated function call

// ------------------- Get Products -------------------
// Method: GET
// Path: /api/v1/products
// Access: Public
// Description: Get all products with pagination
export const getProducts = getAll(ProductModel, "Products"); // Updated function call

// ------------------- Get Product By ID -------------------
// Method: GET
// Path: /api/v1/products/:id
// Access: Public
// Description: Get product by ID
export const getProductById = getOne(ProductModel); // Updated function call

// ------------------- Update Product -------------------
// Method: PUT
// Path: /api/v1/products/:id
// Access: Public
// Description: Update product by ID
export const updateProduct = updateOne(ProductModel); // Updated function call
// ------------------- Delete Product -------------------
// Method: DELETE
// Path: /api/v1/products/:id
// Access: Public
// Description: Delete product by ID
export const deleteProduct = deleteOne(ProductModel); // Updated function call
