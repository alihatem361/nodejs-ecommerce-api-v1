import express from "express";
import {
  getBrandValidator,
  createBrandValidator,
  deleteBrandValidator,
  updateBrandValidator,
} from "../utils/Validatore/validateBrandId.js";
import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeBrandImage,
} from "../controllers/brandController.js";

const router = express.Router();

router.post(
  "/",
  uploadBrandImage,
  resizeBrandImage,
  createBrandValidator,
  createBrand
);
router.get("/", getBrands);

router.get("/:id", getBrandValidator, getBrandById);
router.put(
  "/:id",
  uploadBrandImage,
  resizeBrandImage,
  updateBrandValidator,
  updateBrand
);
router.delete("/:id", deleteBrandValidator, deleteBrand);

export default router;
