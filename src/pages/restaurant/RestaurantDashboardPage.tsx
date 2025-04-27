import React from 'react';

const RestaurantDashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Restaurant Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>
          <p className="text-gray-600">View and manage your upcoming reservations</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Restaurant Profile</h2>
          <p className="text-gray-600">Update your restaurant information and menu</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Analytics</h2>
          <p className="text-gray-600">View booking statistics and performance metrics</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboardPage;