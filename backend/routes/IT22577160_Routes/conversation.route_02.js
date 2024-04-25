import express from 'express';
import { createNewConversation } from '../../controllers/IT22577160_Controllers/conversation.controller_02.js';

const router = express.Router();

router.post("/createNewConversation", createNewConversation);

export default router;