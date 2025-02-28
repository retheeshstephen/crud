import User from "../models/User.js";

// 🔹 Get all users (Protected Route)
export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id; // Assuming you store user in req.user after authentication

    // Find all users except the current user
    const users = await User.find(
      { 
        _id: { $ne: currentUserId } // $ne means "not equal"
      }, 
      { password: 0 } // Exclude password field
    );
// Exclude password field
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateUser = async (req, res) => {
    try {
      const { name, email, phone } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, phone },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// 🔹 Delete user (Protected Route)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
