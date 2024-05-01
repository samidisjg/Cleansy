// components/DeleteNotification.jsx
import React from 'react';
import axios from 'axios';

const DeleteNotification = ({ id }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/notification/delete/${id}`);
            // Optionally, you can update the state or perform other actions after deletion
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default DeleteNotification;

