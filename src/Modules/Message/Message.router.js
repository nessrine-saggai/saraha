import { Router } from 'express';
import * as MessageController from './controller/Message.controller.js';
import { auth } from '../../Middleware/auth.middleware.js';
const router = Router();

router.post('/:receiverId', MessageController.sendMessage);
router.get('/', auth, MessageController.getMessages);
router.delete('/:messageId', auth, MessageController.deleteMessage);

export default router;