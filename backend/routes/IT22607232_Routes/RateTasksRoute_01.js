import express from 'express';
import { createRating, getRatings} from '../../controllers/IT22607232_Controllers/RateTasksController_01.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createRating);
router.get('/getrates/', verifyToken,getRatings);

export default router