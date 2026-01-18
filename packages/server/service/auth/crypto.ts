import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { authConfig } from '../../config';
import type { JWTPayload } from '../../types';
import type { SignOptions } from 'jsonwebtoken';

/**
 * Crypto utilities for authentication
 * All functions are pure and stateless
 */

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, authConfig.bcryptSaltRounds);
}

/**
 * Verify a password against its hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Generate JWT access token
 */
export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, authConfig.jwtSecret, {
    issuer: authConfig.jwtIssuer,
    expiresIn: authConfig.jwtAccessExpiry,
    jwtid: crypto.randomUUID(), // Unique ID for each token
  } as SignOptions);
}

/**
 * Generate refresh token (random string)
 */
export function generateRefreshToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Hash refresh token for secure storage
 */
export function hashRefreshToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Generate UUID
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Calculate refresh token expiry date
 */
export function getRefreshTokenExpiry(): Date {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + authConfig.jwtRefreshExpiryDays);
  return expiresAt;
}
