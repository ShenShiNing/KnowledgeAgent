// ============================================================================
// User Status
// ============================================================================

export type UserStatus = 'active' | 'inactive' | 'banned';

// ============================================================================
// Auth Input Types
// ============================================================================

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RefreshTokenInput {
  refreshToken: string;
}

// ============================================================================
// Auth Response Types
// ============================================================================

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  status: UserStatus;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

// ============================================================================
// JWT Types
// ============================================================================

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
}

// ============================================================================
// Refresh Token Types
// ============================================================================

export interface RefreshTokenRecord {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  revoked: boolean;
  revokedAt: Date | null;
  replacedByToken: string | null;
}
