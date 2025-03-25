import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { AuthContext } from '../../context/AuthContext';
import SellerNavbar from '../../components/SellerNavbar';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userEmail } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyGigs = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }

      try {
        const providerResponse = await axiosInstance.get(`/serviceProviders/email/${userEmail}`);
        const providerId = providerResponse.data.seller.serviceProviderId;
        const servicesResponse = await axiosInstance.get(`/services/provider/${providerId}`);
        setGigs(servicesResponse.data);
      } catch (error) {
        setError('Failed to fetch services. Please try again later.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyGigs();
  }, [userEmail]);

  const handleDelete = async (gigId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axiosInstance.delete(`/services/delete/${gigId}`);
        setGigs(gigs.filter(gig => gig.serviceId !== gigId));
      } catch (error) {
        console.error('Error deleting gig:', error);
      }
    }
  };

  if (loading) return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <SellerNavbar />
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-gray-200 rounded-lg w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <SellerNavbar />
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center p-8 text-red-500">{error}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <SellerNavbar />
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Services</h1>
            <Link 
              to="/gigcreate"
              className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus size={20} />
              <span className="font-medium">Create New Service</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <div 
                key={gig.serviceId} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 p-6"
              >
                {gig.imageUrl && (
                  <img 
                    src={gig.imageUrl} 
                    alt={gig.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{gig.title}</h3>
                <p className="text-gray-600 mb-4">{gig.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sky-600 font-medium text-lg">₹{gig.basePrice}</span>
                  <div className="flex gap-3">
                    <Link 
                      to={`/edit-gig/${gig.serviceId}`}
                      className="text-blue-500 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
                      title="Edit"
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(gig.serviceId)}
                      className="text-red-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                    <Link 
                      to="/seller/service-view"
                      state={{ 
                        gig: {
                          id: gig.serviceId,
                          title: gig.title,
                          description: gig.description,
                          price: gig.basePrice,
                          category: gig.category,
                          status: gig.status,
                          seller: gig.serviceProvider?.name || 'Unknown Provider',
                          sellerId: gig.serviceProvider?.serviceProviderId,
                          submittedAt: gig.createdAt,
                          demoPics: gig.demoPics
                        }
                      }}
                      className="text-sky-500 hover:text-sky-600 transition-colors p-2 rounded-lg hover:bg-sky-50"
                      title="View"
                    >
                      <Eye size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {gigs.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="text-gray-500 mb-6 text-lg">You haven't created any services yet.</div>
                <Link 
                  to="/gigcreate"
                  className="px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  <span className="font-medium">Create Your First Service</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyGigs;
