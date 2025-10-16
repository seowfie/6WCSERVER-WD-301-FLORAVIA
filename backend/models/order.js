import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // 👇 Make user optional to prevent accidental "user is required" errors
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true },
      },
    ],

    totalPrice: { type: Number, required: true },

    delivery: {
      name: String,
      address: String,
      phone: String,
    },

    status: {
      type: String,
      enum: ["PENDING", "TO SHIP", "TO RECEIVE", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema, "orders");
