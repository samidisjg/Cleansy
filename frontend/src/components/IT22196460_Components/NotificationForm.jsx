// components/NotificationForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationForm = ({ id }) => {
    const [formData, setFormData] = useState({
        Notification_title: '',
        Notification_content: '',
        deliveryChannel: '',
        recipientType: '',
        recipientId: ''
    });

    useEffect(() => {
        if (id) {
            // Fetch notification details if ID is provided for update
            fetchNotification(id);
        }
    }, [id]);

    const fetchNotification = async (id) => {
        try {
            const res = await axios.get(`/api/notification/read/${id}`);
            const notification = res.data;
            setFormData({
                Notification_title: notification.Notification_title,
                Notification_content: notification.Notification_content,
                deliveryChannel: notification.deliveryChannel,
                recipientType: notification.recipientType,
                recipientId: notification.recipientId
            });
        } catch (error) {
            console.error('Error fetching notification:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // Update notification
                await axios.put(`/api/notification/update/${id}`, formData);
            } else {
                // Create notification
                await axios.post('/api/notification/create', formData);
            }
            // Reset form data
            setFormData({
                Notification_title: '',
                Notification_content: '',
                deliveryChannel: '',
                recipientType: '',
                recipientId: ''
            });
        } catch (error) {
            console.error('Error creating/updating notification:', error);
        }
    };

    return (
        <div>
            <h2>{id ? 'Update Notification' : 'Create Notification'}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="Notification_title" placeholder="Notification Title" value={formData.Notification_title} onChange={handleChange} />
                <input type="text" name="Notification_content" placeholder="Notification Content" value={formData.Notification_content} onChange={handleChange} />
                <select name="deliveryChannel" value={formData.deliveryChannel} onChange={handleChange}>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                </select>
                <select name="recipientType" value={formData.recipientType} onChange={handleChange}>
                    <option value="customer">Customer</option>
                    <option value="staff">Staff</option>
                </select>
                <input type="text" name="recipientId" placeholder="Recipient ID" value={formData.recipientId} onChange={handleChange} />
                <button type="submit">{id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
};

export default NotificationForm;
