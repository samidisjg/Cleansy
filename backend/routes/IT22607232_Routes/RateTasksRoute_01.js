import express from 'express';
import { createRating} from '../../controllers/IT22607232_Controllers/RateTasksController_01.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createRating);

export default router;