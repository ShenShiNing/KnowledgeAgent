// ============================================================================
// Config Types
// ============================================================================

export interface AuthConfig {
  jwtSecret: string;
  jwtIssuer: string;
  jwtAccessExpiry: string;
  jwtRefreshExpiryDays: number;
  bcryptSaltRounds: number;
}

export interface ServerConfig {
  port: number;
  nodeEnv: string;
}

export interface CleanupConfig {
  tokenCleanupIntervalMs: number;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get required environment variable, throw error if missing
 */
function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} environment variable is required`);
  }
  return value;
}

/**
 * Get environment variable with default value
 */
function getEnv(key: string, defaultValue: string): string {
  return process.env[key] ?? defaultValue;
}

/**
 * Get numeric environment variable with default value
 */
function getEnvNumber(key: string, defaultValue: number): number {
  const value = process.env[key];
  return value ? parseInt(value, 10) : defaultValue;
}

// ============================================================================
// Auth Configuration
// ============================================================================

export const authConfig: AuthConfig = {
  jwtSecret: getRequiredEnv('JWT_SECRET'),
  jwtIssuer: getEnv('JWT_ISSUER', 'knowledge-agent'),
  jwtAccessExpiry: getEnv('JWT_ACCESS_EXPIRY', '15m'),
  jwtRefreshExpiryDays: getEnvNumber('JWT_REFRESH_EXPIRY_DAYS', 7),
  bcryptSaltRounds: getEnvNumber('BCRYPT_SALT_ROUNDS', 12),
};

// ============================================================================
// Server Configuration
// ============================================================================

export const serverConfig: ServerConfig = {
  port: getEnvNumber('PORT', 3000),
  nodeEnv: getEnv('NODE_ENV', 'development'),
};

// ============================================================================
// Cleanup Configuration
// ============================================================================

export const cleanupConfig: CleanupConfig = {
  tokenCleanupIntervalMs: getEnvNumber(
    'TOKEN_CLEANUP_INTERVAL_MS',
    60 * 60 * 1000
  ), // 1 hour
};

// ============================================================================
// Environment
// ============================================================================

export const isDevelopment = serverConfig.nodeEnv === 'development';
export const isProduction = serverConfig.nodeEnv === 'production';
export const isTest = serverConfig.nodeEnv === 'test';
