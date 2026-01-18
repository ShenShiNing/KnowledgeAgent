import { db } from '../../db/index';
import { users } from '../../db/schema/common/users';
import { eq, and, isNull } from 'drizzle-orm';
import type { NewUser } from '../../db/schema/common/users';
import {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  generateId,
} from './crypto';
import {
  storeRefreshToken,
  findRefreshToken,
  markTokenAsReplaced,
  revokeRefreshToken,
  revokeAllUserTokens,
} from './tokens';
import type {
  RegisterInput,
  LoginInput,
  RefreshTokenInput,
  AuthResponse,
  JWTPayload,
} from '../../types';

/**
 * Auth Service
 * Orchestrates authentication business logic
 */
export const authService = {
  /**
   * Register a new user
   */
  async register(input: RegisterInput): Promise<AuthResponse> {
    // Validate username uniqueness
    const existingUsername = await db
      .select()
      .from(users)
      .where(and(eq(users.username, input.username), isNull(users.deletedAt)))
      .limit(1);

    if (existingUsername.length > 0) {
      throw new Error('Username already exists');
    }

    // Validate email uniqueness
    const existingEmail = await db
      .select()
      .from(users)
      .where(and(eq(users.email, input.email), isNull(users.deletedAt)))
      .limit(1);

    if (existingEmail.length > 0) {
      throw new Error('Email already exists');
    }

    // Create user and store refresh token in a transaction
    const userId = generateId();
    const hashedPassword = await hashPassword(input.password);

    const result = await db.transaction(async (tx) => {
      // Create user
      const newUser: NewUser = {
        id: userId,
        username: input.username,
        email: input.email,
        password: hashedPassword,
        status: 'active',
        emailVerified: false,
      };

      await tx.insert(users).values(newUser);

      // Generate and store refresh token
      const refreshToken = generateRefreshToken();
      await storeRefreshToken(userId, refreshToken, tx);

      return refreshToken;
    });

    // Generate access token
    const payload: JWTPayload = {
      userId,
      username: input.username,
      email: input.email,
    };

    const accessToken = generateAccessToken(payload);

    return {
      user: {
        id: userId,
        username: input.username,
        email: input.email,
        status: 'active',
      },
      accessToken,
      refreshToken: result,
    };
  },

  /**
   * Login user with email and password
   */
  async login(input: LoginInput): Promise<AuthResponse> {
    // Find user
    const userResult = await db
      .select()
      .from(users)
      .where(and(eq(users.email, input.email), isNull(users.deletedAt)))
      .limit(1);

    const user = userResult[0];
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Validate account status
    if (user.status !== 'active') {
      throw new Error('Account is not active');
    }

    // Verify password
    const isValidPassword = await verifyPassword(input.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Update last login time and store refresh token in a transaction
    const result = await db.transaction(async (tx) => {
      // Update last login time
      await tx
        .update(users)
        .set({ lastLoginAt: new Date() })
        .where(eq(users.id, user.id));

      // Generate and store refresh token
      const refreshToken = generateRefreshToken();
      await storeRefreshToken(user.id, refreshToken, tx);

      return refreshToken;
    });

    // Generate access token
    const payload: JWTPayload = {
      userId: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        status: user.status,
      },
      accessToken,
      refreshToken: result,
    };
  },

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(input: RefreshTokenInput): Promise<AuthResponse> {
    // Verify refresh token
    const tokenRecord = await findRefreshToken(input.refreshToken);
    if (!tokenRecord) {
      throw new Error('Invalid or expired refresh token');
    }

    // Fetch user
    const userResult = await db
      .select()
      .from(users)
      .where(and(eq(users.id, tokenRecord.userId), isNull(users.deletedAt)))
      .limit(1);

    const user = userResult[0];
    if (!user) {
      throw new Error('User not found');
    }

    // Validate account status
    if (user.status !== 'active') {
      throw new Error('Account is not active');
    }

    // Generate new tokens
    const payload: JWTPayload = {
      userId: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken();

    // Implement token rotation
    const newTokenId = generateId();
    await markTokenAsReplaced(tokenRecord.id, newTokenId);
    await storeRefreshToken(user.id, newRefreshToken);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        status: user.status,
      },
      accessToken,
      refreshToken: newRefreshToken,
    };
  },

  /**
   * Logout user - revoke current refresh token
   */
  async logout(refreshToken: string): Promise<void> {
    await revokeRefreshToken(refreshToken);
  },

  /**
   * Logout from all devices - revoke all user's refresh tokens
   */
  async logoutAll(userId: string): Promise<void> {
    await revokeAllUserTokens(userId);
  },
};
