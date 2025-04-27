import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  Users,
  Calendar,
  Settings,
  LogOut,
  Database,
  BarChart3,
  Utensils,
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import { UserRole } from '../types';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Different navigation links based on user role
  const getNavLinks = () => {
    if (user?.role === UserRole.RestaurantManager) {
      return [
        { icon: <Home size={20} />, text: 'Dashboard', to: '/restaurant/dashboard' },
        { icon: <Utensils size={20} />, text: 'My Restaurants', to: '/restaurant/dashboard' },
        { icon: <Calendar size={20} />, text: 'Bookings', to: '/restaurant/bookings' },
        { icon: <Settings size={20} />, text: 'Settings', to: '/restaurant/settings' },
      ];
    } else if (user?.role === UserRole.Admin) {
      return [
        { icon: <BarChart3 size={20} />, text: 'Analytics', to: '/admin/dashboard' },
        { icon: <Utensils size={20} />, text: 'Restaurants', to: '/admin/restaurants' },
        { icon: <Calendar size={20} />, text: 'Bookings', to: '/admin/bookings' },
        { icon: <Users size={20} />, text: 'Users', to: '/admin/users' },
        { icon: <Settings size={20} />, text: 'Settings', to: '/admin/settings' },
      ];
    }
    return [];
  };

  const navLinks = getNavLinks();

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-neutral-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto`}
      >
        <div className="flex h-16 items-center justify-between px-4 bg-neutral-900">
          <div className="text-white font-bold text-xl">
            {user?.role === UserRole.RestaurantManager ? 'Restaurant' : 'Admin'} Portal
          </div>
          <button
            type="button"
            className="text-neutral-400 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-white">{user?.name}</div>
              <div className="text-xs text-neutral-400">{user?.email}</div>
            </div>
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-700'
                  }`
                }
              >
                <span className="mr-3">{link.icon}</span>
                {link.text}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full px-4 py-4 border-t border-neutral-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-700 rounded-md transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              type="button"
              className="text-neutral-500 hover:text-neutral-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex-1 lg:ml-0 ml-4">
              <h1 className="text-xl font-semibold text-neutral-800">
                {user?.role === UserRole.RestaurantManager ? 'Restaurant Dashboard' : 'Admin Dashboard'}
              </h1>
            </div>
            <div>
              <NavLink
                to="/"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Back to DineReserve
              </NavLink>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;