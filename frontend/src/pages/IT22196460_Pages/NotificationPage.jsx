// pages/NotificationPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const NotificationPage = () => {
    const [formData, setFormData] = useState({
        Notification_title: '',
        Notification_content: '',
        deliveryChannel: '',
        recipientType: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/notification/send', formData);
            alert('Notification sent successfully');
            // Optionally, you can reset the form data after sending the notification
            setFormData({
                Notification_title: '',
                Notification_content: '',
                deliveryChannel: '',
                recipientType: ''
            });
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Failed to send notification');
        }
    };

    return (
        <div>
            <h2>Send Notification</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="Notification_title" placeholder="Notification Title" value={formData.Notification_title} onChange={handleChange} required />
                <textarea name="Notification_content" placeholder="Notification Content" value={formData.Notification_content} onChange={handleChange} required />
                <select name="deliveryChannel" value={formData.deliveryChannel} onChange={handleChange} required>
                    <option value="">Select Delivery Channel</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                </select>
                <select name="recipientType" value={formData.recipientType} onChange={handleChange} required>
                    <option value="">Select Recipient Type</option>
                    <option value="customer">Customer</option>
                    <option value="staff">Staff</option>
                </select>
                <button type="submit">Send Notification</button>
            </form>
        </div>
    );
};

export default NotificationPage;
