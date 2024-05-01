//frontend\src\components\IT22196460_Components\announcementList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnnouncementList = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get('/api/announcement');
            setAnnouncements(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    const deleteAnnouncement = async (id) => {
        try {
            await axios.delete(`/api/Announcement/${id}`);
            setAnnouncements(announcements.filter(announcement => announcement._id !== id));
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    const handleUpdateAnnouncement = (id) => {
        // Implement update logic here
    };

    return (
        <div>
            <h1>Announcements</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Announcement ID</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Category ID</th>
                            <th>Attachment URL</th>
                            <th>Create At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.map(announcement => (
                            <tr key={announcement._id}>
                                <td>{announcement.Announcement_ID}</td>
                                <td>{announcement.Title}</td>
                                <td>{announcement.Content}</td>
                                <td>{announcement.Category_ID}</td>
                                <td>{announcement.Attachment_URL}</td>
                                <td>{announcement.Create_At}</td>
                                <td>
                                    <button onClick={() => deleteAnnouncement(announcement._id)}>Delete</button>
                                    <button onClick={() => handleUpdateAnnouncement(announcement._id)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AnnouncementList;
