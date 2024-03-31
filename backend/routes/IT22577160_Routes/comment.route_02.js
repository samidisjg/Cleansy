import express from 'express';
import { createComment, getPostComments, getUserComments } from '../../controllers/IT22577160_Controllers/comment.controller_02.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:resourceId', getPostComments);
router.get('/getUserComments/:userId', getUserComments);

export default router;