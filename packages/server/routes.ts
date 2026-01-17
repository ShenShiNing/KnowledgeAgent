import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controller/chat.ts';
import { dbTestController } from './controller/dbTest.ts';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

router.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

router.post('/api/chat', chatController.sendMessage);

// Database test routes
router.get('/api/db/test', dbTestController.getDatabaseInfo);
router.get('/api/db/test/user/:userId', dbTestController.getUserDetail);
router.get(
  '/api/db/test/conversation/:conversationId',
  dbTestController.getConversationDetail
);

export default router;
