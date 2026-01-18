import 'dotenv/config';
import { eq, and, isNull } from 'drizzle-orm';
import { users, refreshTokens } from '../db/schema';

// ============================================================================
// Test Database Configuration
// ============================================================================

// Use the server's database connection to ensure tests work with the running server
import { db } from '../db/index';
export const testDb = db;

// ============================================================================
// Test Database Setup & Cleanup
// ============================================================================

/**
 * Setup test database
 * Note: We use the server's database connection, so migrations are already run
 * by the server. This function is kept for compatibility but is now a no-op.
 */
export async function setupTestDatabase() {
  // No-op - server runs migrations on startup
  // We use the same database connection, so tables already exist
}

/**
 * Clean up test data from all tables
 */
export async function cleanupTestData() {
  // Delete in correct order to respect foreign key constraints
  await testDb.delete(refreshTokens);
  await testDb.delete(users);
}

/**
 * Clean up and close database connection
 * Note: We use the server's db connection, so we don't close it here
 */
export async function closeTestDatabase() {
  // No-op - we use the server's db connection which stays open
}

// ============================================================================
// Test Data Factory
// ============================================================================

export interface TestUserInput {
  username?: string;
  email?: string;
  password?: string;
  status?: 'active' | 'inactive' | 'banned';
  emailVerified?: boolean;
}

/**
 * Create a test user in the database
 */
export async function createTestUser(input: TestUserInput = {}) {
  const { hashPassword } = await import('../service/auth/crypto');

  const username = input.username || `testuser_${Date.now()}`;
  const email = input.email || `test_${Date.now()}@example.com`;
  const password = input.password || 'test123456';
  const status = input.status || 'active';

  const hashedPassword = await hashPassword(password);

  const userId = crypto.randomUUID();

  await testDb.insert(users).values({
    id: userId,
    username,
    email,
    password: hashedPassword,
    status,
    emailVerified: input.emailVerified ?? true,
  });

  return {
    id: userId,
    username,
    email,
    password, // plain text for testing
    status,
  };
}

/**
 * Delete a test user by email
 */
export async function deleteTestUserByEmail(email: string) {
  await testDb
    .delete(users)
    .where(and(eq(users.email, email), isNull(users.deletedAt)));
}

// ============================================================================
// Test Helpers
// ============================================================================

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Login as a test user and return tokens
 */
export async function loginTestUser(
  email: string,
  password: string
): Promise<AuthTokens> {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';

  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Login failed: ${error}`);
  }

  const data = (await response.json()) as {
    accessToken: string;
    refreshToken: string;
  };

  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
}

/**
 * Make authenticated request to the API
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit & { token?: string } = {}
) {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
  const { token, ...fetchOptions } = options;

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  return fetch(`${baseUrl}${url}`, {
    ...fetchOptions,
    headers,
  });
}
