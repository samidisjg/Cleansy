import express from 'express';
import { createComment } from '../../controllers/IT22577160_Controllers/comment.controller_02.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);

export default router;