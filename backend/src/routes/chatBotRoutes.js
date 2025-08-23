import express from 'express';
import { handleChatRequest } from '../controllers/chatBotController.js';

const router = express.Router();

router.post('/', handleChatRequest);

export default router;
