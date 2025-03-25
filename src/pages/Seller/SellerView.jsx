import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaClock, FaMapMarkerAlt, FaCheck, FaStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Chip, CircularProgress } from "@mui/material";
import axiosInstance from "../../utils/axios";
import SellerNavbar from "../../components/SellerNavbar";

const SellerView = () => {
  const location = useLocation();
  const gig = location.state?.gig;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!gig?.id) {
        setError("No service ID provided");
        setLoading(false);
        return;
      }
      try {
        const response = await axiosInstance.get(`/services/${gig.id}`);
        const pics = response.data.demoPics ? JSON.parse(response.data.demoPics) : [];
        setImages(pics);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [gig?.id]);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      if (images.length > 1) {
        setCurrentImageIndex((prev) => 
          prev === images.length - 1 ? 0 : prev + 1
        );
      }
    }, 3000);

    return () => clearInterval(autoSlide);
  }, [images.length]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!gig?.id) return;
      
      try {
        const response = await axiosInstance.get(`/reviews/service/${gig.id}`);
        if (response.data.success) {
          setReviews(response.data.reviews);
          setAverageRating(response.data.averageRating);
          setReviewCount(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (gig) {
      fetchReviews();
    }
  }, [gig?.id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <CircularProgress size={40} className="text-sky-600" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-red-50 text-red-600 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold">Error Loading Service</h3>
        <p>{error}</p>
      </div>
    </div>
  );

  if (!gig) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-yellow-50 text-yellow-600 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold">Service Not Found</h3>
        <p>The requested service details could not be found.</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      <div className="fixed inset-y-0 left-0 z-30">
        <SellerNavbar />
      </div>
      
      {/* Reduced margin-left from ml-64 to ml-48 */}
      <div className="ml-20">
        {/* Header Section - Adjusted padding */}
        

        {/* Main Content - Adjusted padding */}
        <div className="container mx-auto px-4 py-8"> {/* Reduced padding from px-6 to px-4 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <h1 className="text-3xl font-bold mb-4">{gig.title}</h1>
              
              {/* Service Provider Info */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-sky-700 flex items-center justify-center text-white font-bold">
                  {gig.serviceProvider?.fname?.[0] || "U"}
                </div>
                <div>
                  <p className="font-semibold">{gig.serviceProvider?.fname} {gig.serviceProvider?.lname}</p>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold">{averageRating || 0}</span>
                    <span className="text-gray-600 ml-1">({reviewCount || 0})</span>
                  </div>
                </div>
              </div>

              {/* Image Carousel */}
              {images.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="relative h-[400px]">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="absolute inset-0 w-full h-full"
                        style={{
                          opacity: currentImageIndex === index ? 1 : 0,
                          zIndex: currentImageIndex === index ? 1 : 0,
                          transition: "opacity 0.5s ease-in-out",
                        }}
                      >
                        <img
                          src={image}
                          alt={`${gig.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/default-service.jpg";
                          }}
                        />
                      </div>
                    ))}
                    
                    {images.length > 1 && (
                      <>
                        <button
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors duration-200 z-10"
                          onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors duration-200 z-10"
                          onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                          {images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentImageIndex
                                  ? "bg-white scale-125"
                                  : "bg-white/50 hover:bg-white/75"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Service Description */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">About This Service</h2>
                <p className="text-gray-600 leading-relaxed">{gig.description}</p>
              </div>

              {/* Reviews Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Reviews</h2>
                  <div className="flex items-center">
                    <div className="bg-sky-700 rounded-md px-3 py-1 text-white font-bold flex items-center">
                      <FaStar className="mr-1" />
                      <span>{averageRating}</span>
                    </div>
                    <span className="ml-2 text-gray-600">({reviewCount} reviews)</span>
                  </div>
                </div>

                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="mb-6 p-6 bg-white rounded-lg shadow-md">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-sky-700 flex items-center justify-center text-white font-bold">
                          {review.user?.fname?.[0]}
                        </div>
                        <div>
                          <p className="font-semibold">{review.user?.fname} {review.user?.lname}</p>
                          <div className="flex items-center mt-1">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 bg-gray-50 rounded-lg text-center">
                    <p className="text-gray-500">No reviews yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div className="flex items-baseline justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">₹{gig.price}</h2>
                    <span className="text-gray-500 font-medium">per hour</span>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-gray-600">
                      <FaClock className="w-5 h-5 text-sky-600 mr-3" />
                      <span>Hourly Rate</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="w-5 h-5 text-sky-600 mr-3" />
                      <span>{gig.category}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaCheck className="w-5 h-5 text-sky-600 mr-3" />
                      <span>Status: {gig.status}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      Created: {new Date(gig.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerView;