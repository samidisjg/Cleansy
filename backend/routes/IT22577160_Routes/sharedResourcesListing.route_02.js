import express from 'express';
import { verifyToken } from '../../utils/verifyUser.js';
import { createListing, deleteSharedResource, getSharedResources, updateSharedResource } from '../../controllers/IT22577160_Controllers/sharedResourcesListing.controller_02.js';


const router = express.Router();

router.post('/create', verifyToken, createListing)
router.get('/getSharedResources', getSharedResources);
router.delete('/deleteSharedResource/:postId/:userId', verifyToken, deleteSharedResource);
router.put('/updateSharedResource/:postId/:userId', verifyToken, updateSharedResource);

export default router;