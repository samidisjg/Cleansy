import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AnnouncementDetails = () => {
    const { id } = useParams();

    // State to hold announcement details
    const [announcement, setAnnouncement] = useState({
        id: '',
        title: ' ',
        content: ' ',
        date: ' ',
        imageUrl: ' ',
    });

    // UseEffect to fetch announcement data or generate it
    useEffect(() => {
        // Hfetch the announcement data from an API or database using the 'id'
        
        const fetchAnnouncement = () => {
            // Generate a fake announcement with auto-incrementing ID
            const newAnnouncement = {
                id: parseInt(id), // Convert id to integer
                title: 'Announcement ${id}',
                content: 'This is the content of announcement ${id}.',
                date: new Date().toLocaleDateString(), // Current date
                imageUrl: 'https://via.placeholder.com/400x200?text=Announcement${id}',
            };
            setAnnouncement(newAnnouncement);
        };

        // Call the fetchAnnouncement function
        fetchAnnouncement();
    }, [id]); // Depend on 'id' parameter change

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-semibold mb-4">{announcement.title}</h1>
                <p className="text-gray-700 mb-4">{announcement.content}</p>
                <p className="text-gray-500 mb-4">Posted on {announcement.date}</p>
                <img src={announcement.imageUrl} alt={`Announcement ${id}`} className="w-full rounded-lg mb-4" />
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out hover:scale-105">Back to Announcement List</button>
            </div>
        </div>
    );
};

export default AnnouncementDetails;