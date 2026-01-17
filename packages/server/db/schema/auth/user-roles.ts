import { mysqlTable, varchar, timestamp, index } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

import { users } from '../common/users';
import { roles } from './roles';

// ============================================================================
// User Roles Relation Table (Many-to-Many)
// ============================================================================

export const userRoles = mysqlTable(
  'user_roles',
  {
    // Primary key
    id: varchar('id', { length: 36 }).primaryKey(),

    // Foreign keys
    userId: varchar('user_id', { length: 36 }).notNull(),
    roleId: varchar('role_id', { length: 36 }).notNull(),

    // Assigned by
    assignedBy: varchar('assigned_by', { length: 36 }).notNull(),

    // Audit fields
    assignedAt: timestamp('assigned_at').defaultNow().notNull(),
    expiresAt: timestamp('expires_at'), // Optional expiry
  },
  (table) => [
    index('user_id_idx').on(table.userId),
    index('role_id_idx').on(table.roleId),
  ]
);

// Relations
export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
  assignedByUser: one(users, {
    fields: [userRoles.assignedBy],
    references: [users.id],
  }),
}));

// TypeScript types
export type UserRole = typeof userRoles.$inferSelect;
export type NewUserRole = typeof userRoles.$inferInsert;
