import { db } from './index';
import { users } from './schema';
import { eq, isNull, and } from 'drizzle-orm';

const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000000';
const SYSTEM_USER_EMAIL = 'system@knowledgeagent.local';

/**
 * Ensure the system user exists in the database
 * This user is used for operations before user authentication is implemented
 */
export async function ensureSystemUser(): Promise<string> {
  const existingUser = await db
    .select()
    .from(users)
    .where(and(eq(users.id, SYSTEM_USER_ID), isNull(users.deletedAt)))
    .limit(1);

  if (existingUser.length === 0) {
    await db.insert(users).values({
      id: SYSTEM_USER_ID,
      username: 'System',
      email: SYSTEM_USER_EMAIL,
      password: '', // No password for system user
      createdBy: SYSTEM_USER_ID,
    });
  }

  return SYSTEM_USER_ID;
}

export { SYSTEM_USER_ID };
