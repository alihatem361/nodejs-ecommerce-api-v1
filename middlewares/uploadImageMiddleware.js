import multer from "multer";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import ApiError from "../utils/ApiError.js";

const multerOptions = () => {
  // configure multer storage
  const multerStorage = multer.memoryStorage(); // Use memory storage

  // Check if the uploaded file is an image
  const multerFilter = (req, file, cb) => {
    console.log("Multer Filter - File:", file);
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
// Middleware to resize the uploaded image
export const resizeImage =
  (folder, width, height) => async (req, res, next) => {
    if (!req.file) {
      return next();
    }

    const filename = `${folder}-${uuidv4()}.jpeg`;

    try {
      await sharp(req.file.buffer)
        .resize(width, height)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/${folder}/${filename}`);

      req.body[req.file.fieldname] = filename;
      next();
    } catch (error) {
      next(error);
    }
  };

// Middleware to upload a single image
export const uploadSingleImage = (fieldName) =>
  multerOptions().single(fieldName);

// Middleware to upload multiple images
export const uploadMultipleImages = (fields) => multerOptions().fields(fields);
