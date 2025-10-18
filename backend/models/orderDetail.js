import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  total_price: { type: Number, required: true },
  payment_method: { type: String, required: true },
  submitted_date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "To Ship", "To Receive", "Completed", "Cancelled"],
    default: "Pending",
  },
});

export default mongoose.model("OrderDetail", orderDetailSchema, "order_details");
