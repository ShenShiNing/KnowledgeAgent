import {
  mysqlTable,
  varchar,
  timestamp,
  boolean,
  index,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { users } from '../common/users';

// ============================================================================
// Refresh Tokens Table - JWT refresh token storage
// ============================================================================

export const refreshTokens = mysqlTable(
  'refresh_tokens',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // User reference
    userId: varchar('user_id', { length: 36 }).notNull(),

    // Token hash (for security verification)
    tokenHash: varchar('token_hash', { length: 255 }).notNull(),

    // Token expiry
    expiresAt: timestamp('expires_at').notNull(),

    // Token status
    revoked: boolean('revoked').notNull().default(false),
    revokedAt: timestamp('revoked_at'),
    replacedByToken: varchar('replaced_by_token', { length: 36 }),

    // Client info (optional: for tracking)
    userAgent: varchar('user_agent', { length: 500 }),
    ipAddress: varchar('ip_address', { length: 45 }),

    // Audit fields
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('user_id_idx').on(table.userId),
    index('token_hash_idx').on(table.tokenHash),
    index('expires_at_idx').on(table.expiresAt),
  ]
);

// Relations
export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, {
    fields: [refreshTokens.userId],
    references: [users.id],
  }),
}));

// TypeScript types
export type RefreshToken = typeof refreshTokens.$inferSelect;
export type NewRefreshToken = typeof refreshTokens.$inferInsert;
