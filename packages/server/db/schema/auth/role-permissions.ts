import {
  mysqlTable,
  varchar,
  timestamp,
  index,
  uniqueIndex,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { roles } from './roles';
import { permissions } from './permissions';

// ============================================================================
// Role Permissions Relation Table (Many-to-Many)
// ============================================================================

export const rolePermissions = mysqlTable(
  'role_permissions',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Foreign keys
    roleId: varchar('role_id', { length: 36 }).notNull(),
    permissionId: varchar('permission_id', { length: 36 }).notNull(),

    // Audit fields
    createdBy: varchar('created_by', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('role_id_idx').on(table.roleId),
    index('permission_id_idx').on(table.permissionId),
    uniqueIndex('role_permission_idx').on(table.roleId, table.permissionId),
  ]
);

// Relations
export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
  })
);

// TypeScript types
export type RolePermission = typeof rolePermissions.$inferSelect;
export type NewRolePermission = typeof rolePermissions.$inferInsert;
