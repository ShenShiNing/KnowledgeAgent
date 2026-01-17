// ============================================================================
// Schema Exports
// ============================================================================

// Common schemas
export * from './common/users';
export * from './common/user-model-configs';
export * from './common/tags';

// Knowledge schemas
export * from './knowledge/knowledge-bases';
export * from './knowledge/knowledge-base-permissions';

// Document schemas
export * from './document/documents';
export * from './document/document-chunks';
export * from './document/document-tags';
export * from './document/document-versions';

// Chat schemas
export * from './chat/conversations';
export * from './chat/messages';

// AI schemas
export * from './ai/ai-providers';
export * from './ai/ai-models';
export * from './ai/ai-usage-stats';

// Auth schemas (RBAC)
export * from './auth/roles';
export * from './auth/permissions';
export * from './auth/role-permissions';
export * from './auth/user-roles';

// System schemas
export * from './system/system-settings';

// Re-export tables for drizzle push/migrate
import { users } from './common/users';
import { userModelConfigs } from './common/user-model-configs';
import { tags } from './common/tags';
import { knowledgeBases } from './knowledge/knowledge-bases';
import { knowledgeBasePermissions } from './knowledge/knowledge-base-permissions';
import { documents } from './document/documents';
import { documentChunks } from './document/document-chunks';
import { documentTags } from './document/document-tags';
import { documentVersions } from './document/document-versions';
import { conversations } from './chat/conversations';
import { messages } from './chat/messages';
import { aiProviders } from './ai/ai-providers';
import { aiModels } from './ai/ai-models';
import { aiUsageStats } from './ai/ai-usage-stats';
import { roles } from './auth/roles';
import { permissions } from './auth/permissions';
import { rolePermissions } from './auth/role-permissions';
import { userRoles } from './auth/user-roles';
import { systemSettings } from './system/system-settings';

export const schema = {
  // Common
  users,
  userModelConfigs,
  tags,
  // Knowledge
  knowledgeBases,
  knowledgeBasePermissions,
  // Document
  documents,
  documentChunks,
  documentTags,
  documentVersions,
  // Chat
  conversations,
  messages,
  // AI
  aiProviders,
  aiModels,
  aiUsageStats,
  // Auth (RBAC)
  roles,
  permissions,
  rolePermissions,
  userRoles,
  // System
  systemSettings,
};
