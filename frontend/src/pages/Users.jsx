// Users.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, Edit2, Eye, Plus, X } from "lucide-react";
import {
  deleteUser,
  fetchAllUsers,
  createUser,
  updateUser,
} from "../store/actions/userAction";
import { Formik, Form, Field } from "formik";
import { clearError, clearMessage } from "../store/slices/usersSlice";
import { toast } from "react-toastify";
import { UserSchema } from "../validation/userSchema";
import ModelView from "../components/ModelView";

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { users, error, message } = useSelector((state) => state.users);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  console.log("message", message);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
    setModalType(null);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (selectedUser) {
        // Remove password if it's empty during update
        const updateData = { ...values };
        if (!updateData.password) {
          delete updateData.password;
        }
        console.log("Update values:", updateData);
        await dispatch(
          updateUser({
            userId: selectedUser._id,
            userData: updateData,
          })
        );
      } else {
        console.log("Create values:", values);
        await dispatch(createUser(values));
      }

      // Fetch updated user list
      await dispatch(fetchAllUsers());

      resetForm();
      setShowForm(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const initialValues = selectedUser
    ? {
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        phone: selectedUser.phone || "",
        password: "", // Empty password field for updates
      }
    : {
        name: "",
        email: "",
        phone: "",
        password: "",
      };

  return (
    <div className="p-6 relative">
      {/* Main Content */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={() => {
            setSelectedUser(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={20} />
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
  {users?.length > 0 ? (
    <table
      className={`min-w-full divide-y ${
        darkMode ? "divide-gray-700" : "divide-gray-200"
      }`}
    >
      <thead className={darkMode ? "bg-gray-800 " : "bg-gray-50"}>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
            Phone
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody
        className={`divide-y ${
          darkMode ? "divide-gray-700" : "divide-gray-200"
        }`}
      >
        {users.map((user) => (
          <tr
            key={user._id}
            className={darkMode ? "bg-gray-900" : "bg-white"}
          >
            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setModalType("view");
                  }}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Eye size={20} />
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowForm(true);
                  }}
                  className="text-yellow-600 hover:text-yellow-800 transition-colors"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setModalType("delete");
                  }}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className={`p-8 text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      <p className="text-lg font-medium">No users found</p>
      <p className="mt-2">Click the "Add User" button to create a new user</p>
    </div>
  )}
</div>

      {/* Slide-in Form */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          showForm ? "translate-x-0" : "translate-x-full"
        } ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}
      >
        <div className={`p-6 h-full overflow-y-auto ${darkMode ? "bg-gray-800 text-white" : "bg-white"} `}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {selectedUser ? "Edit User" : "Add New User"}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setSelectedUser(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <Formik
  initialValues={initialValues}
  validationSchema={UserSchema}
  onSubmit={handleSubmit}
  enableReinitialize
  validateOnChange={false}
  validateOnBlur={false}
>
  {({ errors, touched }) => (
    <Form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <Field
          name="name"
          placeholder="Enter full name"
          className={`w-full p-2 rounded-lg border ${
            darkMode
              ? "bg-gray-700 border-gray-600 placeholder-gray-400"
              : "bg-white border-gray-300 placeholder-gray-400"
          }`}
        />
        {errors.name && touched.name && (
          <div className="text-red-500 text-sm mt-1">{errors.name}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Field
          name="email"
          type="email"
          placeholder="example@email.com"
          className={`w-full p-2 rounded-lg border ${
            darkMode
              ? "bg-gray-700 border-gray-600 placeholder-gray-400"
              : "bg-white border-gray-300 placeholder-gray-400"
          }`}
        />
        {errors.email && touched.email && (
          <div className="text-red-500 text-sm mt-1">{errors.email}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <Field
          name="phone"
          placeholder="Enter phone number"
          className={`w-full p-2 rounded-lg border ${
            darkMode
              ? "bg-gray-700 border-gray-600 placeholder-gray-400"
              : "bg-white border-gray-300 placeholder-gray-400"
          }`}
        />
        {errors.phone && touched.phone && (
          <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
        )}
      </div>

      <div className={`${selectedUser ? "hidden" : "block"}`}>
        <label className="block text-sm font-medium mb-1">
          {selectedUser ? "Password (leave blank to keep current)" : "Password"}
        </label>
        <Field
          name="password"
          type="password"
          placeholder="Enter password"
          className={`w-full p-2 rounded-lg border ${
            darkMode
              ? "bg-gray-700 border-gray-600 placeholder-gray-400"
              : "bg-white border-gray-300 placeholder-gray-400"
          }`}
        />
        {errors.password && touched.password && (
          <div className="text-red-500 text-sm mt-1">{errors.password}</div>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {selectedUser ? "Update" : "Submit"}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowForm(false);
            setSelectedUser(null);
          }}
          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </Form>
  )}
</Formik>
        </div>
      </div>

      {/* View Modal */}
      {modalType === "view" && selectedUser && (
        <ModelView
          darkMode={darkMode}
          selectedUser={selectedUser}
          setModalType={setModalType}
          setSelectedUser={setSelectedUser}
        />
      )}

      {/* Delete Modal */}
      {modalType === "delete" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-xl max-w-md w-full`}
          >
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedUser._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
