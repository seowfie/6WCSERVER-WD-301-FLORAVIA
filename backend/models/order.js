import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  num_ordered: { type: Number, required: true },
  submitted_date: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema, "orders");
