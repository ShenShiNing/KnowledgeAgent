import {
  describe,
  test,
  beforeAll,
  afterAll,
  expect,
  beforeEach,
} from 'bun:test';
import {
  setupTestDatabase,
  cleanupTestData,
  closeTestDatabase,
  createTestUser,
  deleteTestUserByEmail,
  loginTestUser,
  authenticatedFetch,
} from './setup';

// ============================================================================
// Test Configuration
// ============================================================================

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

// ============================================================================
// Setup & Teardown
// ============================================================================

beforeAll(async () => {
  await setupTestDatabase();
});

beforeEach(async () => {
  await cleanupTestData();
});

afterAll(async () => {
  await cleanupTestData();
  await closeTestDatabase();
});

// ============================================================================
// Register Tests
// ============================================================================

describe('POST /api/auth/register', () => {
  test('should register a new user successfully', async () => {
    const userData = {
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'password123',
    };

    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    expect(response.status).toBe(201);

    const data = (await response.json()) as {
      user: { id: string; username: string; email: string; status: string };
      accessToken: string;
      refreshToken: string;
    };

    expect(data.user.username).toBe(userData.username);
    expect(data.user.email).toBe(userData.email);
    expect(data.user.status).toBe('active');
    expect(data.accessToken).toBeTruthy();
    expect(data.refreshToken).toBeTruthy();
  });

  test('should reject duplicate username', async () => {
    const userData = {
      username: 'duplicate',
      email: 'user1@example.com',
      password: 'password123',
    };

    // First registration
    await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    // Second registration with same username
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...userData,
        email: 'user2@example.com',
      }),
    });

    expect(response.status).toBe(400);
    const data = (await response.json()) as { error: string };
    expect(data.error).toBe('Username already exists');
  });

  test('should reject duplicate email', async () => {
    const userData = {
      username: 'user1',
      email: 'same@example.com',
      password: 'password123',
    };

    // First registration
    await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    // Second registration with same email
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...userData,
        username: 'user2',
      }),
    });

    expect(response.status).toBe(400);
    const data = (await response.json()) as { error: string };
    expect(data.error).toBe('Email already exists');
  });

  test('should validate username length', async () => {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'ab', // Too short
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    expect(response.status).toBe(400);
  });

  test('should validate email format', async () => {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123',
      }),
    });

    expect(response.status).toBe(400);
  });

  test('should validate password length', async () => {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@example.com',
        password: '1234567', // Too short
      }),
    });

    expect(response.status).toBe(400);
  });

  test('should validate username format (no special chars except underscore)', async () => {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'test-user', // Invalid: contains hyphen
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    expect(response.status).toBe(400);
  });
});

// ============================================================================
// Login Tests
// ============================================================================

describe('POST /api/auth/login', () => {
  test('should login with valid credentials', async () => {
    const user = await createTestUser({
      username: 'loginuser',
      email: 'login@example.com',
      password: 'correctpassword',
    });

    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });

    expect(response.status).toBe(200);

    const data = (await response.json()) as {
      user: { id: string; username: string; email: string };
      accessToken: string;
      refreshToken: string;
    };

    expect(data.user.email).toBe(user.email);
    expect(data.user.username).toBe(user.username);
    expect(data.accessToken).toBeTruthy();
    expect(data.refreshToken).toBeTruthy();
  });

  test('should reject invalid email', async () => {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'nonexistent@example.com',
        password: 'password123',
      }),
    });

    expect(response.status).toBe(401);
    const data = (await response.json()) as { error: string };
    expect(data.error).toBe('Invalid email or password');
  });

  test('should reject invalid password', async () => {
    const user = await createTestUser({
      email: 'wrongpass@example.com',
      password: 'correctpassword',
    });

    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        password: 'wrongpassword',
      }),
    });

    expect(response.status).toBe(401);
    const data = (await response.json()) as { error: string };
    expect(data.error).toBe('Invalid email or password');
  });

  test('should reject inactive user', async () => {
    const user = await createTestUser({
      email: 'inactive@example.com',
      password: 'password123',
      status: 'inactive',
    });

    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });

    expect(response.status).toBe(401);
    const data = (await response.json()) as { error: string };
    expect(data.error).toBe('Account is not active');
  });

  test('should reject banned user', async () => {
    const user = await createTestUser({
      email: 'banned@example.com',
      password: 'password123',
      status: 'banned',
    });

    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });

    expect(response.status).toBe(401);
    const data = (await response.json()) as { error: string };
    expect(data.error).toBe('Account is not active');
  });
});

