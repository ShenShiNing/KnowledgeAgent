import {
  mysqlTable,
  varchar,
  text,
  mysqlEnum,
  timestamp,
  index,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { userRoles } from './user-roles';
import { rolePermissions } from './role-permissions';

// ============================================================================
// Roles Table - RBAC role definitions
// ============================================================================

export const roles = mysqlTable(
  'roles',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Role info
    code: varchar('code', { length: 50 }).notNull().unique(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),

    // Role type
    roleType: mysqlEnum('role_type', ['system', 'custom'])
      .notNull()
      .default('custom'),

    // Hierarchy level (lower = higher priority)
    level: mysqlEnum('level', ['admin', 'moderator', 'user', 'guest'])
      .notNull()
      .default('user'),

    // Status
    status: mysqlEnum('status', ['active', 'inactive'])
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
    index('role_type_idx').on(table.roleType),
    index('level_idx').on(table.level),
    index('status_idx').on(table.status),
    index('deleted_at_idx').on(table.deletedAt),
  ]
);

// Relations
export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
  rolePermissions: many(rolePermissions),
}));

// TypeScript types
export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;
