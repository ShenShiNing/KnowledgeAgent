import {
  mysqlTable,
  varchar,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { documents } from './documents';
import { tags } from '../common/tags';

// ============================================================================
// Document Tags Relation Table (Many-to-Many)
// ============================================================================

export const documentTags = mysqlTable(
  'document_tags',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Foreign keys
    documentId: varchar('document_id', { length: 36 }).notNull(),
    tagId: varchar('tag_id', { length: 36 }).notNull(),

    // Audit fields
    createdBy: varchar('created_by', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [uniqueIndex('document_tag_idx').on(table.documentId, table.tagId)]
);

// Relations
export const documentTagsRelations = relations(documentTags, ({ one }) => ({
  document: one(documents, {
    fields: [documentTags.documentId],
    references: [documents.id],
  }),
  tag: one(tags, {
    fields: [documentTags.tagId],
    references: [tags.id],
  }),
}));

// TypeScript types
export type DocumentTag = typeof documentTags.$inferSelect;
export type NewDocumentTag = typeof documentTags.$inferInsert;
