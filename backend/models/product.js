import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    bouquet_name: { type: String, required: true }, // e.g. "Red Tulips"
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 }, // stock
    category: { type: String, default: "Romance" },
    product_image: { type: String, default: "" }, // image path or filename
    added_by: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema, "products");
