import {
  mysqlTable,
  varchar,
  text,
  mysqlEnum,
  json,
  timestamp,
  index,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { conversations } from './conversations';
import { users } from '../common/users';

// ============================================================================
// Messages Table
// ============================================================================

export const messages = mysqlTable(
  'messages',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Foreign key to conversation
    conversationId: varchar('conversation_id', { length: 36 }).notNull(),

    // Message info
    role: mysqlEnum('role', ['user', 'assistant', 'system']).notNull(),
    content: text('content').notNull(),

    // RAG context (optional: store source documents used)
    sources: json('sources'),

    // Audit fields
    createdBy: varchar('created_by', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedBy: varchar('updated_by', { length: 36 }),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    deletedBy: varchar('deleted_by', { length: 36 }),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('conversation_id_idx').on(table.conversationId),
    index('created_at_idx').on(table.createdAt),
    index('deleted_at_idx').on(table.deletedAt),
  ]
);

// Relations
export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  creator: one(users, {
    fields: [messages.createdBy],
    references: [users.id],
  }),
}));

// TypeScript types
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
