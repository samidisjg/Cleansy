import express from 'express';
<<<<<<< HEAD
import { createvisitorListing } from '../../controllers/IT22561466_Controllers/visitorListing.controller.js';
=======
import { createvisitorListing, deletevisitorListing, updatevisitorListing, getvisitorListing, getAllVisitorListings, getvisitors } from '../../controllers/IT22561466_Controllers/visitorListing.controller.js';
import { verifyToken } from '../../utils/verifyUser.js';
>>>>>>> origin/Dev

const router = express.Router();

router.post('/create',  createvisitorListing);
<<<<<<< HEAD
=======
router.delete('/delete/:id', verifyToken, deletevisitorListing);
router.post('/update/:id', verifyToken, updatevisitorListing);
router.get('/get/:id', getvisitorListing);
router.get('/getAll', getAllVisitorListings);
router.get('/get', getvisitors);
>>>>>>> origin/Dev

export default router;