import express from 'express';
import { TaskAssigning } from '../../controllers/IT22607232_Controllers/s1_TaskAssignController.js'
import { verifyToken } from '../../utils/verifyUser.js'


const router = express.Router();

router.post('/create', verifyToken, TaskAssigning);
router.get('/all', verifyToken, TaskAssigning);

export default router;