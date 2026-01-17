import {
  mysqlTable,
  varchar,
  int,
  mysqlEnum,
  boolean,
  index,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { users } from './users';
import { aiModels } from '../ai/ai-models';

// ============================================================================
// User Model Configs Table (User's API keys and preferences)
// ============================================================================

export const userModelConfigs = mysqlTable(
  'user_model_configs',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Foreign keys
    userId: varchar('user_id', { length: 36 }).notNull(),
    modelId: varchar('model_id', { length: 36 }).notNull(),

    // API config (encrypted)
    apiKey: varchar('api_key', { length: 500 }),
    apiEndpoint: varchar('api_endpoint', { length: 500 }),

    // Model parameters
    temperature: int('temperature').notNull().default(70), // 0-100, stored as int
    maxTokens: int('max_tokens'),
    topP: int('top_p').notNull().default(100), // 0-100, stored as int
    topK: int('top_k'), // for some models
    frequencyPenalty: int('frequency_penalty').notNull().default(0), // -100 to 100
    presencePenalty: int('presence_penalty').notNull().default(0), // -100 to 100

    // User preference
    priority: int('priority').notNull().default(0), // Higher = preferred
    isDefault: boolean('is_default').notNull().default(false),

    // Usage limits
    dailyLimit: int('daily_limit'),
    monthlyLimit: int('monthly_limit'),

    // Status
    status: mysqlEnum('status', ['active', 'inactive'])
      .notNull()
      .default('active'),

    // Audit fields
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    deletedBy: varchar('deleted_by', { length: 36 }),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('user_id_idx').on(table.userId),
    index('model_id_idx').on(table.modelId),
    index('status_idx').on(table.status),
    index('deleted_at_idx').on(table.deletedAt),
    uniqueIndex('user_model_deleted_idx').on(
      table.userId,
      table.modelId,
      table.deletedAt
    ),
  ]
);

// Relations
export const userModelConfigsRelations = relations(
  userModelConfigs,
  ({ one }) => ({
    user: one(users, {
      fields: [userModelConfigs.userId],
      references: [users.id],
    }),
    model: one(aiModels, {
      fields: [userModelConfigs.modelId],
      references: [aiModels.id],
    }),
  })
);

// TypeScript types
export type UserModelConfig = typeof userModelConfigs.$inferSelect;
export type NewUserModelConfig = typeof userModelConfigs.$inferInsert;
