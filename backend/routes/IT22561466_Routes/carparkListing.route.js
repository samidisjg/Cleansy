import express from 'express';
import { createcarparkListing , updatecarparkListing , getAllBooked, getCarparkListings } from '../../controllers/IT22561466_Controllers/carparkListing.controller.js';

const router = express.Router();

router.post('/create',  createcarparkListing);
router.put('/updateSlotID',  updatecarparkListing);
router.get('/getAllboked',  getAllBooked);
router.get('/get/:id', getCarparkListings);

export default router;