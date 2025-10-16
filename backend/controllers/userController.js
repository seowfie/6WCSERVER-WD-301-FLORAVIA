import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ SIGNUP
export const signup = async (req, res) => {
  try {
    const { username, firstname, lastname, email, phone, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({
      username,
      firstname,
      lastname,
      email,
      phone,
      password: hashed,
      role: role || "user", // Default to user
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u) return res.status(404).json({ message: "User not found" });

    const ok = await bcrypt.compare(password, u.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: {
        id: u._id,
        username: u.username,
        firstname: u.firstname,
        lastname: u.lastname,
        email: u.email,
        phone: u.phone,
        address: u.address,
        role: u.role, // Important for redirect
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ✅ GET PROFILE
export const me = async (req, res) => {
  const u = await User.findById(req.user.id).select("-password");
  res.json(u);
};

// ✅ UPDATE PROFILE
export const updateMe = async (req, res) => {
  const allowed = ["username", "firstname", "lastname", "phone", "address"];
  const payload = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => allowed.includes(k))
  );

  const u = await User.findByIdAndUpdate(req.user.id, payload, { new: true }).select("-password");
  res.json(u);
};
