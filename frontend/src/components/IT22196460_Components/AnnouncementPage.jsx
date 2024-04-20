import React, { useState } from 'react';

const AnnouncementPage = () => {
    const [showFilters, setShowFilters] = useState(false); // State to control filter options visibility
    const [filterOptions, setFilterOptions] = useState({
        date: 'today',
        time: 'upcoming',
        category: 'all',
        priority: 'all', // Additional filter option
        status: 'all' // Additional filter option
    });

    const handleFilterChange = (option, value) => {
        setFilterOptions({ ...filterOptions, [option]: value });
        // Implement logic to filter announcements based on the selected options
    };

    const applyFilters = () => {
        const queryString = Object.keys(filterOptions)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(filterOptions[key])}`)
            .join('&');
        window.location.search = queryString;
    };

    return (
        <div className="flex w-screen h-screen text-gray-700">
            {/* Filter Options */}
            <div className={`flex flex-col items-center w-56 pb-4 overflow-auto border-r border-gray-300 ${showFilters ? '' : 'hidden'}`}>
                <div className="mb-4">
                    <select
                        className="w-full p-2 border border-gray-300 rounded"
                        value={filterOptions.date}
                        onChange={(e) => handleFilterChange('date', e.target.value)}>
                        <option value="today">Today</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="missed">Missed</option>
                    </select>
                </div>
                {/* Add other filter options (time, category, priority, status) */}
                <div className="mb-4">
                    <select
                        className="w-full p-2 border border-gray-300 rounded"
                        value={filterOptions.priority}
                        onChange={(e) => handleFilterChange('priority', e.target.value)}>
                        <option value="all">All Priorities</option>
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </select>
                </div>
                <div className="mb-4">
                    <select
                        className="w-full p-2 border border-gray-300 rounded"
                        value={filterOptions.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}>
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                {/* Add more filter options here */}
                <button
                    className="w-full p-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={applyFilters}
                >
                    Apply Filters
                </button>
            </div>
            {/* Main Content */}
            <div className="flex flex-col flex-grow">
                {/* Page Header */}
                <div className="flex items-center justify-between flex-shrink-0 h-16 px-8 border-b border-gray-300">
                    <h1 className="text-lg font-medium">Announcement Page</h1>
                    {/* Button to toggle filter options */}
                    <button
                        className="text-sm font-medium bg-gray-200 rounded px-3 py-1 hover:bg-gray-300"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>
                {/* Announcement List */}
                <div className="flex-grow p-6 overflow-auto bg-gray-200">
                    
                    {/* Display filtered announcements here */}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementPage;