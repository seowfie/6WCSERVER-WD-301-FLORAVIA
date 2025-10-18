import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =========================================================
   ✨ CREATE USER (Sign Up)
   ========================================================= */
export const createUser = async (req, res) => {
  try {
    const { username, email, password, firstname, lastname, phone } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({
      username,
      email,
      password,
      firstname,
      lastname,
      phone,
    });

    res.status(201).json({
      message: "✅ User created successfully",
      user,
    });
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).json({ message: "Server error creating user" });
  }
};

/* =========================================================
   🌸 LOGIN USER
   ========================================================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "✅ Login successful",
      user,
    });
  } catch (err) {
    console.error("❌ Error logging in:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

/* =========================================================
   🌿 GET ALL USERS
   ========================================================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ message: "Server error fetching users" });
  }
};

/* =========================================================
   🩷 UPDATE ADDRESS (NEW)
   ========================================================= */
export const updateAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.address = address;
    await user.save();

    res.json({
      message: "✅ Address updated successfully",
      user,
    });
  } catch (err) {
    console.error("❌ Error updating address:", err);
    res.status(500).json({ message: "Server error updating address" });
  }
};
