import express from 'express';
import { createNewMessage, getAllMessages } from '../../controllers/IT22577160_Controllers/messages.controller_02.js';

const router = express.Router();

router.post("/createNewMessage", createNewMessage);
router.get("/getAllMessages/:id", getAllMessages);

export default router;