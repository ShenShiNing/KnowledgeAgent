import {
  mysqlTable,
  varchar,
  int,
  text,
  json,
  timestamp,
  index,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { documents } from './documents';

// ============================================================================
// Document Chunks Table (for RAG/Vector Search)
// ============================================================================

export const documentChunks = mysqlTable(
  'document_chunks',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Foreign key to document
    documentId: varchar('document_id', { length: 36 }).notNull(),

    // Chunk info
    chunkIndex: int('chunk_index').notNull(),
    content: text('content').notNull(),

    // Vector embedding (stored as JSON array of floats)
    embedding: json('embedding'),

    // Audit fields
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
  },
  (table) => [index('document_id_idx').on(table.documentId)]
);

// Relations
export const documentChunksRelations = relations(documentChunks, ({ one }) => ({
  document: one(documents, {
    fields: [documentChunks.documentId],
    references: [documents.id],
  }),
}));

// TypeScript types
export type DocumentChunk = typeof documentChunks.$inferSelect;
export type NewDocumentChunk = typeof documentChunks.$inferInsert;
