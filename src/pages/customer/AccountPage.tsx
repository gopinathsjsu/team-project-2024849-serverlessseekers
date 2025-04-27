import React from 'react';
import useAuthStore from '../../store/authStore';

const AccountPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 text-sm">Name</p>
            <p className="font-medium">{user?.name || 'Not provided'}</p>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm">Phone</p>
            <p className="font-medium">{user?.phone || 'Not provided'}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="emailNotifications" 
              className="mr-2"
              defaultChecked 
            />
            <label htmlFor="emailNotifications">Receive email notifications</label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="smsNotifications" 
              className="mr-2" 
            />
            <label htmlFor="smsNotifications">Receive SMS notifications</label>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;