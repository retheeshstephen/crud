import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun, LogOut } from 'lucide-react';
import { toggleTheme } from '../store/slices/themeSlice';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className={`fixed top-0 left-64 right-0 h-16 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} shadow-sm flex items-center justify-between px-6`}>
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Welcome, {user?.name}</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;