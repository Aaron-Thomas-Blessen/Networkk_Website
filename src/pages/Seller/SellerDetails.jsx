import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { User, MapPin, Phone, FileText } from 'lucide-react';
import Autocomplete from 'react-google-autocomplete';
import { Avatar, IconButton, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
  console.error('Google Maps API key is missing in environment variables');
}

const SellerDetailsForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    address: "",
    latitude: "",
    longitude: "",
    locality: "",
    phone: "",
    username: "",
    aadhaar: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axiosInstance.get('/serviceProviders/d/me');
        const SellerData = response.data;
        setFormData({
          fname: SellerData.fname || "",
          lname: SellerData.lname || "",
          address: SellerData.address || "",
          latitude: SellerData.latitude || "",
          longitude: SellerData.longitude || "",
          locality: SellerData.locality || "",
          phone: SellerData.phone || "",
          username: SellerData.username || "",
          aadhaar: SellerData.aadhaar || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlaceSelected = (place) => {
    setFormData(prev => ({
      ...prev,
      locality: place.formatted_address, // Set full address as locality
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()
    }));
  };

  const validateForm = () => {
    console.log("Form data before validation:", formData); // Debug log
  
    const newErrors = {};
    if (!formData.fname) newErrors.fname = "First name is required.";
    if (!formData.lname) newErrors.lname = "Last name is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.aadhaar) newErrors.aadhaar = "Aadhaar is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.locality) newErrors.locality = "Locality is required.";
    if (!formData.username) newErrors.username = "Username is required.";
    if (formData.aadhaar && formData.aadhaar.length !== 12)
      newErrors.aadhaar = "Aadhaar must be 12 digits.";
    if (formData.latitude && isNaN(parseFloat(formData.latitude)))
      newErrors.latitude = "Latitude must be a number.";
    if (formData.longitude && isNaN(parseFloat(formData.longitude)))
      newErrors.longitude = "Longitude must be a number.";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Add profile picture to form data if exists
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }
  
    // Add other form data
    formData.append('sellerData', JSON.stringify({
      ...formValues,
      // other form fields
    }));
  
    try {
      const response = await axiosInstance.post('/seller/details', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage("Profile updated successfully!");
      setIsEditing(false); // Toggle back to view mode
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.error || "Failed to update profile");
    }
  };
  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset form data to original values
    fetchSellerData();
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
              {!isEditing ? (
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700"
                >
                  Edit Profile
                </button>
              ) : null}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6">
            {message && (
              <div className={`mb-6 p-4 rounded-md ${
                message.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}>
                {message}
              </div>
            )}

            {/* Profile Picture Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Avatar
                  src={previewUrl}
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2
                  }}
                />
                <label htmlFor="profile-pic">
                  <input
                    accept="image/*"
                    id="profile-pic"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleProfilePicChange}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload profile picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                <Typography variant="caption" color="textSecondary">
                  {profilePic ? profilePic.name : 'Upload Profile Picture'}
                </Typography>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="fname"
                    value={formData.fname}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full px-4 py-2 rounded-md border ${
                      !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
                    } ${errors.fname ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.fname && <p className="mt-1 text-sm text-red-500">{errors.fname}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lname"
                    value={formData.lname}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full px-4 py-2 rounded-md border ${
                      !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
                    } ${errors.lname ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full px-4 py-2 rounded-md border ${
                      !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
                    } ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
              </div>
            </div>

            

            {/* Location Information */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Location Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search Location</label>
                  {isEditing ? (
                    <Autocomplete
                      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                      onPlaceSelected={handlePlaceSelected}
                      options={{
                        componentRestrictions: { country: "in" },
                        types: ["geocode", "establishment"],
                      }}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      defaultValue={formData.locality}
                      placeholder="Search for your location"
                    />
                  ) : (
                    <input
                      type="text"
                      value={formData.locality}
                      readOnly
                      className="w-full px-4 py-2 rounded-md border bg-gray-50 text-gray-500 border-gray-300"
                    />
                  )}
                </div>
            
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full px-4 py-2 rounded-md border ${
                      !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
                    } ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>
            
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
                  <input
                    type="text"
                    name="locality"
                    value={formData.locality}
                    readOnly
                    className="w-full px-4 py-2 rounded-md border bg-gray-50 text-gray-500 border-gray-300"
                  />
                </div>
            
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    readOnly
                    className="w-full px-4 py-2 rounded-md border bg-gray-50 text-gray-500 border-gray-300"
                  />
                </div>
            
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    readOnly
                    className="w-full px-4 py-2 rounded-md border bg-gray-50 text-gray-500 border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full px-4 py-2 rounded-md border ${
                      !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                  <input
                    type="text"
                    name="aadhaar"
                    value={formData.aadhaar}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full px-4 py-2 rounded-md border ${
                      !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 font-medium"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDetailsForm;
