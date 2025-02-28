import User from "../models/User.js";
import jwt from "jsonwebtoken";

// 🔹 Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// 🔹 Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email or phone number already exists" });
    }

    // Create and save new user
    const user = new User({ name, email, phone, password });
    await user.save();

    // Generate token
    const token = generateToken(user._id);  

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, createdAt: user.createdAt },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Login user
export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    console.log(identifier, password);
    

    // Find user by email or phone
    const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, createdAt: user.createdAt },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



