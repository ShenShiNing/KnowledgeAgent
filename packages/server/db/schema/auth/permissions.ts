import {
  mysqlTable,
  varchar,
  text,
  mysqlEnum,
  timestamp,
  index,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { rolePermissions } from './role-permissions';

// ============================================================================
// Permissions Table - RBAC permission definitions
// ============================================================================

export const permissions = mysqlTable(
  'permissions',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Permission info
    code: varchar('code', { length: 100 }).notNull().unique(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),

    // Permission category
    category: mysqlEnum('category', [
      'document',
      'knowledge_base',
      'chat',
      'user',
      'system',
      'ai',
    ]).notNull(),

    // Permission type
    permissionType: mysqlEnum('permission_type', [
      'read',
      'write',
      'delete',
      'manage',
    ]).notNull(),

    // Resource pattern (e.g., 'documents:*', 'knowledge_bases:read')
    resource: varchar('resource', { length: 100 }).notNull(),

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
    index('category_idx').on(table.category),
    index('permission_type_idx').on(table.permissionType),
    index('resource_idx').on(table.resource),
    index('status_idx').on(table.status),
    index('deleted_at_idx').on(table.deletedAt),
  ]
);

// Relations
export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

// TypeScript types
export type Permission = typeof permissions.$inferSelect;
export type NewPermission = typeof permissions.$inferInsert;
