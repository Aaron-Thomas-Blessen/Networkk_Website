import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminLog from "./pages/Admin/AdminLog";
import SellerAuth from "./pages/Seller/SellerAuth";
import UserAuth from "./pages/User/UserAuth";
import Dashboard from "./pages/User/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLog />} />
        <Route path="/seller-auth" element={<SellerAuth />} />
        <Route path="/user-auth" element={<UserAuth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
