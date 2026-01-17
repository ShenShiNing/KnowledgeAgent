import { db } from '../db/index.ts';
import { users } from '../db/schema.ts';
import { eq, isNull, and } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export const userRepository = {
  /**
   * Create a new user
   */
  async createUser(
    username: string,
    email: string,
    password: string,
    createdBy?: string
  ) {
    const userId = randomUUID();
    await db.insert(users).values({
      id: userId,
      username,
      email,
      password,
      createdBy: createdBy || userId, // Self-created if no creator specified
    });
    return userId;
  },

  /**
   * Find user by ID (excluding soft-deleted)
   */
  async findById(userId: string) {
    const result = await db
      .select()
      .from(users)
      .where(and(eq(users.id, userId), isNull(users.deletedAt)))
      .limit(1);

    return result[0] || null;
  },

  /**
   * Find user by email (excluding soft-deleted)
   */
  async findByEmail(email: string) {
    const result = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), isNull(users.deletedAt)))
      .limit(1);

    return result[0] || null;
  },

  /**
   * Update user information
   */
  async updateUser(
    userId: string,
    data: {
      username?: string;
      email?: string;
      password?: string;
    },
    updatedBy: string
  ) {
    await db
      .update(users)
      .set({
        ...data,
        updatedBy,
        updatedAt: new Date(),
      })
      .where(and(eq(users.id, userId), isNull(users.deletedAt)));
  },

  /**
   * Soft delete a user
   */
  async deleteUser(userId: string, deletedBy: string) {
    await db
      .update(users)
      .set({
        deletedBy,
        deletedAt: new Date(),
      })
      .where(and(eq(users.id, userId), isNull(users.deletedAt)));
  },

  /**
   * List all active users (excluding soft-deleted)
   */
  async listUsers(limit: number = 100, offset: number = 0) {
    return await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(isNull(users.deletedAt))
      .limit(limit)
      .offset(offset);
  },
};