// ============================================================================
// Get Current User Tests
// ============================================================================

describe('GET /api/auth/me', () => {
  test('should return user info with valid token', async () => {
    const user = await createTestUser({
      username: 'meuser',
      email: 'me@example.com',
    });

    const tokens = await loginTestUser(user.email, user.password);

    const response = await authenticatedFetch('/api/auth/me', {
      token: tokens.accessToken,
    });

    expect(response.status).toBe(200);

    const data = (await response.json()) as {
      user: { id: string; username: string; email: string; status: string };
    };

    expect(data.user.email).toBe(user.email);
    expect(data.user.username).toBe(user.username);
    expect(data.user.id).toBe(user.id);
  });

  test('should reject request without token', async () => {
    const response = await fetch(`${BASE_URL}/api/auth/me`);

    expect(response.status).toBe(401);
  });

  test('should reject request with invalid token', async () => {
    const response = await authenticatedFetch('/api/auth/me', {
      token: 'invalid.token.here',
    });

    expect(response.status).toBe(401);
  });

  test('should reject request with expired token', async () => {
    // Create an expired JWT token
    const jwt = await import('jsonwebtoken');
    const payload = {
      userId: '00000000-0000-0000-0000-000000000000',
      username: 'test',
      email: 'test@example.com',
      exp: Math.floor(Date.now() / 1000) - 3600, // Expired 1 hour ago
    };

    const expiredToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'test-secret',
      { issuer: 'knowledge-agent' }
    );

    const response = await authenticatedFetch('/api/auth/me', {
      token: expiredToken,
    });

    expect(response.status).toBe(401);
  });
});

// ============================================================================
// Refresh Token Tests
// ============================================================================

describe('POST /api/auth/refresh', () => {
  test('should refresh access token with valid refresh token', async () => {
    const user = await createTestUser({
      email: 'refresh@example.com',
    });

    const initialTokens = await loginTestUser(user.email, user.password);

    const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: initialTokens.refreshToken,
      }),
    });

    expect(response.status).toBe(200);

    const data = (await response.json()) as {
      user: { id: string; email: string };
      accessToken: string;
      refreshToken: string;
    };

    expect(data.accessToken).toBeTruthy();
    expect(data.refreshToken).toBeTruthy();
    // New tokens should be different from old ones
    expect(data.accessToken).not.toBe(initialTokens.accessToken);
    expect(data.refreshToken).not.toBe(initialTokens.refreshToken);
  });

  test('should reject invalid refresh token', async () => {
    const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: 'invalid-refresh-token',
      }),
    });

    expect(response.status).toBe(401);
  });

  test('should reject used refresh token (token rotation)', async () => {
    const user = await createTestUser({
      email: 'rotate@example.com',
    });

    const initialTokens = await loginTestUser(user.email, user.password);

    // First refresh - should succeed
    const firstRefresh = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: initialTokens.refreshToken,
      }),
    });

    expect(firstRefresh.status).toBe(200);
    const firstRefreshData = (await firstRefresh.json()) as {
      refreshToken: string;
    };

    // Second refresh with the same token - should fail (token rotation)
    const secondRefresh = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: initialTokens.refreshToken, // Using same token again
      }),
    });

    expect(secondRefresh.status).toBe(401);

    // New token should work
    const thirdRefresh = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: firstRefreshData.refreshToken,
      }),
    });

    expect(thirdRefresh.status).toBe(200);
  });
});

// ============================================================================
// Logout Tests
// ============================================================================

