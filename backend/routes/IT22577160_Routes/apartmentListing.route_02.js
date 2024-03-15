import express from 'express';
import { createListing, deleteListing, getApartmentListing, updateListing } from '../../controllers/IT22577160_Controllers/apartmentListing.controller_02.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.get('/apartmentListings/:id', verifyToken, getApartmentListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);

export default router;