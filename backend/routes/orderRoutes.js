import express from "express";
import {
  createOrder,
  getAllOrders,
  myOrders,
  updateStatus,  // ✅ Add this line
} from "../controllers/orderController.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("✅ Order route accessed:", req.method, req.originalUrl);
  next();
});

router.post("/", createOrder);
router.get("/all", getAllOrders);
router.get("/my", myOrders);
router.patch("/:id/status", updateStatus); // ✅ Add this route

export default router;
