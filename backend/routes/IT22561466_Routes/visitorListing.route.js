import express from 'express';
import { createvisitorListing } from '../../controllers/IT22561466_Controllers/visitorListing.controller.js';

const router = express.Router();

router.post('/create',  createvisitorListing);

export default router;