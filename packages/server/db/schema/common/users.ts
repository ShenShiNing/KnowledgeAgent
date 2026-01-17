import {
  mysqlTable,
  varchar,
  timestamp,
  mysqlEnum,
  boolean,
  index,
  uniqueIndex,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { knowledgeBases } from '../knowledge/knowledge-bases';
import { knowledgeBasePermissions } from '../knowledge/knowledge-base-permissions';
import { documents } from '../document/documents';
import { tags } from './tags';
import { conversations } from '../chat/conversations';
import { messages } from '../chat/messages';
import { userModelConfigs } from './user-model-configs';
import { aiUsageStats } from '../ai/ai-usage-stats';
import { userRoles } from '../auth/user-roles';

// ============================================================================
// Users Table
// ============================================================================

export const users = mysqlTable(
  'users',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Auth info
    username: varchar('username', { length: 50 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),

    // User status
    status: mysqlEnum('status', ['active', 'inactive', 'banned'])
      .notNull()
      .default('inactive'),

    // Email verification
    emailVerified: boolean('email_verified').notNull().default(false),
    emailVerifiedAt: timestamp('email_verified_at'),

    // Login tracking
    lastLoginAt: timestamp('last_login_at'),

    // Audit fields
    createdBy: varchar('created_by', { length: 36 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedBy: varchar('updated_by', { length: 36 }),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    deletedBy: varchar('deleted_by', { length: 36 }),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('status_idx').on(table.status),
    index('deleted_at_idx').on(table.deletedAt),
    uniqueIndex('username_deleted_idx').on(table.username, table.deletedAt),
    uniqueIndex('email_deleted_idx').on(table.email, table.deletedAt),
  ]
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  createdKnowledgeBases: many(knowledgeBases),
  createdDocuments: many(documents),
  createdTags: many(tags),
  createdConversations: many(conversations),
  createdMessages: many(messages),
  modelConfigs: many(userModelConfigs),
  sharedKnowledgeBasePermissions: many(knowledgeBasePermissions),
  aiUsageStats: many(aiUsageStats),
  roles: many(userRoles),
}));

// TypeScript types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
