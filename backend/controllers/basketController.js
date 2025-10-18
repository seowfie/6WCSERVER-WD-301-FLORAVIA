import Basket from "../models/basket.js";
import Product from "../models/product.js";

// Add or update item in basket
export const addOrUpdateBasketItem = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    // ✅ Fetch the product to get current stock
    const product = await Product.findById(product_id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // ✅ Check stock
    let existing = await Basket.findOne({ user_id, product_id });
    const totalQty = (existing?.quantity || 0) + Number(quantity);

    if (totalQty > product.quantity) {
      return res.status(400).json({
        message: `Insufficient stock. Only ${product.quantity - (existing?.quantity || 0)} left.`,
      });
    }

    if (existing) {
      existing.quantity = totalQty;
      await existing.save();
      return res.status(200).json({ message: "Basket updated", item: existing });
    }

    const newItem = await Basket.create({
      user_id,
      product_id,
      quantity: Number(quantity),
    });

    res.status(201).json({ message: "Item added to basket", item: newItem });
  } catch (err) {
    console.error("Error updating basket:", err);
    res.status(500).json({ message: "Server error updating basket" });
  }
};
