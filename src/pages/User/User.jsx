import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import UserDetailsForm from './UserDetails';
import BookingsPage from './BookingPage';
import Search from '../Search';

const User = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-4 font-medium text-sm border-b-2 ${
                activeTab === 'profile'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Profile Settings
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-4 font-medium text-sm border-b-2 ${
                activeTab === 'bookings'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`px-4 py-4 font-medium text-sm border-b-2 ${
                activeTab === 'search'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Search Services
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'profile' && <UserDetailsForm />}
        {activeTab === 'bookings' && <BookingsPage />}
        {activeTab === 'search' && <Search />}
      </div>
    </div>
  );
};

export default User;