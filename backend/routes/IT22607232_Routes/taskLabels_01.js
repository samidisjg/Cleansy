import express from 'express';
import { getLabels} from '../../controllers/IT22607232_Controllers/TaskCategoryController_01.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.get('/get',verifyToken,getLabels);

export default router;