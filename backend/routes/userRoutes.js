import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Admin from "../models/admin.js"; // ✅ import admin model

const router = express.Router();

// 🌸 REGISTER (for normal users only)
router.post("/register", async (req, res) => {
  try {
    const { username, firstname, lastname, email, phone, password } = req.body;

    // Check duplicate email (both user + admin)
    const existingUser = await User.findOne({ email });
    const existingAdmin = await Admin.findOne({ email });
    if (existingUser || existingAdmin)
      return res.status(400).json({ message: "Email already exists" });

    const user = new User({
      username,
      firstname,
      lastname,
      email,
      phone,
      password, // ⚠️ plain text (no hashing)
      role: "customer", // default role
    });

    await user.save();

    res.status(201).json({
      message: "✅ User registered successfully!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 💐 LOGIN (works for both User and Admin)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Try finding user first, then admin
    let account = await User.findOne({ email });
    if (!account) account = await Admin.findOne({ email });

    if (!account)
      return res.status(404).json({ message: "Account not found" });

    // Compare plain text passwords
    if (account.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: account._id, role: account.role || "customer" },
      process.env.JWT_SECRET || "supersecretfloravia",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "✅ Login successful!",
      token,
      user: {
        id: account._id,
        username: account.username,
        firstname: account.firstname || "",
        lastname: account.lastname || "",
        email: account.email,
        phone: account.phone || account.phone_num || "",
        address: account.address || "",
        role: account.role || "customer"
      }
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
