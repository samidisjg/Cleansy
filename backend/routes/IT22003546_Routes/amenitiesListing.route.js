import express from 'express';
import { createAmenityListing, getAmenityListings, updateAmenityListing, deleteAmenityListing} from '../../controllers/IT22003546_Controllers/amenitiesListing.controller.js';
import { verifyToken } from '../../utils/verifyUser.js';
import { get } from 'mongoose';

const router = express.Router();

// create a new amenity listing
router.post('/create', verifyToken, createAmenityListing);

// get all amenity listings
router.get('/get', verifyToken, getAmenityListings);

// update amenity listing
router.put('/update/:id', verifyToken, updateAmenityListing);

//delete amenity listing
router.delete('/delete/:id', verifyToken, deleteAmenityListing);

export default router;