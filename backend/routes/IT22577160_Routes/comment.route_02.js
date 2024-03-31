import express from 'express';
import { createComment, editComment, getPostComments, getUserComments, likeComment } from '../../controllers/IT22577160_Controllers/comment.controller_02.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:resourceId', getPostComments);
router.get('/getUserComments/:userId', getUserComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);

export default router;