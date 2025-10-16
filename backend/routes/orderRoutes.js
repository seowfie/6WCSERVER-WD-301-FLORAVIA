import express from "express";
import {
  createOrder,
  myOrders,
  updateStatus,
  getAllOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("✅ Order route accessed:", req.method, req.originalUrl);
  next();
});

// ✅ Create new order
router.post("/", createOrder);

// ✅ Get user's own orders (populated with product info)
router.get("/my", myOrders);

// ✅ Admin: get all orders (populated with product info)
router.get("/all", getAllOrders);

// ✅ Update order status
router.patch("/:id/status", updateStatus);

export default router;
