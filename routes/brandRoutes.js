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
} from "../controllers/brandController.js";

const router = express.Router();

router.post("/brands", createBrandValidator, createBrand);
router.get("/brands", getBrands);

router.get("/brands/:id", getBrandValidator, getBrandById);
router.put("/brands/:id", updateBrandValidator, updateBrand);
router.delete("/brands/:id", deleteBrandValidator, deleteBrand);

export default router;
