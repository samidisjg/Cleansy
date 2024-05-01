import express from 'express'
import {InputParameters, allInputs,estimateCost} from '../../controllers/IT22607232_Controllers/Estimation_Controller__01.js'
import { verifyToken } from '../../utils/verifyUser.js'

const router = express.Router();

router.post('/estimate',verifyToken,InputParameters);
router.get('/all/',verifyToken,allInputs);
router.get('/generate',verifyToken,estimateCost)

export default router;