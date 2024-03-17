import express from 'express';
import { createRequestLeave, getRequestLeave } from '../../controllers/IT22603418_Controllers/RequestLeave.controller_04.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.post('/create_04', verifyToken, createRequestLeave);
router.get('/get_04/:staffID', verifyToken, getRequestLeave);

export default router;