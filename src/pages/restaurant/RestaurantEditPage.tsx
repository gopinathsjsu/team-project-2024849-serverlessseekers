import React from 'react';
import { useParams } from 'react-router-dom';

const RestaurantEditPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Restaurant</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">Edit restaurant ID: {id}</p>
        <div className="space-y-4">
          {/* Restaurant edit form will be implemented here */}
          <p className="text-amber-600">Restaurant edit functionality coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantEditPage;