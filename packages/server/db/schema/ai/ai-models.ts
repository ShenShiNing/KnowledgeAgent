import {
  mysqlTable,
  varchar,
  text,
  mysqlEnum,
  boolean,
  int,
  timestamp,
  index,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { aiProviders } from './ai-providers';
import { userModelConfigs } from '../common/user-model-configs';
import { aiUsageStats } from './ai-usage-stats';

// ============================================================================
// AI Models Table (gpt-4, claude-3-opus, etc.)
// ============================================================================

export const aiModels = mysqlTable(
  'ai_models',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Foreign key to provider
    providerId: varchar('provider_id', { length: 36 }).notNull(),

    // Model info
    modelId: varchar('model_id', { length: 100 }).notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),

    // Model type
    modelType: mysqlEnum('model_type', ['chat', 'completion', 'embedding'])
      .notNull()
      .default('chat'),

    // Capabilities
    supportsRAG: boolean('supports_rag').notNull().default(true),
    supportsTools: boolean('supports_tools').notNull().default(false),
    supportsImages: boolean('supports_images').notNull().default(false),

    // Limits
    maxTokens: int('max_tokens').notNull().default(4096),
    contextWindow: int('context_window').notNull().default(4096),

    // Pricing (per 1K tokens, in USD cents)
    inputPrice: int('input_price').notNull().default(0),
    outputPrice: int('output_price').notNull().default(0),

    // Status
    status: mysqlEnum('status', ['active', 'inactive', 'beta'])
      .notNull()
      .default('active'),

    // Audit fields
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
  },
  (table) => [
    index('provider_id_idx').on(table.providerId),
    index('model_type_idx').on(table.modelType),
    index('status_idx').on(table.status),
  ]
);

// Relations
export const aiModelsRelations = relations(aiModels, ({ one, many }) => ({
  provider: one(aiProviders, {
    fields: [aiModels.providerId],
    references: [aiProviders.id],
  }),
  userConfigs: many(userModelConfigs),
  usageStats: many(aiUsageStats),
}));

// TypeScript types
export type AiModel = typeof aiModels.$inferSelect;
export type NewAiModel = typeof aiModels.$inferInsert;
