import {
  mysqlTable,
  varchar,
  mysqlEnum,
  timestamp,
  index,
  uniqueIndex,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { users } from '../common/users';
import { knowledgeBases } from './knowledge-bases';

// ============================================================================
// Knowledge Base Permissions Table - For sharing and access control
// ============================================================================

export const knowledgeBasePermissions = mysqlTable(
  'knowledge_base_permissions',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Foreign keys
    knowledgeBaseId: varchar('knowledge_base_id', { length: 36 }).notNull(),
    userId: varchar('user_id', { length: 36 }).notNull(),

    // Permission level
    permission: mysqlEnum('permission', ['read', 'write', 'admin']).notNull(),

    // Sharing metadata
    sharedBy: varchar('shared_by', { length: 36 }).notNull(),
    expiresAt: timestamp('expires_at'), // Optional expiry for shared access

    // Audit fields
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    deletedBy: varchar('deleted_by', { length: 36 }),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('knowledge_base_id_idx').on(table.knowledgeBaseId),
    index('user_id_idx').on(table.userId),
    index('deleted_at_idx').on(table.deletedAt),
    uniqueIndex('kb_user_deleted_idx').on(
      table.knowledgeBaseId,
      table.userId,
      table.deletedAt
    ),
  ]
);

// Relations
export const knowledgeBasePermissionsRelations = relations(
  knowledgeBasePermissions,
  ({ one }) => ({
    knowledgeBase: one(knowledgeBases, {
      fields: [knowledgeBasePermissions.knowledgeBaseId],
      references: [knowledgeBases.id],
    }),
    user: one(users, {
      fields: [knowledgeBasePermissions.userId],
      references: [users.id],
    }),
    sharedByUser: one(users, {
      fields: [knowledgeBasePermissions.sharedBy],
      references: [users.id],
    }),
  })
);

// TypeScript types
export type KnowledgeBasePermission =
  typeof knowledgeBasePermissions.$inferSelect;
export type NewKnowledgeBasePermission =
  typeof knowledgeBasePermissions.$inferInsert;
