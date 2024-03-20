import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnnouncementPage = () => {
    
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() =>{
        //Fetch announcements from backend when component mounts
        axios.get('/api/announcements/read')
        .then(response => {
            setAnnouncements(response.data);
        })
        .catch(error => {
            console.error('Error fetching announcements:', error);
        });

    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-4">Announcements</h1>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">Title</th>
                        <th className="py-2 px-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements.map(announcement =>(
                        <tr key ={announcement._id} className="bg-white hover:bg-gray-100">
                            <td className="py-2 px-4 border">{announcement.Title}</td>
                            <td className="py-2 px-4 border">
                                <button onClick={() => handleUpdate(announcement)} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded mr-2 focus:outline-none focus:shadow-outline">
                                    Update
                                </button>
                                <button onClick={() => handleDelete(announcement._id)} className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default AnnouncementPage;