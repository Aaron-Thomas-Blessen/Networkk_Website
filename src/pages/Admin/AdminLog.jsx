import React from "react";
import { Link } from "react-router-dom";

const AdminLog = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Log In</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-purple-500 hover:text-purple-600">
            Back to account type selection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLog;
