import express from 'express';
import { createCategories, getCategories} from '../../controllers/IT22607232_Controllers/TaskCategoryController_01.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken,createCategories);
router.get('/get',verifyToken,getCategories);

export default router;