import express from 'express';
import {CreatePaymentProfile,getPaymentProfile,updatepaymentprofile} from '../../controllers/IT22602978_Controllers/PaymentProfileCreation.controller_03.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.post('/CreatePayment',verifyToken,CreatePaymentProfile);
router.get('/getpayments/:username',verifyToken,getPaymentProfile);
router.put('/updatepayment/:id',verifyToken,updatepaymentprofile);

export default router;