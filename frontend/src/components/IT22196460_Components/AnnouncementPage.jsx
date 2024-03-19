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
        <div>
            <h1>Announcements</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements.map(announcement =>(
                        <tr key ={announcement._id}>
                            <td>{announcement.Title}</td>
                            <td>
                                <button onClick={() => handleUpdate(announcement)}>Updare</button>
                                <button onClick={() => handleDelete(announcement._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default AnnouncementPage;