import multer from "multer";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import ApiError from "../utils/ApiError.js";

const multerOptions = (fieldName) => {
  // configure multer storage
  const multerStorage = multer.memoryStorage(); // Use memory storage

  // Check if the uploaded file is an image
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Please upload only images", 400), false);
    }
  };

  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  return upload;
};

// Middleware to upload a single image
export const uploadSingleImage = (fieldName) =>
  multerOptions(fieldName).single(fieldName);

// Middleware to resize the uploaded image
export const resizeImage =
  (folder, width, height) => async (req, res, next) => {
    if (!req.file) return next();

    const filename = `${folder}-${uuidv4()}.jpeg`; // Use uuid to create a unique filename

    await sharp(req.file.buffer) // Use buffer instead of file path
      .resize(width, height)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/images/${folder}/${filename}`);

    // save the image name to the request body
    req.body.image = filename;
    next();
  };

// Middleware to upload multiple images
export const uploadMultipleImages = (fields) => {
  return multerOptions(fields).fields(fields);
};
