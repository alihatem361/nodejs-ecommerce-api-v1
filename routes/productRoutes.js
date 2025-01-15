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

router.post("/products", createProductValidator, createProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductValidator, getProductById);
router.put("/products/:id", updateProductValidator, updateProduct);
router.delete("/products/:id", deleteProductValidator, deleteProduct);

export default router;
