import React from 'react';
import { Link } from 'react-router-dom';

const AnnouncementList = () => {
    const announcements = [
        { id: 1, title: 'Important Announcement', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { id: 2, title: 'New Updates', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { id: 3, title: 'Events Calendar', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Latest Announcements</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {announcements.map(announcement => (
                    <div key={announcement.id} className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105">
                        <h2 className="text-xl font-semibold mb-2">{announcement.title}</h2>
                        <p className="text-gray-700">{announcement.content}</p>
                        <Link to={`/announcement/${announcement.id}`} className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnnouncementList;
