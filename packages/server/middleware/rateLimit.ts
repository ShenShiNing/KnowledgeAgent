import type { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from '../utils/errorResponse';

// ============================================================================
// Types
// ============================================================================

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitStore {
  [key: string]: RateLimitEntry;
}

// ============================================================================
// Rate Limiter Options
// ============================================================================

interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  keyGenerator?: (req: Request) => string;
  message?: string;
}

// ============================================================================
// In-Memory Rate Limiter
// ============================================================================

/**
 * Create an in-memory rate limiter
 * Note: For production with multiple server instances, use Redis-based rate limiter
 */
export function createRateLimiter(options: RateLimitOptions) {
  // Skip rate limiting in test environment or when explicitly disabled
  if (
    process.env.NODE_ENV === 'test' ||
    process.env.DISABLE_RATE_LIMIT === 'true'
  ) {
    return (_req: Request, _res: Response, next: NextFunction): void => {
      next();
    };
  }

  const store: RateLimitStore = {};

  const defaultKeyGenerator = (req: Request): string => {
    // Use IP address as the key
    const forwarded = req.headers['x-forwarded-for'];
    const ip = Array.isArray(forwarded)
      ? forwarded[0]
      : forwarded?.split(',')[0];
    return (ip as string) || req.socket.remoteAddress || 'unknown';
  };

  const keyGenerator = options.keyGenerator || defaultKeyGenerator;
  const message =
    options.message || 'Too many requests, please try again later';

  // Cleanup expired entries periodically
  setInterval(() => {
    const now = Date.now();
    for (const key in store) {
      const entry = store[key];
      if (entry && entry.resetAt < now) {
        delete store[key];
      }
    }
  }, options.windowMs);

  return function rateLimitMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const key = keyGenerator(req);
    const now = Date.now();

    const entry = store[key];

    if (!entry || entry.resetAt < now) {
      // New window
      store[key] = {
        count: 1,
        resetAt: now + options.windowMs,
      };
      next();
      return;
    }

    if (entry.count >= options.maxRequests) {
      sendErrorResponse(res, 429, message);
      res.setHeader(
        'Retry-After',
        Math.ceil((entry.resetAt - now) / 1000).toString()
      );
      return;
    }

    entry.count++;
    next();
  };
}

// ============================================================================
// Pre-configured Rate Limiters
// ============================================================================

/**
 * Strict rate limiter for sensitive endpoints like refresh tokens
 * 10 requests per 5 minutes per IP
 */
export const strictRateLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes
  maxRequests: 10,
  message: 'Too many refresh attempts, please try again later',
});

/**
 * Moderate rate limiter for auth endpoints like login
 * 20 requests per 15 minutes per IP
 */
export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 20,
  message: 'Too many login attempts, please try again later',
});

/**
 * General rate limiter for API endpoints
 * 100 requests per 15 minutes per IP
 */
export const generalRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
  message: 'Too many requests, please try again later',
});
