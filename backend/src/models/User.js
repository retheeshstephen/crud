import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔹 Pre-save middleware to hash password using bcrypt
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = 10; // Recommended value
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// 🔹 Method to check password
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
