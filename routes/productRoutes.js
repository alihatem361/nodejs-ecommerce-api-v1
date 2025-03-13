import express from "express";
import {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../utils/Validatore/validateProductId.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProductValidator, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductValidator, getProductById);
router.put("/:id", updateProductValidator, updateProduct);
router.delete("/:id", deleteProductValidator, deleteProduct);

export default router;
