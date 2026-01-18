import express from 'express';
import type { Request, Response } from 'express';
import { authController } from './controller/auth/index.ts';
import { authMiddleware } from './middleware/auth';
import { authRateLimiter, strictRateLimiter } from './middleware/rateLimit';

const router = express.Router();

// Health check
router.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

router.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

// Auth routes with rate limiting
router.post('/api/auth/register', authRateLimiter, authController.register);
router.post('/api/auth/login', authRateLimiter, authController.login);
router.post('/api/auth/refresh', strictRateLimiter, authController.refresh);

// Protected auth routes
router.post('/api/auth/logout', authMiddleware, authController.logout);
router.post('/api/auth/logout-all', authMiddleware, authController.logoutAll);
router.get('/api/auth/me', authMiddleware, authController.me);

export default router;
