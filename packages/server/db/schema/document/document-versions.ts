import {
  mysqlTable,
  varchar,
  text,
  int,
  timestamp,
  index,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { documents } from './documents';

// ============================================================================
// Document Versions Table - For version history and rollback
// ============================================================================

export const documentVersions = mysqlTable(
  'document_versions',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Foreign key to document
    documentId: varchar('document_id', { length: 36 }).notNull(),

    // Version info
    versionNumber: int('version_number').notNull(),

    // Snapshot data
    name: varchar('name', { length: 255 }).notNull(),
    contentHash: varchar('content_hash', { length: 64 }).notNull(), // SHA-256 hash

    // Storage info (point to versioned file)
    storagePath: varchar('storage_path', { length: 500 }).notNull(),
    fileSize: int('file_size').notNull(),

    // Metadata
    changeReason: varchar('change_reason', { length: 500 }),
    chunkCount: int('chunk_count').notNull().default(0),

    // Audit fields
    createdBy: varchar('created_by', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('document_id_idx').on(table.documentId),
    index('version_number_idx').on(table.versionNumber),
    index('created_at_idx').on(table.createdAt),
  ]
);

// Relations
export const documentVersionsRelations = relations(
  documentVersions,
  ({ one }) => ({
    document: one(documents, {
      fields: [documentVersions.documentId],
      references: [documents.id],
    }),
  })
);

// TypeScript types
export type DocumentVersion = typeof documentVersions.$inferSelect;
export type NewDocumentVersion = typeof documentVersions.$inferInsert;
