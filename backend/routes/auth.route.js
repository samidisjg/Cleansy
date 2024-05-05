import express from 'express';
import { google, signIn, signup,signInQR } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signIn)
router.post('/google', google)
router.post('/signinQR', signInQR)

export default router;