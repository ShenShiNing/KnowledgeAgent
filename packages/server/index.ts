import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import { ensureSystemUser } from './db/system-user';
import { cleanupExpiredTokens } from './service/auth/tokens';
import { serverConfig, cleanupConfig } from './config';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

// Initialize system user before starting the server
await ensureSystemUser();

// Schedule token cleanup
async function runTokenCleanup() {
  try {
    const deletedCount = await cleanupExpiredTokens();
    if (deletedCount > 0) {
      console.log(
        `[Token Cleanup] Deleted ${deletedCount} expired/revoked tokens`
      );
    }
  } catch (error) {
    console.error('[Token Cleanup] Error during token cleanup:', error);
  }
}

// Initial cleanup on startup
await runTokenCleanup();

// Schedule periodic cleanup
setInterval(runTokenCleanup, cleanupConfig.tokenCleanupIntervalMs);

app.listen(serverConfig.port, () => {
  console.log(`Server is running on http://localhost:${serverConfig.port}`);
  console.log(
    `[Token Cleanup] Scheduled to run every ${cleanupConfig.tokenCleanupIntervalMs / 1000 / 60} minutes`
  );
});
