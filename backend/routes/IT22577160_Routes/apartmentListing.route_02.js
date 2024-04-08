import express from 'express';
import { createListing, deleteListing, getApartmentListing, getApartmentListings, getListing, updateListing } from '../../controllers/IT22577160_Controllers/apartmentListing.controller_02.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.get('/apartmentListings/:id', verifyToken, getApartmentListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/getListing/:id', getListing);
router.get('/getListings', getApartmentListings);

export default router;