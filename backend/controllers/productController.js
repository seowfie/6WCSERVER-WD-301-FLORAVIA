import Product from "../models/product.js";

/* =========================================================
   🌼 GET ALL PRODUCTS (for Garden Page)
   ========================================================= */
export const getAllProducts = async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Server error fetching products" });
  }
};

/* =========================================================
   🌸 GET PRODUCT BY ID
   ========================================================= */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error);
    res.status(500).json({ message: "Server error fetching product" });
  }
};

/* =========================================================
   🌻 CREATE PRODUCT (for Admin Create Page)
   ========================================================= */
export const createProduct = async (req, res) => {
  try {
    const { name, description, image, category, price, quantity } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = new Product({
      bouquet_name: name,
      description,
      product_image: image,
      category,
      price,
      quantity,
      added_by: "admin",
    });

    await product.save();
    res.status(201).json({ message: "✅ Product added successfully!", product });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({ message: "Server error while adding product" });
  }
};

/* =========================================================
   🌸 UPDATE PRODUCT
   ========================================================= */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ message: "Server error updating product" });
  }
};

/* =========================================================
   💐 DELETE PRODUCT
   ========================================================= */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.json({ ok: true });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ message: "Server error deleting product" });
  }
};
