import express from 'express';
import {CreatePaymentProfile,getPaymentProfile,updatepaymentprofile,getPaymentProfileone,navigatepaymentprofile,DeletePaymentProfile} from '../../controllers/IT22602978_Controllers/PaymentProfileCreation.controller_03.js';
import { verifyToken } from '../../utils/verifyUser.js';


const router = express.Router();

router.post('/CreatePayment',verifyToken,CreatePaymentProfile);
router.get('/getpayments/:username',verifyToken,getPaymentProfile);
router.put('/updatepayment/:id',verifyToken,updatepaymentprofile);
router.get('/getpayment/:id',verifyToken,getPaymentProfileone);
router.get('/naviagate/:id',verifyToken,navigatepaymentprofile);
router.delete('/deletepaymentprofile/:id',verifyToken,DeletePaymentProfile);




export default router;