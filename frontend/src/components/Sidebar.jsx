import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Home, Settings } from 'lucide-react';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={`fixed left-0 top-0 h-full w-64 p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} shadow-lg`}>
      <div className="flex items-center gap-2 mb-8">
        <Users size={24} className="text-blue-600" />
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      
      <nav className="space-y-2">
        {/* <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : `hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-800' : ''}`
            }`
          }
        >
          <Home size={20} />
          <span>Home</span>
        </NavLink> */}
        
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : `hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-800' : ''}`
            }`
          }
        >
          <Users size={20} />
          <span>Users</span>
        </NavLink>
        
        {/* <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : `hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-800' : ''}`
            }`
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink> */}
      </nav>
    </div>
  );
};

export default Sidebar;