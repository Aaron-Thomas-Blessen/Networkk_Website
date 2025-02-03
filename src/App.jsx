import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { DashboardProvider } from './context/DashboardContext';
import { AuthProvider } from './context/AuthContext';

import Home from "./pages/Home";
import Search from "./pages/Search";
import ServiceDetails from "./pages/ServiceDetails";
import Service1 from "./pages/Service1";
import Navbar from "./components/nav";

import AdminAuth from "./pages/Admin/AdminAuth";

import SellerAuth from "./pages/Seller/SellerAuth";
import GigCreate from "./pages/Seller/GigCreate";
import Create from "./pages/Seller/Create";

import UserAuth from "./pages/User/UserAuth";
import BookingsPage from "./pages/User/BookingPage";
import Booking from "./pages/User/Booking";
import Payment from "./pages/User/Payment";
import Dashboard from "./pages/SellerDashboard";
import UserDashboard from "./pages/UserDashboard";
import UserDetailsForm from "./pages/User/UserDetails";
import Test from "./pages/test";
import SellerDetailsForm from "./pages/Seller/SellerDetails";
import AdminHome from "./pages/Admin/AdminHome";
import GigAdminDashboard from "./pages/Admin/GigsRequest";

import MyGigs from "./pages/Seller/MyGigs";
import EditGig from "./pages/Seller/EditGig";
import LocationTest from './pages/Seller/Auto';

import ServiceImages from "./pages/Seller/ServiceImages";

import UserDash from "./pages/User/User";


function App() {
  return (
<AuthProvider>
    <DashboardProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-auth" element={<AdminAuth />} />
          <Route path="/seller-auth" element={<SellerAuth />} />
          <Route path="/user-auth" element={<UserAuth />} />
          <Route path="/search" element={<Search />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/service1" element={<Service1 />} />
          <Route path="/user-booking-status" element={<BookingsPage />} />
          <Route path="/user-booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/gigcreate" element={<GigCreate />} />
          <Route path="/create" element={<Create />} />
          <Route path="/seller-dash" element={<Dashboard />} />
          <Route path="/user-dash" element={<UserDash />} />
          <Route path="/user" element={<UserDashboard  />} />
          <Route path="/user-details" element={<UserDetailsForm />} />
          <Route path="/seller-details" element={<SellerDetailsForm />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/admin-dash" element={<GigAdminDashboard />} />
          <Route path="/serv-img" element={<ServiceImages />} ></Route>
          <Route path="/test" element={<Test />} />
          <Route path="/my-gigs" element={<MyGigs />} />
          <Route path="/edit-gig/:id" element={<EditGig />} />
          <Route path="/location-test" element={<LocationTest />} />
        </Routes>
      </div>
    </Router>
    </DashboardProvider>
</AuthProvider>
  );
}

export default App;
