import express from 'express';
import { createcarparkListing } from '../../controllers/IT22561466_Controllers/carparkListing.controller.js';

const router = express.Router();

router.post('/create',  createcarparkListing);

export default router;