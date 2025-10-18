import mongoose from "mongoose";
import Order from "../models/order.js";
import Product from "../models/product.js";
import OrderDetail from "../models/orderDetail.js";

/* =========================================================
   🩷 CREATE ORDER — POST /api/orders
   ========================================================= */
export const createOrder = async (req, res) => {
  try {
    console.log("🛒 Received order data:", req.body);
    const { items, userId, delivery, payment } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: "No items provided" });

    const { product_id, quantity } = items[0]; // One product per order for now
    const product = await Product.findById(product_id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // 🩶 Check stock
    if (product.quantity < quantity)
      return res
        .status(400)
        .json({ message: `Insufficient stock for ${product.bouquet_name}` });

    // 🩷 Create base order
    const order = await Order.create({
      user_id: new mongoose.Types.ObjectId(userId),
      product_id: new mongoose.Types.ObjectId(product_id),
      num_ordered: quantity,
      submitted_date: new Date(),
    });

    // 🧮 Compute total price
    const total = product.price * quantity;

    // 🌼 Create order details record
    await OrderDetail.create({
      order_id: order._id,
      total_price: total,
      payment_method: payment,
      status: "Pending",
      submitted_date: new Date(),
    });

    // 🌿 Deduct stock
    product.quantity -= quantity;
    await product.save();

    console.log("✅ Order + details saved:", order._id);
    res.status(201).json({
      message: "Order placed successfully",
      order_id: order._id,
    });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({
      message: "Server error creating order",
      error: err.message,
    });
  }
};

/* =========================================================
   🌸 GET USER ORDERS — GET /api/orders/my?userId=...
   ========================================================= */
export const myOrders = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId)
      return res.status(400).json({ message: "Missing user ID" });

    // 🩶 Match user's orders and join related collections
    const orders = await Order.aggregate([
      { $match: { user_id: new mongoose.Types.ObjectId(userId) } },

      {
        $lookup: {
          from: "order_details",
          localField: "_id",
          foreignField: "order_id",
          as: "details",
        },
      },
      { $unwind: "$details" },

      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product_info",
        },
      },
      { $unwind: "$product_info" },

      {
        $lookup: {
          from: "info", // ✅ users collection name in your DB
          localField: "user_id",
          foreignField: "_id",
          as: "user_info",
        },
      },
      { $unwind: "$user_info" },

      { $sort: { submitted_date: -1 } },
    ]);

    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    res.status(500).json({
      message: "Server error fetching user orders",
      error: err.message,
    });
  }
};

/* =========================================================
   💐 GET ALL ORDERS — Admin view
   ========================================================= */
export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.aggregate([
      {
        $lookup: {
          from: "order_details",
          localField: "_id",
          foreignField: "order_id",
          as: "details",
        },
      },
      { $unwind: "$details" },

      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product_info",
        },
      },
      { $unwind: "$product_info" },

      {
        $lookup: {
          from: "info", // ✅ fix: your users collection name
          localField: "user_id",
          foreignField: "_id",
          as: "user_info",
        },
      },
      { $unwind: "$user_info" },

      { $sort: { submitted_date: -1 } },
    ]);

    res.json(allOrders);
  } catch (err) {
    console.error("❌ Error fetching all orders:", err);
    res.status(500).json({
      message: "Server error fetching all orders",
      error: err.message,
    });
  }
};

/* =========================================================
   🌿 UPDATE STATUS — PATCH /api/orders/:id/status
   ========================================================= */
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status)
      return res.status(400).json({ message: "Missing status" });

    const updated = await OrderDetail.findOneAndUpdate(
      { order_id: new mongoose.Types.ObjectId(req.params.id) },
      { status },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Order detail not found" });

    res.json({ message: `Status updated to ${status}`, updated });
  } catch (err) {
    console.error("❌ Error updating order status:", err);
    res.status(500).json({
      message: "Server error updating status",
      error: err.message,
    });
  }
};
