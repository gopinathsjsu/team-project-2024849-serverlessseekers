import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import { UserRole } from './types';
import CursorGradient from './components/common/CursorGradient';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SearchResultsPage from './pages/SearchResultsPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import AccountPage from './pages/customer/AccountPage';
import UserBookingsPage from './pages/customer/UserBookingsPage';
import RestaurantDashboardPage from './pages/restaurant/RestaurantDashboardPage';
import RestaurantEditPage from './pages/restaurant/RestaurantEditPage';
import RestaurantBookingsPage from './pages/restaurant/RestaurantBookingsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminRestaurantsPage from './pages/admin/AdminRestaurantsPage';
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';

function App() {
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  // Protected route component
  const ProtectedRoute = ({ 
    children, 
    allowedRoles 
  }: { 
    children: React.ReactNode, 
    allowedRoles?: UserRole[] 
  }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }

    return <>{children}</>;
  };

  return (
    <Router>
      <CursorGradient />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/results" element={<SearchResultsPage />} />
          <Route path="restaurants/:id" element={<RestaurantDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="booking/confirmation" element={<BookingConfirmationPage />} />
          <Route path="about" element={<AboutPage />} />
          
          {/* Customer routes */}
          <Route path="account" element={
            <ProtectedRoute allowedRoles={[UserRole.Customer]}>
              <AccountPage />
            </ProtectedRoute>
          } />
          <Route path="account/bookings" element={
            <ProtectedRoute allowedRoles={[UserRole.Customer]}>
              <UserBookingsPage />
            </ProtectedRoute>
          } />
        </Route>
        
        {/* Restaurant Manager Dashboard */}
        <Route path="/restaurant" element={
          <ProtectedRoute allowedRoles={[UserRole.RestaurantManager]}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<RestaurantDashboardPage />} />
          <Route path="edit/:id" element={<RestaurantEditPage />} />
          <Route path="bookings" element={<RestaurantBookingsPage />} />
        </Route>
        
        {/* Admin Dashboard */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={[UserRole.Admin]}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="restaurants" element={<AdminRestaurantsPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
        </Route>
        
        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;