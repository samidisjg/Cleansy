import express from 'express';
import { createTaskAnalysis } from '../../controllers/IT22607232_Controllers/TaskAnalysisController_01.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken,createTaskAnalysis);

export default router;