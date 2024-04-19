import express from 'express';
import { verifyToken } from '../../utils/verifyUser.js';
import { createLeaveRequest, acceptLeaveRequest, denyLeaveRequest } from './../../controllers/IT22603418_Controllers/StaffAdmin.controller_04.js';

const router = express.Router();

router.post('/create', verifyToken, createLeaveRequest);
router.put('/accept/:requestId', verifyToken, acceptLeaveRequest);
router.put('/deny/:requestId', verifyToken, denyLeaveRequest);

export default router;