import express from 'express';
import { createRequestLeave} from '../../controllers/IT22603418_Controllers/RequestLeave.controller_04.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createRequestLeave);
//router.get('/get', verifyToken, getRequestLeaveById);

export default router;