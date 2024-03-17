import express from 'express';
import { createRequestLeave, getRequestLeave, deleteRequestLeave } from '../../controllers/IT22603418_Controllers/RequestLeave.controller_04.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();
//Create Leave Request
router.post('/create_04', verifyToken, createRequestLeave);
//View Leave Requests
router.get('/get_04/:staffID', verifyToken, getRequestLeave);
//Delete Leave Request
router.delete('/delete_04/:_id', verifyToken, deleteRequestLeave);

export default router;