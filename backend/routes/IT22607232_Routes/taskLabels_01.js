import express from 'express';
import { createTaskAnalysis,allTasksAnalysis } from '../../controllers/IT22607232_Controllers/TaskAnalysisController_01.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.get('/get',verifyToken,allTasksAnalysis);

export default router;