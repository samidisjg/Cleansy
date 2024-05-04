import express from 'express';
import { createTaskAnalysis,allTasksAnalysis,deleteTaskAnalysis } from '../../controllers/IT22607232_Controllers/TaskAnalysisController_01.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken,createTaskAnalysis);
router.get('/get',verifyToken,allTasksAnalysis);
router.delete('/delete/:id',verifyToken,deleteTaskAnalysis);




export default router;