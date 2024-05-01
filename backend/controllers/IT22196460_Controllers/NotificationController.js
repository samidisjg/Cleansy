// backend\controllers\IT22196460_Controllers\NotificationController.js
import Notification from '../../models/IT22196460_Models/NotificationModel.js';

// Create a new notification
export const createNotification = async (req, res) => {
    try {
        const { Notification_title, Notification_content, deliveryChannel, recipientType, recipientId } = req.body;
        const notification = new Notification({ Notification_title, Notification_content, deliveryChannel, recipientType, recipientId });
        await notification.save();
        
        // Send notification via email if deliveryChannel is email
        if (deliveryChannel === 'email') {
            // Implement your email sending logic here
            console.log(`Email notification sent to ${recipientId}: ${Notification_title}`);
        }
        
        res.status(201).json(notification);
    } catch(error){
        console.error('Error creating notification:', error);
        res.status(500).json({ message: 'Failed to create notification'});
    }
};

// Update an existing notification
export const updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const { Notification_title, Notification_content, deliveryChannel, recipientType, recipientId } = req.body;
        const notification = await Notification.findByIdAndUpdate(id, { Notification_title, Notification_content, deliveryChannel, recipientType, recipientId }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.json(notification);
    } catch(error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ message: 'Failed to update notification'});
    }
};

// Delete an existing notification
export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        if(!notification) {
            return res.status(404).json({ message: 'Notification not found'});
        }
        res.json({ message: 'Notification deleted successfully'});
    } catch(error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ message: 'Failed to delete notification'});
    }
};

// Get all notifications 
export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch(error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Failed to fetch notifications'});
    }
};

// Get a single notification by ID
export const getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        if(!notification) {
            return res.status(404).json({ message: 'Notification not found'});
        }
        res.json(notification);
    } catch(error) {
        console.error('Error fetching notification:', error);
        res.status(500).json({ message: 'Failed to fetch notification'});
    }
};
