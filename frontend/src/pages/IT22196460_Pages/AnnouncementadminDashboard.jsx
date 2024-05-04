import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4 ">Welcome to Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 dark:text-slate-700">Create Announcement</h2>
                    <p className="text-gray-700 mb-4">Create a new announcement with ease.</p>
                    <Link to="/create-announcement" className="block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">Go to Create Page</Link>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 dark:text-slate-700">Manage Announcement</h2>
                    <p className="text-gray-700 mb-4">View and manage Announcements.</p>
                    <Link to="/announcements" className="block bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">Go to Manage Page</Link>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 dark:text-slate-700">Today's announcements</h2>
                    <p className="text-gray-700 mb-4">View today Announcements.</p>
                    <Link to="/admin/manage" className="block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">Recent Announcement page</Link>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 dark:text-slate-700">Update Announcements</h2>
                    <p className="text-gray-700 mb-4">Update existing announcements.</p>
                    <Link to="/admin/update" className="block bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">Go to Update Page</Link>
                </div>
                
                
            </div>
        </div>
    );
};

export default AdminDashboard;
