import express from 'express';
import { createAmenityListing, getAmenityListings, updateAmenityListing, deleteAmenityListing, getAmenityListingById} from '../../controllers/IT22003546_Controllers/amenitiesListing.controller.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

// Error handling
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// create a new amenity listing
router.post('/create', verifyToken, createAmenityListing);

// get all amenity listings
router.get('/get', verifyToken, getAmenityListings);

// get amenity listing by ID
router.get('/get/:Amenityid', verifyToken, getAmenityListingById);

// update amenity listing
router.put('/update/:Amenityid', verifyToken, updateAmenityListing);

//delete amenity listing
router.delete('/delete/:Amenityid', verifyToken, deleteAmenityListing);

export default router;