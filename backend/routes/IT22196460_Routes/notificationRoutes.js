import express from 'express';
import {createNotification, updateNotification, deleteNotification, getAllNotifications, getNotificationById} from '../../controllers/IT22196460_Controllers/NotificationController.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

//Create a new Notification 
router.post("/create", verifyToken, createNotification);

// Read all Notifications
router.get("/read", verifyToken, getAllNotifications);

// Read one Notification
router.get("/read", verifyToken, getNotificationById);

//Update a Notification 
router.put("/update/:id", verifyToken, updateNotification);

//Delete a Notification 
router.delete("/delete/:id", verifyToken, deleteNotification);

export default router;