import React from 'react';

const Dashboard = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="my-4">
                <h1 className="text-3xl font-bold">User Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Profile</h2>
                    <p className="mb-4">View and edit your profile information.</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Go to Profile</button>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Settings</h2>
                    <p className="mb-4">Manage your account settings and preferences.</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Go to Settings</button>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Notifications</h2>
                    <p className="mb-4">View your recent notifications.</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Go to Notifications</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
