import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaStar, FaCheck } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Chip } from "@mui/material";
import axiosInstance from "../../utils/axios";
import AdminNavbar from "../../components/AdminNav";

const View = () => {
  const location = useLocation();
  const gig = location.state?.gig;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!gig?.id) {
        setError("No service ID provided");
        setLoading(false);
        return;
      }
      try {
        const response = await axiosInstance.get(`/services/${gig.id}`);
        setImages(JSON.parse(response.data.demoPics || "[]"));
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
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    // Cleanup on unmount
    return () => clearInterval(autoSlide);
  }, [images.length]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  if (!gig) return <div className="text-center p-8">Service not found</div>;

  const carouselSection = (
    <div className="mb-8 relative h-[400px] rounded-lg overflow-hidden">
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

      {/* Navigation arrows with higher z-index */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors duration-200 z-10"
        onClick={() =>
          setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
          )
        }
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors duration-200 z-10"
        onClick={() =>
          setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
          )
        }
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators with higher z-index */}
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
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminNavbar />
      <div className="container mx-auto py-8 px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Section (Gig Details) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{gig.title}</h1>

            {/* Seller Info */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-sky-700 text-white flex items-center justify-center rounded-full text-xl font-bold">
                {gig.seller?.[0] || "U"}
              </div>
              <div>
                <p className="text-lg font-semibold">{gig.seller}</p>
                <Chip
                  label={gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                  color={
                    gig.status === "pending" ? "warning" : gig.status === "accepted" ? "success" : "error"
                  }
                  size="small"
                />
              </div>
            </div>

            {/* Image Carousel */}
            {carouselSection}

            {/* About Service */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">About This Service</h2>
            <p className="text-gray-600 leading-relaxed">{gig.description}</p>
          </div>

          {/* Right Section (Pricing & Details) */}
          <div className="lg:col-span-1">
            <div className="top-4 bg-white p-6 border rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Rs {gig.price}/hr</h2>
              <p className="text-gray-600 mb-6">{gig.description.substring(0, 100)}...</p>
              <ul className="mb-6 space-y-3">
                <li className="flex items-center">
                  <FaCheck className="mr-2 text-sky-700" /> Status: {gig.status}
                </li>
                <li className="flex items-center">
                  <FaCheck className="mr-2 text-sky-700" /> {gig.category}
                </li>
                <li className="flex items-center">
                  <FaCheck className="mr-2 text-sky-700" /> Hourly Rate
                </li>
              </ul>
            </div>

            {/* About the Provider */}
            <div className=" mt-6 bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">About The Provider</h2>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-sky-700 text-white flex items-center justify-center rounded-full text-xl font-bold">
                  {gig.seller?.[0] || "U"}
                </div>
                <div>
                  <p className="font-semibold text-lg">{gig.seller}</p>
                  <p className="text-gray-600">{gig.category}</p>
                  <p className="text-gray-600">Submitted: {new Date(gig.submittedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default View;
