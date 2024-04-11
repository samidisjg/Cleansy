import express from 'express';
import { checkout } from '../../controllers/IT22577160_Controllers/checkout.controller_02.js';

const router = express.Router();

router.post('/creteCheckout', checkout);

export default router;