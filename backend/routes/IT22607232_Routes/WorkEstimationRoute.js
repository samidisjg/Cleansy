import express from 'express';
import { estimateCost} from '../../controllers/IT22607232_Controllers/WorkEstimationContoller_01.js'
import { verifyToken } from '../../utils/verifyUser.js'


const router = express.Router();

router.post('/estimate', verifyToken, estimateCost);

export default router;