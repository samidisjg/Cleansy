import express from 'express'
import {InputParameters, allInputs,OneEstimation} from '../../controllers/IT22607232_Controllers/Estimation_Controller__01.js'
import { verifyToken } from '../../utils/verifyUser.js'

const router = express.Router();

router.post('/estimate',verifyToken,InputParameters);
router.get('/all/',verifyToken,allInputs);
router.get('/getOne/:taskid',verifyToken,OneEstimation)

export default router;