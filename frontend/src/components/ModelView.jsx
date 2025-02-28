import { X } from 'lucide-react';
import React from 'react'

const ModelView = ({darkMode, selectedUser, setModalType, setSelectedUser}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-xl max-w-md w-full`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">User Details</h3>
        <button
          onClick={() => {
            setModalType(null);
            setSelectedUser(null);
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
          <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {selectedUser.name}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
          <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {selectedUser.email}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
          <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {selectedUser.phone}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Created At</label>
          <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {new Date(selectedUser.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Last Updated</label>
          <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {new Date(selectedUser.updatedAt).toLocaleDateString()}
          </p>
        </div> */}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {
            setModalType(null);
            setSelectedUser(null);
          }}
          className={`px-4 py-2 ${
            darkMode
              ? 'bg-gray-600 hover:bg-gray-700'
              : 'bg-gray-200 hover:bg-gray-300'
          } rounded-lg transition-colors`}
        >
          Close
        </button>
      </div>
    </div>
  </div>
  )
}

export default ModelView