import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DashboardProvider } from "./context/DashboardContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

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
import LocationTest from "./pages/Seller/Auto";

import ServiceImages from "./pages/Seller/ServiceImages";
import ProviderBookingPage from "./pages/Seller/BookingStatus";
import SellerView from "./pages/Seller/SellerView";
import Pay from "./pages/User/Pay";

import View from "./pages/Seller/View";

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/admin-auth" element={<AdminAuth />} />
              <Route path="/seller-auth" element={<SellerAuth />} />
              <Route path="/user-auth" element={<UserAuth />} />
              <Route path="/search" element={<Search />} />
              <Route path="/service/:id" element={<ServiceDetails />} />

<Route path="/seller/service-view" element={<SellerView />} />

              <Route path="/bookingstatus" element={<ProviderBookingPage />} />

              <Route path="/pay" element={<Pay />} />

              <Route path="seller/view" element={<View />} />

              {/* Admin routes */}
              <Route
                path="/admin-home"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dash"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <GigAdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Seller routes */}
              <Route
                path="/seller-dash"
                element={
                  <ProtectedRoute allowedRoles={["seller"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gigcreate"
                element={
                  <ProtectedRoute allowedRoles={["seller"]}>
                    <GigCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-gigs"
                element={
                  <ProtectedRoute allowedRoles={["seller"]}>
                    <MyGigs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-gig/:id"
                element={
                  <ProtectedRoute allowedRoles={["seller"]}>
                    <EditGig />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seller-details"
                element={
                  <ProtectedRoute allowedRoles={["seller"]}>
                    <SellerDetailsForm />
                  </ProtectedRoute>
                }
              />

              {/* User routes */}
              <Route
                path="/user-dash"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-booking"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <Booking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-booking-status"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <BookingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-details"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <UserDetailsForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <Payment />
                  </ProtectedRoute>
                }
              />

              {/* Other routes */}
              <Route path="/service1" element={<Service1 />} />
              <Route path="/create" element={<Create />} />
              <Route path="/serv-img" element={<ServiceImages />} />
              <Route path="/test" element={<Test />} />
              <Route path="/location-test" element={<LocationTest />} />
            </Routes>
          </div>
        </Router>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;

// function App() {
//   return (
// <AuthProvider>
//     <DashboardProvider>
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/admin-auth" element={<AdminAuth />} />
//           <Route path="/seller-auth" element={<SellerAuth />} />
//           <Route path="/user-auth" element={<UserAuth />} />
//           <Route path="/search" element={<Search />} />
//           <Route path="/service/:id" element={<ServiceDetails />} />
//           <Route path="/service1" element={<Service1 />} />
//           <Route path="/user-booking-status" element={<BookingsPage />} />
//           <Route path="/user-booking" element={<Booking />} />
//           <Route path="/payment" element={<Payment />} />
//           <Route path="/gigcreate" element={<GigCreate />} />
//           <Route path="/create" element={<Create />} />
//           <Route path="/seller-dash" element={<Dashboard />} />
//           <Route path="/user-dash" element={<UserDashboard />} />
//           <Route path="/user-details" element={<UserDetailsForm />} />
//           <Route path="/seller-details" element={<SellerDetailsForm />} />
//           <Route path="/admin-home" element={<AdminHome />} />
//           <Route path="/admin-dash" element={<GigAdminDashboard />} />
//           <Route path="/serv-img" element={<ServiceImages />} ></Route>
//           <Route path="/test" element={<Test />} />
//           <Route path="/my-gigs" element={<MyGigs />} />
//           <Route path="/edit-gig/:id" element={<EditGig />} />
//           <Route path="/location-test" element={<LocationTest />} />
//         </Routes>
//       </div>
//     </Router>
//     </DashboardProvider>
// </AuthProvider>
//   );
// }

// export default App;
