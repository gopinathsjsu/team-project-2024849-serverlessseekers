import React from 'react';

const AdminDashboardPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Restaurant Overview</h2>
          <p className="text-gray-600 mb-2">Total Restaurants: 24</p>
          <p className="text-gray-600 mb-2">Active Restaurants: 20</p>
          <p className="text-gray-600">Pending Approval: 4</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Booking Statistics</h2>
          <p className="text-gray-600 mb-2">Total Bookings: 156</p>
          <p className="text-gray-600 mb-2">Bookings Today: 12</p>
          <p className="text-gray-600">Cancellations: 3</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">User Activity</h2>
          <p className="text-gray-600 mb-2">Total Users: 342</p>
          <p className="text-gray-600 mb-2">New Users (30 days): 45</p>
          <p className="text-gray-600">Active Users: 187</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Activity</th>
                <th className="py-2 px-4 border-b text-left">User</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">2025-03-15</td>
                <td className="py-2 px-4 border-b">New Restaurant Added</td>
                <td className="py-2 px-4 border-b">Restaurant Manager</td>
                <td className="py-2 px-4 border-b">Pending Approval</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">2025-03-14</td>
                <td className="py-2 px-4 border-b">Booking Cancelled</td>
                <td className="py-2 px-4 border-b">Customer</td>
                <td className="py-2 px-4 border-b">Completed</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">2025-03-14</td>
                <td className="py-2 px-4 border-b">Restaurant Updated</td>
                <td className="py-2 px-4 border-b">Restaurant Manager</td>
                <td className="py-2 px-4 border-b">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;