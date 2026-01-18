import { db } from '../../db/index';
import { refreshTokens } from '../../db/schema/auth/refresh-tokens';
import { eq, and, lt, isNull } from 'drizzle-orm';
import { hashRefreshToken, generateId, getRefreshTokenExpiry } from './crypto';
import type { DbOrTransaction, RefreshTokenRecord } from '../../types';

/**
 * Token persistence operations
 * Handles database interactions for refresh tokens
 */

/**
 * Store a new refresh token in the database
 */
export async function storeRefreshToken(
  userId: string,
  refreshToken: string,
  dbClient: DbOrTransaction = db
): Promise<void> {
  const tokenHash = hashRefreshToken(refreshToken);
  const expiresAt = getRefreshTokenExpiry();

  await dbClient.insert(refreshTokens).values({
    id: generateId(),
    userId,
    tokenHash,
    expiresAt,
  });
}

/**
 * Find and verify a refresh token
 * Returns null if token is invalid or expired
 */
export async function findRefreshToken(
  refreshToken: string
): Promise<RefreshTokenRecord | null> {
  const tokenHash = hashRefreshToken(refreshToken);

  const tokenResult = await db
    .select()
    .from(refreshTokens)
    .where(
      and(
        eq(refreshTokens.tokenHash, tokenHash),
        eq(refreshTokens.revoked, false),
        isNull(refreshTokens.replacedByToken)
      )
    )
    .limit(1);

  const tokenRecord = tokenResult[0];
  if (!tokenRecord) {
    return null;
  }

  // Check if expired
  if (tokenRecord.expiresAt < new Date()) {
    return null;
  }

  return tokenRecord;
}

/**
 * Mark a refresh token as replaced
 */
export async function markTokenAsReplaced(
  tokenId: string,
  newTokenId: string
): Promise<void> {
  await db
    .update(refreshTokens)
    .set({ replacedByToken: newTokenId })
    .where(eq(refreshTokens.id, tokenId));
}

/**
 * Revoke a single refresh token
 */
export async function revokeRefreshToken(refreshToken: string): Promise<void> {
  const tokenHash = hashRefreshToken(refreshToken);

  await db
    .update(refreshTokens)
    .set({
      revoked: true,
      revokedAt: new Date(),
    })
    .where(eq(refreshTokens.tokenHash, tokenHash));
}

/**
 * Revoke all refresh tokens for a user
 */
export async function revokeAllUserTokens(userId: string): Promise<void> {
  await db
    .update(refreshTokens)
    .set({
      revoked: true,
      revokedAt: new Date(),
    })
    .where(eq(refreshTokens.userId, userId));
}

/**
 * Clean up expired and revoked tokens
 */
export async function cleanupExpiredTokens(): Promise<number> {
  const tokensToDelete = await db
    .select({ id: refreshTokens.id })
    .from(refreshTokens)
    .where(
      and(
        lt(refreshTokens.expiresAt, new Date()),
        eq(refreshTokens.revoked, true)
      )
    );

  if (tokensToDelete.length === 0) {
    return 0;
  }

  await db
    .delete(refreshTokens)
    .where(
      and(
        lt(refreshTokens.expiresAt, new Date()),
        eq(refreshTokens.revoked, true)
      )
    );

  return tokensToDelete.length;
}
