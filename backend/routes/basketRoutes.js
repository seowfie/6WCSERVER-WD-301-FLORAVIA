import express from "express";
import Basket from "../models/basket.js";

const router = express.Router();

/*
 🌸 ROUTE SUMMARY:
 - GET /api/basket/:userId → get basket items (populated with product info)
 - POST /api/basket → add or update basket item
 - DELETE /api/basket/clear/:userId → clear user's basket
 - DELETE /api/basket/:id → remove one basket item
*/

// ✅ Get basket for one user (populated with product data)
router.get("/:userId", async (req, res) => {
  try {
    const items = await Basket.find({ user_id: req.params.userId })
      .populate({
        path: "product_id",
        select: "bouquet_name price product_image",
      })
      .exec();

    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching basket:", err);
    res.status(500).json({ error: "Failed to fetch basket" });
  }
});

// ✅ Add or update basket item
router.post("/", async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    let existing = await Basket.findOne({ user_id, product_id });

    if (existing) {
      existing.quantity += quantity || 1;
      await existing.save();
      await existing.populate("product_id");
      return res.json({ message: "Quantity updated", item: existing });
    }

    const newItem = new Basket({ user_id, product_id, quantity });
    await newItem.save();
    await newItem.populate("product_id");

    res.status(201).json({ message: "Item added to basket", item: newItem });
  } catch (err) {
    console.error("❌ Error adding to basket:", err);
    res.status(400).json({ error: "Failed to add item" });
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
