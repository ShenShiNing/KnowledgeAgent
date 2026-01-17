import {
  mysqlTable,
  varchar,
  int,
  mysqlEnum,
  timestamp,
  index,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { users } from '../common/users';
import { aiModels } from './ai-models';
import { conversations } from '../chat/conversations';

// ============================================================================
// AI Usage Stats Table - Track AI API usage and costs
// ============================================================================

export const aiUsageStats = mysqlTable(
  'ai_usage_stats',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Foreign keys
    userId: varchar('user_id', { length: 36 }).notNull(),
    modelId: varchar('model_id', { length: 36 }).notNull(),
    conversationId: varchar('conversation_id', { length: 36 }),

    // Request type
    requestType: mysqlEnum('request_type', [
      'chat',
      'completion',
      'embedding',
    ]).notNull(),

    // Token usage
    promptTokens: int('prompt_tokens').notNull().default(0),
    completionTokens: int('completion_tokens').notNull().default(0),
    totalTokens: int('total_tokens').notNull().default(0),

    // Cost (in cents, USD)
    estimatedCost: int('estimated_cost').notNull().default(0),

    // Response time tracking (in milliseconds)
    responseTime: int('response_time'),

    // Status
    status: mysqlEnum('status', ['success', 'failed', 'partial'])
      .notNull()
      .default('success'),

    // Error info (if failed)
    errorCode: varchar('error_code', { length: 50 }),
    errorMessage: varchar('error_message', { length: 500 }),

    // Audit fields
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('user_id_idx').on(table.userId),
    index('model_id_idx').on(table.modelId),
    index('conversation_id_idx').on(table.conversationId),
    index('request_type_idx').on(table.requestType),
    index('created_at_idx').on(table.createdAt),
  ]
);

// Relations
export const aiUsageStatsRelations = relations(aiUsageStats, ({ one }) => ({
  user: one(users, {
    fields: [aiUsageStats.userId],
    references: [users.id],
  }),
  model: one(aiModels, {
    fields: [aiUsageStats.modelId],
    references: [aiModels.id],
  }),
  conversation: one(conversations, {
    fields: [aiUsageStats.conversationId],
    references: [conversations.id],
  }),
}));

// TypeScript types
export type AiUsageStats = typeof aiUsageStats.$inferSelect;
export type NewAiUsageStats = typeof aiUsageStats.$inferInsert;
