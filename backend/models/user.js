import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  address: { type: String },
  role: { type: String, default: "customer" }, // 👈 important
});

export default mongoose.model("User", userSchema, "info");
