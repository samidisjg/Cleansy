import express from 'express';
import { verifyToken } from '../../utils/verifyUser.js';
import { createListing, getSharedResources } from '../../controllers/IT22577160_Controllers/sharedResourcesListing.controller_02.js';


const router = express.Router();

router.post('/create', verifyToken, createListing)
router.get('/getSharedResources', getSharedResources);

export default router;