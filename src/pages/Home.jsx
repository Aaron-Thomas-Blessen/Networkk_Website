import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-gray-700 mb-6">
          Discover amazing features and services!
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/user-auth")}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
};

export default Home;
