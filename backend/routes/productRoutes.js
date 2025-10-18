import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

/*
  🌸 ROUTE SUMMARY:
  - GET /api/products → all products (for Garden / Modify)
  - POST /api/products → add new product (Admin Create)
  - GET /api/products/:id → get product by ID
  - PUT /api/products/:id → update
  - DELETE /api/products/:id → remove
*/

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
