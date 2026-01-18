import type { Request, Response } from 'express';
import z from 'zod';
import { authService } from '../../service/auth/index.ts';
import type { AuthRequest } from '../../middleware/auth';
import {
  sendBadRequest,
  sendUnauthorized,
  sendValidationError,
  sendInternalServerError,
} from '../../utils/errorResponse';

// ============================================================================
// Validation Schemas
// ============================================================================

const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be at most 50 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  email: z
    .email('Invalid email format')
    .trim()
    .min(1, 'Email is required')
    .max(255, 'Email is too long'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long'),
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// ============================================================================
// Auth Controller
// ============================================================================

export const authController = {
  /**
   * Register a new user
   * POST /api/auth/register
   */
  async register(req: Request, res: Response) {
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
      sendValidationError(res, parseResult.error);
      return;
    }

    try {
      const authResponse = await authService.register(parseResult.data);
      res.status(201).json(authResponse);
    } catch (error) {
      if (error instanceof Error) {
        sendBadRequest(res, error.message);
      } else {
        console.error('Register error:', error);
        sendInternalServerError(res, 'Failed to register user');
      }
    }
  },

  /**
   * Login user
   * POST /api/auth/login
   */
  async login(req: Request, res: Response) {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      sendValidationError(res, parseResult.error);
      return;
    }

    try {
      const authResponse = await authService.login(parseResult.data);
      res.json(authResponse);
    } catch (error) {
      if (error instanceof Error) {
        sendUnauthorized(res, error.message);
      } else {
        console.error('Login error:', error);
        sendInternalServerError(res, 'Failed to login');
      }
    }
  },

  /**
   * Refresh access token
   * POST /api/auth/refresh
   */
  async refresh(req: Request, res: Response) {
    const parseResult = refreshTokenSchema.safeParse(req.body);
    if (!parseResult.success) {
      sendValidationError(res, parseResult.error);
      return;
    }

    try {
      const authResponse = await authService.refreshAccessToken(
        parseResult.data
      );
      res.json(authResponse);
    } catch (error) {
      if (error instanceof Error) {
        sendUnauthorized(res, error.message);
      } else {
        console.error('Refresh token error:', error);
        sendInternalServerError(res, 'Failed to refresh token');
      }
    }
  },

  /**
   * Logout user (requires auth)
   * POST /api/auth/logout
   */
  async logout(req: AuthRequest, res: Response) {
    const parseResult = refreshTokenSchema.safeParse(req.body);
    if (!parseResult.success) {
      sendValidationError(res, parseResult.error);
      return;
    }

    try {
      await authService.logout(parseResult.data.refreshToken);
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout error:', error);
      sendInternalServerError(res, 'Failed to logout');
    }
  },

  /**
   * Logout from all devices (requires auth)
   * POST /api/auth/logout-all
   */
  async logoutAll(req: AuthRequest, res: Response) {
    if (!req.user) {
      sendUnauthorized(res, 'Not authenticated');
      return;
    }

    try {
      await authService.logoutAll(req.user.id);
      res.json({ message: 'Logged out from all devices' });
    } catch (error) {
      console.error('Logout all error:', error);
      sendInternalServerError(res, 'Failed to logout from all devices');
    }
  },

  /**
   * Get current user (requires auth)
   * GET /api/auth/me
   */
  async me(req: AuthRequest, res: Response) {
    if (!req.user) {
      sendUnauthorized(res, 'Not authenticated');
      return;
    }

    res.json({ user: req.user });
  },
};
