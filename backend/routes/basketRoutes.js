import express from "express";
import Basket from "../models/basket.js";
import Product from "../models/product.js"; // ✅ Needed for stock check

const router = express.Router();

/*
 🌸 ROUTE SUMMARY:
 - GET /api/basket/:userId → get basket items (populated with product info)
 - POST /api/basket → add or update basket item
 - PATCH /api/basket/:id → update quantity of a basket item
 - DELETE /api/basket/clear/:userId → clear user's basket
 - DELETE /api/basket/:id → remove one basket item
*/

// ✅ Get basket for one user (populated with product data including stock)
router.get("/:userId", async (req, res) => {
  try {
    const items = await Basket.find({ user_id: req.params.userId })
      .populate({
        path: "product_id",
        select: "bouquet_name price product_image quantity",
      })
      .exec();

    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching basket:", err);
    res.status(500).json({ error: "Failed to fetch basket" });
  }
});

// ✅ Add or update basket item with stock check
router.post("/", async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    // ✅ Fetch the product to check stock
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // ✅ Check if requested quantity exceeds available stock
    if (Number(quantity) > product.quantity) {
      return res.status(400).json({
        error: `Insufficient stock. Only ${product.quantity} available.`,
      });
    }

    let existing = await Basket.findOne({ user_id, product_id });

    if (existing) {
      existing.quantity = Number(quantity); // replace quantity
      await existing.save();
      await existing.populate("product_id");
      return res.json({ message: "Quantity updated", item: existing });
    }

    const newItem = new Basket({
      user_id,
      product_id,
      quantity: Number(quantity) || 1,
    });
    await newItem.save();
    await newItem.populate("product_id");

    res.status(201).json({ message: "Item added to basket", item: newItem });
  } catch (err) {
    console.error("❌ Error adding to basket:", err);
    res.status(400).json({ error: "Failed to add item" });
  }
});

// ✅ PATCH route to update quantity of a basket item
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Basket.findByIdAndUpdate(
      req.params.id,
      { quantity: req.body.quantity },
      { new: true }
    ).populate({
      path: "product_id",
      select: "bouquet_name price product_image quantity",
    });

    res.status(200).json({ message: "Quantity updated", item: updated });
  } catch (err) {
    console.error("❌ Failed to update basket item:", err);
    res.status(500).json({ message: "Failed to update basket item" });
  }
});

// ✅ Clear user's basket
router.delete("/clear/:userId", async (req, res) => {
  try {
    await Basket.deleteMany({ user_id: req.params.userId });
    res.json({ message: "Basket cleared successfully" });
  } catch (err) {
    console.error("❌ Error clearing basket:", err);
    res.status(500).json({ error: "Failed to clear basket" });
  }
});

// ✅ Remove single item
router.delete("/:id", async (req, res) => {
  try {
    await Basket.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    console.error("❌ Error removing item:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

export default router;
