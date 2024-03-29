import Notification from '../../models/IT22196460_Models/NotificationModel.js';

// Create a new notification
exports.createNotification = async (req, res) => {
    try {
        const {Notification_title, Notification_content, deliveryChannel, receivedTo} = req.body;
        const notification = new Notification({ Notification_title, Notification_content, deliveryChannel, receivedTo});
        await notification.save();
        res.status(201).json(notification);
    } catch(error){
        console.error('Error creating notification:', error);
        res.status(500).json({ message: 'Failed to create notification'});
    }
};

// Update an existing notification
exports.updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const {Notification_title, Notification_content, deliveryChannel, receivedTo} = req.body;
        const notification = await Notification.findByIdAndUpdate(id, {Notification_title, Notification_content, deliveryChannel, receivedTo}, {new: true});
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found'});
        }
        res.json(notification);
    } catch {
        console.error('Error updating notification:', error);
        res.status(500).json({message: 'Failed to update notification'});
    }
};

// Delete an existing notification
exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        if(!notification) {
            return res.status(404).json({ message: 'Notification not found'});
        }
        res.json({ message: 'Notification delete successfully'});
    } catch(error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ message: 'Failed to delete notification'});
    }
};

// Get all notification 
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch(error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Failed to fetch notifications'});
    }
};

//Get a single notification by ID
exports,getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        if(!notification) {
            return res.status(404).json({ message: 'Notification not found'});
        }
        res.json(notification);
    } catch(error) {
        console.error('Error fetching notification :', error);
        res.status(500).json({ message: 'Failed to fetch notification'});
    }
};