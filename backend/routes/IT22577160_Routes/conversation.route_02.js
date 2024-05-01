import express from 'express';
import { createNewConversation, getAdminConversation, updateLastMessage } from '../../controllers/IT22577160_Controllers/conversation.controller_02.js';

const router = express.Router();

router.post("/createNewConversation", createNewConversation);
router.get("/getAdminConversation/:id", getAdminConversation);
router.put("/updateLastMessage/:id", updateLastMessage)

export default router;