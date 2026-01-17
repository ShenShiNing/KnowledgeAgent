import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  index,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { users } from '../common/users';
import { documents } from '../document/documents';
import { conversations } from '../chat/conversations';
import { knowledgeBasePermissions } from './knowledge-base-permissions';

// ============================================================================
// Knowledge Bases Table
// ============================================================================

export const knowledgeBases = mysqlTable(
  'knowledge_bases',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Basic info
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),

    // Audit fields
    createdBy: varchar('created_by', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedBy: varchar('updated_by', { length: 36 }),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    deletedBy: varchar('deleted_by', { length: 36 }),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('created_by_idx').on(table.createdBy),
    index('deleted_at_idx').on(table.deletedAt),
  ]
);

// Relations
export const knowledgeBasesRelations = relations(
  knowledgeBases,
  ({ one, many }) => ({
    creator: one(users, {
      fields: [knowledgeBases.createdBy],
      references: [users.id],
    }),
    documents: many(documents),
    conversations: many(conversations),
    permissions: many(knowledgeBasePermissions),
  })
);

// TypeScript types
export type KnowledgeBase = typeof knowledgeBases.$inferSelect;
export type NewKnowledgeBase = typeof knowledgeBases.$inferInsert;
