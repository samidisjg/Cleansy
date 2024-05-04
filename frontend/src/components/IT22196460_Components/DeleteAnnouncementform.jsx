// DeleteAnnouncementForm.jsx
import React from 'react';
import axios from 'axios';

const DeleteAnnouncementForm = ({ announcementId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/announcement/${announcementId}`);
      onDelete(announcementId);
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete this announcement?</p>
      <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Delete</button>
    </div>
  );
};

export default DeleteAnnouncementForm;

