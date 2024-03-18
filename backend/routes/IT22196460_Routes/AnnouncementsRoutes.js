import express from 'express';
import {createAnnouncement, getAnnouncement, updateAnnouncement, deleteAnnouncement } from '../../controllers/IT22196460_Controllers/AnnouncementController';
import { verifyToken } from '../../utils/verifyUser';

const router = express.Router();

//Create a new Announcement 
router.post("/create", verifyToken, createAnnouncement);

// Read all Announcements
router.get("/read", verifyToken, getAnnouncement);

//Update a Announcement 
router.put("/update/:id", verifyToken, updateAnnouncement);

//Delete a Announcement 
router.delete("/delete/:id", verifyToken, deleteAnnouncement);

export default router;