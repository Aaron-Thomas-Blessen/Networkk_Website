import React, { useState, useEffect, useContext } from "react";
import {
  MapPin,
  FileText,
  Clock,
  Calendar,
  Phone,
  Info,
  DollarSign,
} from "lucide-react";
import {
  LocalizationProvider,
  TimePicker,
  DatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axios";
import { AuthContext } from '../../context/AuthContext';
import UserNavbar from "../../components/UserNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Add this after your imports
const toastConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

// Create theme for MUI components
const theme = createTheme({
  palette: {
    primary: {
      main: "#3b82f6", // matches Tailwind's blue-600
    },
  },
});

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const serviceDetails = location.state || { basePrice: 1000 }; // Default fallback
  const { userEmail } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    date: null,
    time: "",
    address: "",
    description: "",
    phone: "",
    serviceType: "standard",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [pricing, setPricing] = useState({
    basePrice: serviceDetails.basePrice,
    total: serviceDetails.basePrice // Remove serviceFee
  });

  // Add this state for holiday dates
  const [holidayDates, setHolidayDates] = useState([]);

  // Time slots generation
  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i <= 17; i++) {
      slots.push(`${i}:00`);
      slots.push(`${i}:30`);
    }
    return slots;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prev) => ({
      ...prev,
      date: newDate,
    }));
  };

  const handleTimeChange = (newTime) => {
    setFormData((prevData) => ({
      ...prevData,
      time: newTime,
    }));
  };

  useEffect(() => {
    const calculatePrice = () => {
      const base = formData.serviceType === "premium" 
        ? serviceDetails.basePrice * 1.5 
        : serviceDetails.basePrice;
      setPricing({
        basePrice: base,
        total: base // Remove service fee calculation
      });
    };
    calculatePrice();
  }, [formData.serviceType, serviceDetails.basePrice]);

  // Add this useEffect to fetch holiday dates when component mounts
  useEffect(() => {
    const fetchHolidayDates = async () => {
      try {
        const response = await axiosInstance.get(`/bookings/holidays/${serviceDetails.serviceId}`);
        setHolidayDates(response.data.holidays);
      } catch (error) {
        console.error('Error fetching holiday dates:', error);
      }
    };

    if (serviceDetails.serviceId) {
      fetchHolidayDates();
    }
  }, [serviceDetails.serviceId]);

  // Create a function to check if a date should be disabled
  const shouldDisableDate = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    return holidayDates.includes(formattedDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Show initial processing toast with blue styling
    const processingToast = toast.loading('Processing your booking...', {
      position: "top-right",
      style: {
        backgroundColor: '#3b82f6', // Tailwind blue-600
        color: 'white',
      },
    });

    setLoading(true);
    try {
      // First get the user ID for the logged in user
      const userResponse = await axiosInstance.get('/users/d/me');
      const userId = userResponse.data.userId;

      const bookingData = {
        bookingStatus: "pending",
        paymentStatus: "pending",
        basePayment: pricing.basePrice,
        description: formData.description,
        extraPayment: 0,
        isReview: false,
        serviceId: serviceDetails.serviceId,
        userId: userId,
        serviceProviderId: serviceDetails.serviceProviderId,
        bookingDate: formData.date.format("YYYY-MM-DD"),
        bookingTime: formData.time.format("HH:mm:00"),
        serviceType: formData.serviceType
      };

      const response = await axiosInstance.post('/bookings/create', bookingData);
      
      if (response.data?.booking) {
        toast.update(processingToast, {
          render: "Booking confirmed successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: '#3b82f6', // Tailwind blue-600
            color: 'white',
          },
        });
        
        setTimeout(() => {
          navigate('/user-booking-status');
        }, 2000);
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.update(processingToast, {
        render: error.response?.data?.error || 'Failed to submit booking. Please try again.',
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: '#ef4444', // Tailwind red-500 for errors
          color: 'white',
        },
      });
      setErrors({ 
        submit: error.response?.data?.error || "Failed to submit booking. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="flex-1">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Main Form Section */}
                  <div className="flex-1">
                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                      <h1 className="text-2xl font-bold text-gray-900 mb-8">
                        Book Your Appointment
                      </h1>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Date and Time Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Calendar className="inline-block w-4 h-4 mr-2" />{" "}
                              Time
                            </label>
                            <DatePicker
                              label="Select Date"
                              value={formData.date}
                              onChange={handleDateChange}
                              minDate={dayjs()}
                              shouldDisableDate={shouldDisableDate}
                              className="w-full"
                              slotProps={{
                                textField: {
                                  error: !!errors.date,
                                  helperText: errors.date,
                                  fullWidth: true,
                                },
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Clock className="inline-block w-4 h-4 mr-2" /> Time
                            </label>
                            <TimePicker
                              label="Select Time"
                              value={formData.time || null}
                              onChange={handleTimeChange}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  error={!!errors.time}
                                  helperText={errors.time}
                                />
                              )}
                            />
                            {errors.time && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.time}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Contact and Address */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Phone className="inline-block w-4 h-4 mr-2" /> Phone
                            Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <MapPin className="inline-block w-4 h-4 mr-2" /> Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Enter the service address"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                          {errors.address && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.address}
                            </p>
                          )}
                        </div>

                        {/* Service Type Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Info className="inline-block w-4 h-4 mr-2" /> Service
                            Type
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() =>
                                handleInputChange({
                                  target: {
                                    name: "serviceType",
                                    value: "standard",
                                  },
                                })
                              }
                              className={`p-4 border rounded-lg text-center ${
                                formData.serviceType === "standard"
                                  ? "bg-blue-50 border-blue-500"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              <h3 className="font-semibold">Standard</h3>
                              <p className="text-sm text-gray-500">
                                Basic service package
                              </p>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleInputChange({
                                  target: { name: "serviceType", value: "premium" },
                                })
                              }
                              className={`p-4 border rounded-lg text-center ${
                                formData.serviceType === "premium"
                                  ? "bg-blue-50 border-blue-500"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              <h3 className="font-semibold">Premium</h3>
                              <p className="text-sm text-gray-500">
                                Enhanced service package
                              </p>
                            </button>
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FileText className="inline-block w-4 h-4 mr-2" />{" "}
                            Description
                          </label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            placeholder="Describe the service you need"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                          {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.description}
                            </p>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Pricing Summary Section */}
                  <div className="w-full md:w-96">
                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 sticky top-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Booking Summary
                      </h2>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center font-bold">
                          <span className="flex items-center">
                            Total Price
                          </span>
                          <span>₹{pricing.total}</span>
                        </div>

                        {errors.submit && (
                          <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                            {errors.submit}
                          </div>
                        )}

                        <button
                          onClick={handleSubmit}
                          disabled={loading}
                          className="w-full bg-sky-700 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 disabled:bg-sky-300 transition-colors duration-300 mt-6"
                        >
                          {loading ? "Processing..." : "Confirm Booking"}
                        </button>

                        <p className="text-sm text-gray-500 text-center mt-4">
                          By confirming, you agree to our terms and conditions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LocalizationProvider>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Booking;
