import express from 'express';
import { AdminAddPayments,AdminAddFinalPayments } from '../../controllers/IT22602978_Controllers/AdminAddPaymentHandling.controller_03.js';
import{AdminDuePayments,AdminDueFinalPayments} from '../../controllers/IT22602978_Controllers/AdminDuePaymentHandling.controller_03.js';
import{AdminFinalPayments,getAdminFinalPayments,getoutstandigBalance} from '../../controllers/IT22602978_Controllers/AdminFinalPaymentHandling.controller_03.js';
import { verifyToken } from '../../utils/verifyUser.js';




const router = express.Router();

router.post('/AdminAddPayment',verifyToken,AdminAddPayments);
router.post('/AdminDuePayment',verifyToken,AdminDuePayments);
router.get('/.AdminFinal',verifyToken,AdminAddFinalPayments);
router.get('/..AdminFinal',verifyToken,AdminDueFinalPayments);
router.put('/Finalize',verifyToken,AdminFinalPayments)
router.get('/AdminFinalPayments',verifyToken,getAdminFinalPayments)
router.get('/:houseid',verifyToken,getoutstandigBalance)




export default router;