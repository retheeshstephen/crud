import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const darkMode = useSelector((state) => state.theme.darkMode);

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
      <Sidebar />
      <Navbar />
      <div className="ml-64 pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;