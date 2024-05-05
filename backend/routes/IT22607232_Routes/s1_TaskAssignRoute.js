import express from 'express';
import { TaskAssigning,allTasks,oneTask, updateTask,deleteTask, sendEmail} from '../../controllers/IT22607232_Controllers/s1_TaskAssignController.js'
import { verifyToken } from '../../utils/verifyUser.js'


const router = express.Router();

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

router.post('/create', verifyToken, TaskAssigning);
router.get('/all/', verifyToken, allTasks);
router.get('/one/:taskid', verifyToken, oneTask);
router.put('/update/:taskid',verifyToken,updateTask);
router.delete('/delete/:taskid',verifyToken,deleteTask);
router.post('/sendemail', verifyToken, sendEmail);

export default router;