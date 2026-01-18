# Auth Tests

Bun Test integration tests for the authentication system.

## Prerequisites

1. **Server must be running** on `http://localhost:3000`:
   ```bash
   cd packages/server
   bun run dev
   ```

2. **Database configured** - Add to `.env`:
   ```env
   TEST_DATABASE_URL=mysql://username:password@localhost:3306/knowledge_agent
   TEST_BASE_URL=http://localhost:3000
   JWT_SECRET=your-super-secret-jwt-key
   ```

## Running Tests

```bash
# Run all tests once
bun test

# Run tests in watch mode
bun test:watch

# Run tests with coverage
bun test:coverage

# Run specific test file
bun test tests/auth.test.ts
```

## Test Coverage

| Feature | Tests |
|---------|-------|
| Register | 7 tests |
| Login | 5 tests |
| Get Current User (`/me`) | 4 tests |
| Refresh Token | 3 tests |
| Logout | 3 tests |
| Logout All | 2 tests |
| Complete Auth Flow | 1 test |

**Total: 25 tests**

## Test Files

- `tests/setup.ts` - Test database setup, cleanup, and helper functions
- `tests/auth.test.ts` - Authentication API integration tests

## Test Helpers

```ts
import {
  createTestUser,
  loginTestUser,
  authenticatedFetch,
} from './setup';

// Create a test user
const user = await createTestUser({
  email: 'test@example.com',
  password: 'test123',
});

// Login and get tokens
const tokens = await loginTestUser(user.email, user.password);

// Make authenticated request
const response = await authenticatedFetch('/api/auth/me', {
  token: tokens.accessToken,
});
```
