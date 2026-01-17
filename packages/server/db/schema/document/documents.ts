import {
  mysqlTable,
  varchar,
  int,
  mysqlEnum,
  timestamp,
  index,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { knowledgeBases } from '../knowledge/knowledge-bases';
import { users } from '../common/users';
import { documentChunks } from './document-chunks';
import { documentTags } from './document-tags';

// ============================================================================
// Documents Table
// ============================================================================

export const documents = mysqlTable(
  'documents',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Foreign key to knowledge base
    knowledgeBaseId: varchar('knowledge_base_id', { length: 36 }).notNull(),

    // File info
    name: varchar('name', { length: 255 }).notNull(),
    fileType: varchar('file_type', { length: 50 }).notNull(),
    fileSize: int('file_size').notNull(),
    storagePath: varchar('storage_path', { length: 500 }).notNull(),

    // Processing status for RAG
    processingStatus: mysqlEnum('processing_status', [
      'pending',
      'processing',
      'completed',
      'failed',
    ])
      .notNull()
      .default('pending'),
    chunkCount: int('chunk_count').notNull().default(0),

    // Audit fields
    createdBy: varchar('created_by', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedBy: varchar('updated_by', { length: 36 }),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    deletedBy: varchar('deleted_by', { length: 36 }),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('knowledge_base_id_idx').on(table.knowledgeBaseId),
    index('processing_status_idx').on(table.processingStatus),
    index('deleted_at_idx').on(table.deletedAt),
  ]
);

// Relations
export const documentsRelations = relations(documents, ({ one, many }) => ({
  knowledgeBase: one(knowledgeBases, {
    fields: [documents.knowledgeBaseId],
    references: [knowledgeBases.id],
  }),
  creator: one(users, {
    fields: [documents.createdBy],
    references: [users.id],
  }),
  chunks: many(documentChunks),
  tags: many(documentTags),
}));

// TypeScript types
export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;
