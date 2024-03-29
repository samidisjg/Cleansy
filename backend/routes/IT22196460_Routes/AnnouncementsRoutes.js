import express from 'express';
import {createAnnouncement, getAnnouncement, getAnnouncements, updateAnnouncement, deleteAnnouncement } from '../../controllers/IT22196460_Controllers/AnnouncementController.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

//Create a new Announcement 
router.post("/create", verifyToken, createAnnouncement);

// Read all Announcements
router.get("/read", verifyToken, getAnnouncements);

// Read one Announcement
router.get("/read", verifyToken, getAnnouncement);

//Update a Announcement 
router.put("/update/:id", verifyToken, updateAnnouncement);

//Delete a Announcement 
router.delete("/delete/:id", verifyToken, deleteAnnouncement);

export default router;