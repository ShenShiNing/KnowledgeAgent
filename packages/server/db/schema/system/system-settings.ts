import {
  mysqlTable,
  varchar,
  text,
  mysqlEnum,
  json,
  timestamp,
  index,
} from 'drizzle-orm/mysql-core';

// ============================================================================
// System Settings Table - Global application configuration
// ============================================================================

export const systemSettings = mysqlTable(
  'system_settings',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Setting key (unique)
    key: varchar('key', { length: 100 }).notNull().unique(),

    // Setting info
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),

    // Setting value (stored as JSON for flexibility)
    value: json('value'),

    // Setting type
    valueType: mysqlEnum('value_type', [
      'string',
      'number',
      'boolean',
      'json',
      'array',
    ]).notNull(),

    // Category for grouping
    category: mysqlEnum('category', [
      'general',
      'upload',
      'ai',
      'security',
      'limits',
      'ui',
    ]).notNull(),

    // Is this a system-critical setting (cannot be deleted by users)
    isSystem: varchar('is_system', { length: 1 }).notNull().default('1'), // '1' or '0'

    // Is this setting public (can be read by non-admins)
    isPublic: varchar('is_public', { length: 1 }).notNull().default('0'),

    // Validation rules (JSON schema or simple constraints)
    validationRules: json('validation_rules'),

    // Audit fields
    createdBy: varchar('created_by', { length: 36 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedBy: varchar('updated_by', { length: 36 }),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    deletedBy: varchar('deleted_by', { length: 36 }),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('category_idx').on(table.category),
    index('is_system_idx').on(table.isSystem),
    index('is_public_idx').on(table.isPublic),
    index('deleted_at_idx').on(table.deletedAt),
  ]
);

// TypeScript types
export type SystemSetting = typeof systemSettings.$inferSelect;
export type NewSystemSetting = typeof systemSettings.$inferInsert;
