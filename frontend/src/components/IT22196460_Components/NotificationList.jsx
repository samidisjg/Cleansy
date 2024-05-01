// components/NotificationList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get('/api/notification/read');
            setNotifications(res.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    return (
        <div>
            <h2>Notification List</h2>
            <ul>
                {notifications.map(notification => (
                    <li key={notification._id}>
                        <h3>{notification.Notification_title}</h3>
                        <p>{notification.Notification_content}</p>
                        <p>Delivery Channel: {notification.deliveryChannel}</p>
                        <p>Recipient Type: {notification.recipientType}</p>
                        <p>Recipient ID: {notification.recipientId}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
