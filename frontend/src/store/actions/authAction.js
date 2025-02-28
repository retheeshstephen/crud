import {  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;


// 🔹 Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${apiUrl}/auth/register`, userData, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Registration failed");
    }
  }
);

// 🔹 Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${apiUrl}/auth/login`, credentials, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

// 🔹 Logout User
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return null;
});