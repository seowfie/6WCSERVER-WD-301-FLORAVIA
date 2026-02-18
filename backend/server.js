import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import basketRoutes from "./routes/basketRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

// ✅ Allow requests from your frontend (Vite)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://6-wcserver-wd-301-floravia-3gl1.vercel.app", // Your specific Vercel link
    "https://6-wcserver-wd-301-floravia-3gl1-dbx9fvdoo.vercel.app" // Your other Vercel link
  ],
  credentials: true
}));

app.use(express.json());

app.use("/uploads", express.static("uploads"));

// 🌸 Health check route
app.get("/", (req, res) => res.send("Floravia API is running 🌸"));

// 🌼 API routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/basket", basketRoutes);
app.use("/api/upload", uploadRoutes);

// 🌷 Serve static image files (if used)
app.use("/images", express.static("public/images"));

// 🌿 Connect to MongoDB + start server
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(PORT, () =>
      console.log(`🚀 Floravia Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

