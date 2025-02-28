import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };
};

// Fetch all users with filters
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState().users;
      const queryParams = new URLSearchParams({
        search: filters.search,
        sortBy: filters.sortBy,
        order: filters.order,
        page: filters.page,
        limit: filters.limit
      }).toString();

      const { data } = await axios.get(
        `${apiUrl}/users?${queryParams}`,
        getAuthHeaders()
      );

      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        // Handle unauthorized error (expired token, etc.)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return rejectWithValue("Session expired. Please login again.");
      }
      return rejectWithValue(error.response?.data?.error || "Failed to fetch users");
    }
  }
);

// Fetch single user by ID
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/users/${userId}`,
        getAuthHeaders()
      );

      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return rejectWithValue("Session expired. Please login again.");
      }
      return rejectWithValue(error.response?.data?.error || "Failed to fetch user");
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${apiUrl}/users/${userId}`,
        userData,
        getAuthHeaders()
      );

      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return rejectWithValue("Session expired. Please login again.");
      }
      return rejectWithValue(error.response?.data?.error || "Failed to update user");
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${apiUrl}/users/${userId}`,
        getAuthHeaders()
      );

      return userId;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return rejectWithValue("Session expired. Please login again.");
      }
      return rejectWithValue(error.response?.data?.error || "Failed to delete user");
    }
  }
);


export const createUser = createAsyncThunk(
    "users/createUser",
    async (userData, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          `${apiUrl}/auth/register`,
          userData
        //   getAuthHeaders()
        );
  
        return data;
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          return rejectWithValue("Session expired. Please login again.");
        }
        return rejectWithValue(error.response?.data?.error || "Failed to create user");
      }
    }
  );

