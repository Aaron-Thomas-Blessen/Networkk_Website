import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, Package, Plus, Menu, X, Home, LogOut, Calendar, LayoutDashboard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const SellerNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div 
      className={`${
        isExpanded ? 'w-64' : 'w-20'
      } min-h-full bg-gray-900 border-r border-gray-800 px-3 py-6 transition-all duration-0 relative`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed -left-0 top-6  rounded-full p-1.5  z-10 hover:bg-gray-50"
      >
        {isExpanded ? (
          <X size={18} className="text-gray-600" />
        ) : (
          <Menu size={18} className="text-gray-600" />
        )}
      </button>

      <div className="fixed space-y-4">
        {isExpanded ? (
          <h2 className="text-xl px-5 mb-6 text-white">
            <span className="font-bold">Networkk</span>{' '}
            <span className="font-light">Production</span>
          </h2>
        ) : (
          <h2 className="text-xl font-bold px-5 mb-6 text-white">N</h2>
        )}
        
        <NavLink 
          to="/seller-dash" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${isActive 
              ? 'bg-blue-800 text-white' 
              : 'text-gray-400 hover:bg-gray-700'
            }
          `}
          title="Overview"
        >
          <LayoutDashboard size={20} />
          {isExpanded && <span>Overview</span>}
        </NavLink>

        <NavLink 
          to="/" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${isActive 
              ? 'bg-blue-800 text-white' 
              : 'text-gray-400 hover:bg-gray-700'
            }
          `}
          title="Home"
        >
          <Home size={20} />
          {isExpanded && <span>Home</span>}
        </NavLink>

        <NavLink 
          to="/seller-details" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${isActive 
              ? 'bg-blue-800 text-white' 
              : 'text-gray-400 hover:bg-gray-700'
            }
          `}
          title="Profile Details"
        >
          <User size={20} />
          {isExpanded && <span>Profile Details</span>}
        </NavLink>

        <NavLink 
          to="/my-gigs" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${isActive 
              ? 'bg-blue-800 text-white' 
              : 'text-gray-400 hover:bg-gray-700'
            }
          `}
          title="My Gigs"
        >
          <Package size={20} />
          {isExpanded && <span>My Gigs</span>}
        </NavLink>

        <NavLink 
          to="/gigcreate" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${isActive 
              ? 'bg-blue-800 text-white' 
              : 'text-gray-400 hover:bg-gray-700'
            }
          `}
          title="Create Gig"
        >
          <Plus size={20} />
          {isExpanded && <span>Create Gig</span>}
        </NavLink>

        <NavLink 
          to="/bookingstatus" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${isActive 
              ? 'bg-blue-800 text-white' 
              : 'text-gray-400 hover:bg-gray-700'
            }
          `}
          title="Booking Status"
        >
          <Calendar size={20} />
          {isExpanded && <span>Booking Status</span>}
        </NavLink>

        <button
          onClick={handleLogout}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full
            text-red-400 hover:bg-gray-700
          `}
          title="Logout"
        >
          <LogOut size={20} />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default SellerNavbar;
