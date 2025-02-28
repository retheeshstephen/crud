import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers, fetchUserById, updateUser, deleteUser, createUser } from "../actions/userAction";

const initialState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
  totalUsers: 0,
  message: null,
  filters: {
    search: "",
    sortBy: "createdAt",
    order: "desc",
    page: 1,
    limit: 10
  },
  authError: null // New state for auth-related errors
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.authError = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    updateFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearUsers: (state) => {
      state.users = [];
      state.totalUsers = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload
        console.log( state.users );
        state.totalUsers = action.payload.total;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === "Session expired. Please login again.") {
          state.authError = action.payload;
        } else {
          state.error = action.payload;
        }
      })
      // Fetch single user
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === "Session expired. Please login again.") {
          state.authError = action.payload;
        } else {
          state.error = action.payload;
        }
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.users = state.users.map(user => 
          user._id === updatedUser._id ? updatedUser : user
        );
        if (state.selectedUser?._id === updatedUser._id) {
          state.selectedUser = updatedUser;
        }
        state.message = "User Updated successfully";

      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === "Session expired. Please login again.") {
          state.authError = action.payload;
        } else {
          state.error = action.payload;
          
        }
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user._id !== action.payload);
        if (state.selectedUser?._id === action.payload) {
          state.selectedUser = null;
        }
        state.message = "User deleted successfully";
        state.totalUsers -= 1;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === "Session expired. Please login again.") {
          state.authError = action.payload;
        } else {
          state.error = action.payload;
        }
      })

      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [action.payload, ...state.users]; // Add new user to the list
        state.totalUsers += 1;
        state.message = "User created successfully";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === "Session expired. Please login again.") {
          state.authError = action.payload;
        } else {
          state.error = action.payload;
          console.log(state.error);
          
        }
      });
  }
});

// Export actions
export const {
  clearError,
  setSelectedUser,
  clearSelectedUser,
  updateFilters,
  resetFilters,
  clearUsers,
  clearMessage
} = usersSlice.actions;
export default usersSlice.reducer;