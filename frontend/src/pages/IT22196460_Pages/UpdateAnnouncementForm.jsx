import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateAnnouncementForm = () => {
    const [announcement, setAnnouncement] = useState({
        title: '',
        content: '',
        category: '',
        url: ''
        
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/announcements/read/${id}`);
            const data = response.data;
            setAnnouncement(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnouncement(prevAnnouncement => ({
            ...prevAnnouncement,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/announcements/read/${id}`, announcement);
            // Optionally, you can handle success response here
            console.log('Announcement updated successfully');
        } catch (error) {
            console.error('Error updating announcement:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-4">Update Announcement</h2>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                    <input type="text" id="title" name="title" value={announcement.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
                    <textarea id="content" name="content" rows="5" value={announcement.content} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
                    <input type="text" id="category" name="category" value={announcement.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="url" className="block text-gray-700 font-bold mb-2">URL</label>
                    <input type="text" id="url" name="url" value={announcement.url} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>
            </form>
        </div>
    );
};

export default UpdateAnnouncementForm;
