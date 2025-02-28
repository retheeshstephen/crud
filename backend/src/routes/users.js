import express from "express";
import { auth } from "../middleware/auth.js";
import { getAllUsers, deleteUser, updateUser } from "../Controller/userController.js";

const router = express.Router();

// Get all users (Protected)
router.get("/", auth, getAllUsers);

// Update user
router.put("/:id", auth, updateUser);

// Delete user (Protected)
router.delete("/:id", auth, deleteUser);

export default router;