describe('POST /api/auth/logout', () => {
  test('should logout user with valid token', async () => {
    const user = await createTestUser({
      email: 'logout@example.com',
    });

    const tokens = await loginTestUser(user.email, user.password);

    const response = await authenticatedFetch('/api/auth/logout', {
      method: 'POST',
      token: tokens.accessToken,
      body: JSON.stringify({
        refreshToken: tokens.refreshToken,
      }),
    });

    expect(response.status).toBe(200);

    const data = (await response.json()) as { message: string };
    expect(data.message).toBe('Logged out successfully');
  });

  test('should reject logout without authentication', async () => {
    const response = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: 'some-token' }),
    });

    expect(response.status).toBe(401);
  });

  test('should prevent using refresh token after logout', async () => {
    const user = await createTestUser({
      email: 'logoutrefresh@example.com',
    });

    const tokens = await loginTestUser(user.email, user.password);

    // Logout
    await authenticatedFetch('/api/auth/logout', {
      method: 'POST',
      token: tokens.accessToken,
      body: JSON.stringify({
        refreshToken: tokens.refreshToken,
      }),
    });

    // Try to refresh with the logged out token - should fail
    const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: tokens.refreshToken,
      }),
    });

    expect(response.status).toBe(401);
  });
});

// ============================================================================
// Logout All Tests
// ============================================================================

describe('POST /api/auth/logout-all', () => {
  test('should logout from all devices', async () => {
    const user = await createTestUser({
      email: 'logoutall@example.com',
    });

    // Login from first device
    const tokens1 = await loginTestUser(user.email, user.password);

    // Login from second device
    const tokens2 = await loginTestUser(user.email, user.password);

    expect(tokens1.refreshToken).not.toBe(tokens2.refreshToken);

    // Logout all from first device
    const response = await authenticatedFetch('/api/auth/logout-all', {
      method: 'POST',
      token: tokens1.accessToken,
    });

    expect(response.status).toBe(200);
    const data = (await response.json()) as { message: string };
    expect(data.message).toBe('Logged out from all devices');

    // Both refresh tokens should be invalid now
    const refresh1 = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: tokens1.refreshToken }),
    });

    const refresh2 = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: tokens2.refreshToken }),
    });

    expect(refresh1.status).toBe(401);
    expect(refresh2.status).toBe(401);
  });

  test('should require authentication', async () => {
    const response = await fetch(`${BASE_URL}/api/auth/logout-all`, {
      method: 'POST',
    });

    expect(response.status).toBe(401);
  });
});

// ============================================================================
// Integration Tests - Complete Auth Flow
// ============================================================================

describe('Complete Auth Flow', () => {
  test('should complete full auth cycle: register -> login -> access protected -> refresh -> logout', async () => {
    // Step 1: Register
    const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'flowuser',
        email: 'flow@example.com',
        password: 'password123',
      }),
    });

    expect(registerResponse.status).toBe(201);
    const registerData = (await registerResponse.json()) as {
      accessToken: string;
      refreshToken: string;
    };

    // Step 2: Access protected endpoint
    const meResponse = await authenticatedFetch('/api/auth/me', {
      token: registerData.accessToken,
    });
    expect(meResponse.status).toBe(200);

    // Step 3: Login again to get fresh tokens
    const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'flow@example.com',
        password: 'password123',
      }),
    });

    expect(loginResponse.status).toBe(200);
    const loginData = (await loginResponse.json()) as {
      accessToken: string;
      refreshToken: string;
    };

    // Step 4: Refresh token
    const refreshResponse = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: loginData.refreshToken,
      }),
    });

    expect(refreshResponse.status).toBe(200);
    const refreshData = (await refreshResponse.json()) as {
      accessToken: string;
      refreshToken: string;
    };

    // Step 5: Access protected endpoint with new token
    const meResponse2 = await authenticatedFetch('/api/auth/me', {
      token: refreshData.accessToken,
    });
    expect(meResponse2.status).toBe(200);

    // Step 6: Logout
    const logoutResponse = await authenticatedFetch('/api/auth/logout', {
      method: 'POST',
      token: refreshData.accessToken,
      body: JSON.stringify({
        refreshToken: refreshData.refreshToken,
      }),
    });

    expect(logoutResponse.status).toBe(200);

    // Step 7: Verify refresh token is invalid after logout
    const failedRefresh = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: refreshData.refreshToken,
      }),
    });

    expect(failedRefresh.status).toBe(401);
  });
});
