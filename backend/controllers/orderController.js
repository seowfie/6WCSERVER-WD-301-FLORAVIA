import Order from "../models/order.js";
import Product from "../models/product.js";

/* =========================================================
   🌸 CREATE ORDER — POST /api/orders
   ========================================================= */
export const createOrder = async (req, res) => {
  try {
    console.log("🛒 Received order data:", req.body);
    const { items, userId, delivery } = req.body;

    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: "No items provided" });

    const detailed = [];
    let total = 0;

    for (const it of items) {
      // ✅ Now lookup by product_id directly (not by name)
      const p = await Product.findById(it.product_id);
      if (!p) {
        console.error("❌ Product not found:", it.product_id);
        return res.status(404).json({ message: `Product not found` });
      }

      // ✅ Check stock
      if (p.quantity < it.quantity)
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${p.bouquet_name}` });

      // ✅ Push into items array
      detailed.push({
        product: p._id,
        quantity: it.quantity,
        unitPrice: p.price,
      });

      total += p.price * it.quantity;

      // ✅ Decrease stock
      p.quantity = Math.max(0, p.quantity - it.quantity);
      await p.save();
    }

    // ✅ Create the order
    const order = await Order.create({
      user: userId || null,
      items: detailed,
      totalPrice: total,
      delivery: delivery || {},
      status: "PENDING",
    });

    console.log("✅ Order successfully created:", order._id);
    res.status(201).json({
      message: "Order successfully created",
      order,
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
   🌿 GET USER ORDERS — GET /api/orders/my?userId=...
   ========================================================= */
export const myOrders = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: "Missing user ID" });

    const orders = await Order.find({ user: userId })
      .populate("items.product", "bouquet_name product_image price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

/* =========================================================
   💐 UPDATE STATUS — PATCH /api/orders/:id/status
   ========================================================= */
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = [
      "PENDING",
      "TO SHIP",
      "TO RECEIVE",
      "COMPLETED",
      "CANCELLED",
    ];
    if (!allowed.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({
      message: `✅ Order status updated to ${status}`,
      order,
    });
  } catch (err) {
    console.error("❌ Error updating order status:", err);
    res.status(500).json({ message: "Server error updating status" });
  }
};

/* =========================================================
   🌼 GET ALL ORDERS — GET /api/orders/all
   ========================================================= */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "firstname lastname email")
      .populate("items.product", "bouquet_name product_image price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching all orders:", err);
    res.status(500).json({ message: "Server error fetching all orders" });
  }
};
