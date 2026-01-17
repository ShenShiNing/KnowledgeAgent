import {
  mysqlTable,
  varchar,
  timestamp,
  index,
  uniqueIndex,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { users } from './users';
import { documentTags } from '../document/document-tags';

// ============================================================================
// Tags Table
// ============================================================================

export const tags = mysqlTable(
  'tags',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Tag info
    name: varchar('name', { length: 50 }).notNull(),
    color: varchar('color', { length: 7 }),

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
    uniqueIndex('name_created_by_deleted_idx').on(
      table.name,
      table.createdBy,
      table.deletedAt
    ),
  ]
);

// Relations
export const tagsRelations = relations(tags, ({ one, many }) => ({
  creator: one(users, {
    fields: [tags.createdBy],
    references: [users.id],
  }),
  documents: many(documentTags),
}));

// TypeScript types
export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;
