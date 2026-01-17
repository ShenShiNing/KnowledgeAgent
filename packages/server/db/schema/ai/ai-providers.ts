import {
  mysqlTable,
  varchar,
  text,
  mysqlEnum,
  index,
  timestamp,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { aiModels } from './ai-models';

// ============================================================================
// AI Providers Table (OpenAI, Anthropic, etc.)
// ============================================================================

export const aiProviders = mysqlTable(
  'ai_providers',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Provider info
    code: varchar('code', { length: 50 }).notNull().unique(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),
    logoUrl: varchar('logo_url', { length: 500 }),

    // API config
    baseUrl: varchar('base_url', { length: 500 }),
    defaultModel: varchar('default_model', { length: 100 }),

    // Status
    status: mysqlEnum('status', ['active', 'inactive', 'deprecated'])
      .notNull()
      .default('active'),

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
  ]
);

// Relations
export const aiProvidersRelations = relations(aiProviders, ({ many }) => ({
  models: many(aiModels),
}));

// TypeScript types
export type AiProvider = typeof aiProviders.$inferSelect;
export type NewAiProvider = typeof aiProviders.$inferInsert;
