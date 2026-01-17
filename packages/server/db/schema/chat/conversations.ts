import { mysqlTable, varchar, timestamp, index } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { users } from '../common/users';
import { knowledgeBases } from '../knowledge/knowledge-bases';
import { messages } from './messages';

// ============================================================================
// Conversations Table
// ============================================================================

export const conversations = mysqlTable(
  'conversations',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Basic info
    title: varchar('title', { length: 255 }),
    knowledgeBaseId: varchar('knowledge_base_id', { length: 36 }),

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
    index('knowledge_base_id_idx').on(table.knowledgeBaseId),
    index('deleted_at_idx').on(table.deletedAt),
  ]
);

// Relations
export const conversationsRelations = relations(
  conversations,
  ({ one, many }) => ({
    creator: one(users, {
      fields: [conversations.createdBy],
      references: [users.id],
    }),
    knowledgeBase: one(knowledgeBases, {
      fields: [conversations.knowledgeBaseId],
      references: [knowledgeBases.id],
    }),
    messages: many(messages),
  })
);

// TypeScript types
export type Conversation = typeof conversations.$inferSelect;
export type NewConversation = typeof conversations.$inferInsert;
