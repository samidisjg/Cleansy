import express from 'express';
import { TaskAssigning,allTasks,oneTask, updateTask,deleteTask } from '../../controllers/IT22607232_Controllers/s1_TaskAssignController.js'
import { verifyToken } from '../../utils/verifyUser.js'


const router = express.Router();

router.post('/create', verifyToken, TaskAssigning);
router.get('/all/', verifyToken, allTasks);
router.get('/one/:taskid', verifyToken, oneTask);
router.put('/update/:taskid',verifyToken,updateTask);
router.delete('/delete/:taskid',verifyToken,deleteTask);

export default router;