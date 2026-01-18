import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import z from 'zod';
import { db } from '../db/index.ts';
import { users } from '../db/schema/common/users';
import { eq, and, isNull } from 'drizzle-orm';
import {
  sendUnauthorized,
  sendForbidden,
  sendInternalServerError,
} from '../utils/errorResponse';
import type { UserStatus, AuthUser } from '../types';
import { authConfig } from '../config';

// ============================================================================
// Types
// ============================================================================

export interface AuthRequest extends Request {
  user?: AuthUser;
}

// Zod schema for JWT payload validation
const jwtPayloadSchema = z.object({
  userId: z.string(),
  username: z.string(),
  email: z.string().email(),
  iat: z.number().optional(),
  exp: z.number().optional(),
});

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}

// ============================================================================
// Auth Middleware
// ============================================================================

/**
 * Verify JWT token and attach user to request
 */
export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      sendUnauthorized(res, 'No token provided');
      return;
    }

    const token = authHeader.substring(7);

    // Verify token with issuer validation
    const decoded = jwt.verify(token, authConfig.jwtSecret, {
      issuer: authConfig.jwtIssuer,
    });
    const parsedPayload = jwtPayloadSchema.safeParse(decoded);

    if (!parsedPayload.success) {
      sendUnauthorized(res, 'Invalid token payload');
      return;
    }

    const jwtPayload = parsedPayload.data;

    // Fetch user from database
    const userResult = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        status: users.status,
      })
      .from(users)
      .where(and(eq(users.id, jwtPayload.userId), isNull(users.deletedAt)))
      .limit(1);

    const user = userResult[0];
    if (!user) {
      sendUnauthorized(res, 'User not found');
      return;
    }

    // Check if user is active
    if (user.status !== 'active') {
      sendForbidden(res, 'User account is not active');
      return;
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      sendUnauthorized(res, 'Token expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      sendUnauthorized(res, 'Invalid token');
    } else {
      console.error('Auth middleware error:', error);
      sendInternalServerError(res, 'Authentication failed');
    }
  }
}

/**
 * Optional auth - attaches user if token is valid, but doesn't fail if not
 */
export async function optionalAuthMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      next();
      return;
    }

    const token = authHeader.substring(7);

    // Verify token with issuer validation
    const decoded = jwt.verify(token, authConfig.jwtSecret, {
      issuer: authConfig.jwtIssuer,
    });
    const parsedPayload = jwtPayloadSchema.safeParse(decoded);

    if (!parsedPayload.success) {
      // Silently skip for optional auth
      next();
      return;
    }

    const jwtPayload = parsedPayload.data;

    // Fetch user from database
    const userResult = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        status: users.status,
      })
      .from(users)
      .where(and(eq(users.id, jwtPayload.userId), isNull(users.deletedAt)))
      .limit(1);

    if (userResult.length > 0 && userResult[0]?.status === 'active') {
      req.user = userResult[0];
    }

    next();
  } catch {
    // Silently fail for optional auth
    next();
  }
}
