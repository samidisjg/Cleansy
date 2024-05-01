import React, { useState } from 'react';
import axios from 'axios';

const UpdateAnnouncementForm = ({ announcementId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [attachmentURL, setAttachmentURL] = useState('');
    const [createAt, setCreateAt] = useState(''); // assuming you want to update Create_At field

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/api/announcements/update/${announcementId}`, {
                Title: title,
                Content: content,
                Category_ID: category,
                Attachment_URL: attachmentURL,
                Create_At: createAt,
            });
            console.log('Announcement updated:', response.data);
        } catch (error) {
            console.error('Error updating announcement:', error);
        }
    };

    return (
        <div>
            <h2>Update Announcement</h2>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="content">Content:</label>
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <label htmlFor="attachmentURL">Attachment URL:</label>
            <input type="text" id="attachmentURL" value={attachmentURL} onChange={(e) => setAttachmentURL(e.target.value)} />
            <label htmlFor="createAt">Create At:</label>
            <input type="date" id="createAt" value={createAt} onChange={(e) => setCreateAt(e.target.value)} />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default UpdateAnnouncementForm;
