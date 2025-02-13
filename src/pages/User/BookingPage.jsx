import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import Collapsible from '@edonec/collapsible';
import '@edonec/collapsible/build/index.css';
import '@edonec/collapsible/build/icons.css';
import UserNavbar from '../../components/UserNavbar';
import axiosInstance from '../../utils/axios';

const BookingsPage = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [rejectedBookings, setRejectedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('pending');

  // Add fetchBookings function
  const fetchBookings = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.log('No userId found in localStorage');
        navigate('/login');
        return;
      }

      // Change the endpoint to include userId as a query parameter
      const response = await axiosInstance.get(`/bookings?userId=${userId}`);
      
      if (response.data) {
        // No need to filter here as backend will send only user's bookings
        setPendingBookings(response.data.filter(booking => booking.bookingStatus === 'pending'));
        setAcceptedBookings(response.data.filter(booking => booking.bookingStatus === 'accepted'));
        setRejectedBookings(response.data.filter(booking => booking.bookingStatus === 'rejected'));
      } else {
        console.log('No bookings data received');
        setPendingBookings([]);
        setAcceptedBookings([]);
        setRejectedBookings([]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error.response?.data || error.message);
      setLoading(false);
      // Add user feedback for error
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  // Add useEffect to fetch bookings when component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  // Add loading state handler
  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <UserNavbar />
        <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
          <div className="text-gray-600">Loading bookings...</div>
        </div>
      </div>
    );
  }

  const sections = {
    pending: 'Pending Bookings',
    accepted: 'Accepted Bookings',
    rejected: 'Rejected Bookings'
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-600 mt-2">Manage all your service bookings</p>
          </div>

          {/* Navigation Pills */}
          <div className="flex space-x-2 mb-8 overflow-x-auto">
            {Object.entries(sections).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeSection === key
                  ? 'bg-sky-700 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  {key === 'pending' && <FiClock className="mr-2" />}
                  {key === 'accepted' && <FiCheckCircle className="mr-2" />}
                  {key === 'rejected' && <FiXCircle className="mr-2" />}
                  {value}
                </div>
              </button>
            ))}
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeSection === 'pending' && (
              <div className="space-y-4">
                {pendingBookings.length > 0 ? (
                  pendingBookings.map((booking) => (
                    <div key={booking.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <p className="font-semibold">Address: {booking.address}</p>
                      <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                      <p>Description: {booking.description}</p>
                      <p>Base Payment: ${booking.basePayment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No pending bookings found.</p>
                )}
              </div>
            )}

            {activeSection === 'accepted' && (
              <div className="space-y-4">
                {acceptedBookings.length > 0 ? (
                  acceptedBookings.map((booking) => (
                    <div key={booking.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <p className="font-semibold">Address: {booking.address}</p>
                      <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                      <p>Description: {booking.description}</p>
                      <p className="mb-2">Base Payment: ${booking.basePayment}</p>
                      <button
                        className="bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition duration-300"
                        onClick={() => handlePayment(booking)}
                      >
                        Pay Now
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No accepted bookings found.</p>
                )}
              </div>
            )}

            {activeSection === 'rejected' && (
              <div className="space-y-4">
                {rejectedBookings.length > 0 ? (
                  rejectedBookings.map((booking) => (
                    <div key={booking.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <p className="font-semibold">Address: {booking.address}</p>
                      <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                      <p>Description: {booking.description}</p>
                      <p>Base Payment: ${booking.basePayment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No rejected bookings found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;