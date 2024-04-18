import React from 'react';
import { Link } from 'react-router-dom';

const AnnouncementCard = ({ announcement }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <img src={announcement.imageUrl} alt="Announcement" className="w-full h-48 object-cover object-center" />
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{announcement.title}</h2>
                <p className="text-gray-700 mb-4">{announcement.content}</p>
                <Link to={`/announcement/${announcement.id}`} className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">Read More</Link>
            </div>
        </div>
    );
};

export default AnnouncementCard;
