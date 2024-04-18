import React from 'react';
import { useParams } from 'react-router-dom';

const AnnouncementDetails = () => {
    const { id } = useParams();
    const announcement = {
        id: 1,
        title: 'Important Announcement',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta, metus ac rutrum tempor, nulla mi fringilla nibh, a congue elit lectus eget nulla.',
        date: 'April 11, 2024',
        imageUrl: 'https://via.placeholder.com/400x200',
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-semibold mb-4">{announcement.title}</h1>
                <p className="text-gray-700 mb-4">{announcement.content}</p>
                <p className="text-gray-500 mb-4">Posted on {announcement.date}</p>
                <img src={announcement.imageUrl} alt="Announcement" className="w-full rounded-lg mb-4" />
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out hover:scale-105">Back to Announcement List</button>
            </div>
        </div>
    );
};

export default AnnouncementDetails;
