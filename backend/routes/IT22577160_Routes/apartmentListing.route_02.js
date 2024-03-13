import express from 'express';
import { createListing } from '../../controllers/IT22577160_Controllers/apartmentListing.controller_02.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);

export default router;