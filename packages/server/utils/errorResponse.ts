import type { Response } from 'express';
import { z } from 'zod';

// ============================================================================
// Error Response Types
// ============================================================================

export interface ErrorResponse {
  error: string;
  details?: Record<string, string> | string[];
}

export interface ValidationErrorResponse {
  error: string;
  details?: ReturnType<typeof z.treeifyError<z.ZodType>>;
}

// ============================================================================
// HTTP Status Codes
// ============================================================================

export const HttpStatus = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// ============================================================================
// Error Response Functions
// ============================================================================

/**
 * Send a standardized error response
 */
export function sendErrorResponse(
  res: Response,
  status: number,
  message: string
): Response {
  return res.status(status).json({ error: message } as ErrorResponse);
}

/**
 * Send a bad request error
 */
export function sendBadRequest(res: Response, message: string): Response {
  return sendErrorResponse(res, HttpStatus.BAD_REQUEST, message);
}

/**
 * Send an unauthorized error
 */
export function sendUnauthorized(
  res: Response,
  message: string = 'Unauthorized'
): Response {
  return sendErrorResponse(res, HttpStatus.UNAUTHORIZED, message);
}

/**
 * Send a forbidden error
 */
export function sendForbidden(
  res: Response,
  message: string = 'Forbidden'
): Response {
  return sendErrorResponse(res, HttpStatus.FORBIDDEN, message);
}

/**
 * Send a not found error
 */
export function sendNotFound(
  res: Response,
  message: string = 'Resource not found'
): Response {
  return sendErrorResponse(res, HttpStatus.NOT_FOUND, message);
}

/**
 * Send a conflict error
 */
export function sendConflict(res: Response, message: string): Response {
  return sendErrorResponse(res, HttpStatus.CONFLICT, message);
}

/**
 * Send an internal server error
 */
export function sendInternalServerError(
  res: Response,
  message: string = 'Internal server error'
): Response {
  return sendErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, message);
}

/**
 * Send a validation error from Zod
 */
export function sendValidationError(
  res: Response,
  error: z.ZodError
): Response {
  return res.status(HttpStatus.BAD_REQUEST).json({
    error: 'Validation error',
    details: z.treeifyError(error),
  } as ValidationErrorResponse);
}

/**
 * Convert Zod error to flat error object
 * Useful for form validation
 */
export function flattenZodError(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};

  const tree = z.treeifyError(error);

  function traverse(obj: unknown, prefix = ''): void {
    if (typeof obj !== 'object' || obj === null) return;

    for (const [key, value] of Object.entries(obj)) {
      const fullPath = prefix ? `${prefix}.${key}` : key;

      if (key === '_errors' && Array.isArray(value) && value.length > 0) {
        result[prefix] = value[0] as string;
      } else if (typeof value === 'object' && value !== null) {
        traverse(value, fullPath);
      }
    }
  }

  traverse(tree);
  return result;
}

/**
 * Handle async errors in controller functions
 * Wraps async functions with try-catch and error response handling
 */
export function asyncHandler(
  fn: (req: any, res: any, next?: any) => Promise<any>
) {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.error('Unhandled error:', error);

      if (error instanceof Error) {
        sendInternalServerError(res, error.message);
      } else {
        sendInternalServerError(res);
      }

      if (next) next();
    });
  };
}
