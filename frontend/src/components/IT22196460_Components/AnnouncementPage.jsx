import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnnouncementPage = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchAnnouncementsToday();
    }, []);

    const fetchAnnouncementsToday = async () => {
        try {
            const response = await axios.get('/api/announcements/today?includeUpdated=true');
            setAnnouncements(response.data.announcements);
        } catch (error) {
            console.error('Error fetching announcements:', error.message);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    const filteredAnnouncements = announcements.filter((announcement) =>
        announcement.Title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === '' || announcement.Category_ID === selectedCategory)
    );

    return (
        <div className="text-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Today's Announcements</h1>
            <div className="container mx-auto">
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="p-2 border border-gray-300 rounded mr-2 dark:text-slate-700"
                    />
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="p-2 border border-gray-300 rounded dark:text-slate-700"
                    >
                        <option value="">All Categories</option>
                        <option value="staff">Staff</option>
                        <option value="customer">Customer</option>
                    </select>
                </div>
            </div>
            <div className="container mx-auto grid grid-cols-3 gap-4 dark:text-slate-700">
                {filteredAnnouncements.map((announcement) => (
                    <div
                        key={announcement._id}
                        className="bg-white border border-gray-200 rounded-lg shadow p-6 hover:bg-gray-100 dark:text-slate-700"
                        style={{
                            animation: 'fadeIn 0.5s ease-in-out',
                            marginBottom: '20px' // Add margin to create space between announcements
                        }}
                    >
                        <h2 className="text-lg font-bold mb-2 text-center">{announcement.Title}</h2>
                        <p className="text-gray-700">{announcement.Content}</p>
                        <div className="mt-auto gap-4">
                        <p className="text-center font-bold">{announcement.Category_ID}</p>
                            <p className="text-center text-gray-500 ">{new Date(announcement.Create_At).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnnouncementPage;
