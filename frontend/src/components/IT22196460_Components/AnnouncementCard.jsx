// src/components/AnnouncementCard.jsx
import React from 'react';

const AnnouncementCard = ({ announcement, onDelete, onUpdate }) => {
  const handleDelete = () => {
    onDelete(announcement.id);
  };

  const handleUpdate = () => {
    onUpdate(announcement.id);
  };

  return (
    <div>
      <h3>{announcement.Title}</h3>
      <p>{announcement.Content}</p>
      {/* Add buttons for delete and update for admin */}
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default AnnouncementCard;
