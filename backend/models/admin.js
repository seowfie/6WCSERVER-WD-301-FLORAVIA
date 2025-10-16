import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: "admin" },
  last_login: Date,
  activity_logs: Array,
});

export default mongoose.model("Admin", adminSchema, "admin");
