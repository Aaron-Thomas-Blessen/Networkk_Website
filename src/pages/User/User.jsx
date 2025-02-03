import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import UserDetailsForm from './UserDetails';
import BookingsPage from './BookingPage';
import Search from '../Search';
import { User as UserIcon, Calendar, Search as SearchIcon, Menu, ChevronLeft, Home } from 'lucide-react';

const User = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const navItems = [
    { id: 'profile', name: 'Profile Settings', icon: UserIcon },
    { id: 'bookings', name: 'My Bookings', icon: Calendar },
    { id: 'search', name: 'Search Services', icon: SearchIcon }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className={`${isExpanded ? 'w-64' : 'w-20'} bg-white border-r shadow-sm transition-all duration-300 ease-in-out`}>
        <div className="flex flex-col border-b">
          <div className="p-4 flex items-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isExpanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
            </button>
            {isExpanded && (
              <h1 className="ml-2 text-black">
                <span className="font-bold">Networkk</span> Service
              </h1>
            )}
          </div>
        </div>

        <nav className="mt-5 px-2">
          {/* Home Button */}
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center px-4 py-3 mb-4 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <Home className="w-5 h-5 min-w-[20px]" />
            {isExpanded && <span className="ml-3">Home</span>}
          </button>

          {/* Navigation Items */}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 mb-2 text-sm font-medium rounded-lg ${
                activeTab === item.id
                  ? 'bg-sky-50 text-sky-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5 min-w-[20px]" />
              {isExpanded && <span className="ml-3">{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'profile' && <UserDetailsForm />}
        {activeTab === 'bookings' && <BookingsPage />}
        {activeTab === 'search' && <Search />}
      </div>
    </div>
  );
};

export default User;