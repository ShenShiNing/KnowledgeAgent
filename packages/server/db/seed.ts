import 'dotenv/config';
import { db } from './index';
import { eq, and } from 'drizzle-orm';

import { roles, permissions, rolePermissions, userRoles } from './schema';
import { aiProviders, aiModels } from './schema';
import { systemSettings } from './schema';
import { users } from './schema';
import { SYSTEM_USER_ID } from './system-user';

// ============================================================================
// UUID Generator (Simple implementation)
// ============================================================================

function generateId(): string {
  return crypto.randomUUID();
}

// ============================================================================
// Seed Data
// ============================================================================

const ROLES = [
  {
    id: generateId(),
    code: 'admin' as const,
    name: 'Administrator' as const,
    description: 'Full system access' as const,
    roleType: 'system' as const,
    level: 'admin' as const,
    status: 'active' as const,
    permissions: ['*'] as string[], // All permissions
  },
  {
    id: generateId(),
    code: 'moderator' as const,
    name: 'Moderator' as const,
    description: 'Content moderation and user management' as const,
    roleType: 'system' as const,
    level: 'moderator' as const,
    status: 'active' as const,
    permissions: [
      'document:read',
      'document:write',
      'document:delete',
      'knowledge_base:read',
      'knowledge_base:write',
      'knowledge_base:manage',
      'chat:read',
      'chat:write',
      'user:read',
    ] as const,
  },
  {
    id: generateId(),
    code: 'user' as const,
    name: 'User' as const,
    description: 'Standard user with basic access' as const,
    roleType: 'system' as const,
    level: 'user' as const,
    status: 'active' as const,
    permissions: [
      'document:read',
      'document:write',
      'knowledge_base:read',
      'knowledge_base:write',
      'chat:read',
      'chat:write',
      'ai:use',
    ] as const,
  },
  {
    id: generateId(),
    code: 'guest' as const,
    name: 'Guest' as const,
    description: 'Read-only access to public content' as const,
    roleType: 'system' as const,
    level: 'guest' as const,
    status: 'active' as const,
    permissions: ['document:read', 'knowledge_base:read', 'chat:read'] as const,
  },
] as const;

const PERMISSIONS = [
  // Document permissions
  {
    id: generateId(),
    code: 'document:read' as const,
    name: 'Read Documents' as const,
    description: 'View documents' as const,
    category: 'document' as const,
    permissionType: 'read' as const,
    resource: 'documents' as const,
    status: 'active' as const,
  },
  {
    id: generateId(),
    code: 'document:write' as const,
    name: 'Write Documents' as const,
    description: 'Create and edit documents' as const,
    category: 'document' as const,
    permissionType: 'write' as const,
    resource: 'documents' as const,
    status: 'active' as const,
  },
  {
    id: generateId(),
    code: 'document:delete' as const,
    name: 'Delete Documents' as const,
    description: 'Delete documents' as const,
    category: 'document' as const,
    permissionType: 'delete' as const,
    resource: 'documents' as const,
    status: 'active' as const,
  },
  // Knowledge base permissions
  {
    id: generateId(),
    code: 'knowledge_base:read' as const,
    name: 'Read Knowledge Bases' as const,
    description: 'View knowledge bases' as const,
    category: 'knowledge_base' as const,
    permissionType: 'read' as const,
    resource: 'knowledge_bases' as const,
    status: 'active' as const,
  },
  {
    id: generateId(),
    code: 'knowledge_base:write' as const,
    name: 'Write Knowledge Bases' as const,
    description: 'Create and edit knowledge bases' as const,
    category: 'knowledge_base' as const,
    permissionType: 'write' as const,
    resource: 'knowledge_bases' as const,
    status: 'active' as const,
  },
  {
    id: generateId(),
    code: 'knowledge_base:manage' as const,
    name: 'Manage Knowledge Bases' as const,
    description: 'Manage knowledge base permissions and sharing' as const,
    category: 'knowledge_base' as const,
    permissionType: 'manage' as const,
    resource: 'knowledge_bases' as const,
    status: 'active' as const,
  },
  // Chat permissions
  {
    id: generateId(),
    code: 'chat:read' as const,
    name: 'Read Chats' as const,
    description: 'View conversations and messages' as const,
    category: 'chat' as const,
    permissionType: 'read' as const,
    resource: 'conversations' as const,
    status: 'active' as const,
  },
  {
    id: generateId(),
    code: 'chat:write' as const,
    name: 'Write Chats' as const,
    description: 'Create and manage conversations' as const,
    category: 'chat' as const,
    permissionType: 'write' as const,
    resource: 'conversations' as const,
    status: 'active' as const,
  },
  {
    id: generateId(),
    code: 'chat:delete' as const,
    name: 'Delete Chats' as const,
    description: 'Delete conversations' as const,
    category: 'chat' as const,
    permissionType: 'delete' as const,
    resource: 'conversations' as const,
    status: 'active' as const,
  },
  // User permissions
  {
    id: generateId(),
    code: 'user:read' as const,
    name: 'Read Users' as const,
    description: 'View user profiles' as const,
    category: 'user' as const,
    permissionType: 'read' as const,
    resource: 'users' as const,
    status: 'active' as const,
  },
  {
    id: generateId(),
    code: 'user:manage' as const,
    name: 'Manage Users' as const,
    description: 'Manage user accounts and roles' as const,
    category: 'user' as const,
    permissionType: 'manage' as const,
    resource: 'users' as const,
    status: 'active' as const,
  },
  // AI permissions
  {
    id: generateId(),
    code: 'ai:read' as const,
    name: 'Read AI Config' as const,
    description: 'View AI models and providers' as const,
    category: 'ai' as const,
    permissionType: 'read' as const,
    resource: 'ai' as const,
    status: 'active' as const,
  },
  {
    id: generateId(),
    code: 'ai:use' as const,
    name: 'Use AI' as const,
    description: 'Use AI models for chat and completion' as const,
    category: 'ai' as const,
    permissionType: 'write' as const,
    resource: 'ai' as const,
    status: 'active' as const,
  },
  // System permissions
  {
    id: generateId(),
    code: 'system:manage' as const,
    name: 'Manage System' as const,
    description: 'Manage system settings and configuration' as const,
    category: 'system' as const,
    permissionType: 'manage' as const,
    resource: 'system' as const,
    status: 'active' as const,
  },
] as const;

// Generate provider IDs first (before AI_PROVIDERS becomes const)
const providerIdMap = {
  openai: generateId(),
  anthropic: generateId(),
  openrouter: generateId(),
  aliyun: generateId(),
  zhipu: generateId(),
};

const AI_PROVIDERS = [
  {
    id: providerIdMap.openai,
    code: 'openai' as const,
    name: 'OpenAI' as const,
    description: 'OpenAI GPT models' as const,
    logoUrl: null as string | null,
    baseUrl: 'https://api.openai.com/v1' as const,
    defaultModel: 'gpt-4o' as const,
    status: 'active' as const,
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: providerIdMap.anthropic,
    code: 'anthropic' as const,
    name: 'Anthropic' as const,
    description: 'Anthropic Claude models' as const,
    logoUrl: null as string | null,
    baseUrl: 'https://api.anthropic.com/v1' as const,
    defaultModel: 'claude-sonnet-4-20250514' as const,
    status: 'active' as const,
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: providerIdMap.openrouter,
    code: 'openrouter' as const,
    name: 'OpenRouter' as const,
    description: 'Unified API for multiple LLM providers' as const,
    logoUrl: null as string | null,
    baseUrl: 'https://openrouter.ai/api/v1' as const,
    defaultModel: 'anthropic/claude-3.5-sonnet' as const,
    status: 'active' as const,
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: providerIdMap.aliyun,
    code: 'aliyun' as const,
    name: '阿里云通义千问' as const,
    description: 'Alibaba Cloud Qwen models' as const,
    logoUrl: null as string | null,
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1' as const,
    defaultModel: 'qwen-plus' as const,
    status: 'active' as const,
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: providerIdMap.zhipu,
    code: 'zhipu' as const,
    name: '智谱 AI' as const,
    description: 'Zhipu AI GLM models' as const,
    logoUrl: null as string | null,
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4' as const,
    defaultModel: 'glm-4' as const,
    status: 'active' as const,
    createdBy: SYSTEM_USER_ID,
  },
] as const;

const AI_MODELS = [
  // OpenAI models
  {
    id: generateId(),
    providerId: providerIdMap.openai,
    modelId: 'gpt-4o' as const,
    name: 'GPT-4o' as const,
    description: 'OpenAI flagship multimodal model' as const,
    modelType: 'chat' as const,
    supportsRAG: true,
    supportsTools: true,
    supportsImages: true,
    maxTokens: 128000,
    contextWindow: 128000,
    inputPrice: 50,
    outputPrice: 150,
    status: 'active' as const,
  },
  {
    id: generateId(),
    providerId: providerIdMap.openai,
    modelId: 'gpt-4o-mini' as const,
    name: 'GPT-4o Mini' as const,
    description: 'OpenAI cost-effective small model' as const,
    modelType: 'chat' as const,
    supportsRAG: true,
    supportsTools: true,
    supportsImages: true,
    maxTokens: 128000,
    contextWindow: 128000,
    inputPrice: 1,
    outputPrice: 2,
    status: 'active' as const,
  },
  {
    id: generateId(),
    providerId: providerIdMap.openai,
    modelId: 'text-embedding-3-small' as const,
    name: 'Text Embedding 3 Small' as const,
    description: 'OpenAI embedding model' as const,
    modelType: 'embedding' as const,
    supportsRAG: true,
    supportsTools: false,
    supportsImages: false,
    maxTokens: 8192,
    contextWindow: 8192,
    inputPrice: 0.2,
    outputPrice: 0,
    status: 'active' as const,
  },
  // Anthropic models
  {
    id: generateId(),
    providerId: providerIdMap.anthropic,
    modelId: 'claude-sonnet-4-20250514' as const,
    name: 'Claude 4 Sonnet' as const,
    description: 'Anthropic balanced performance model' as const,
    modelType: 'chat' as const,
    supportsRAG: true,
    supportsTools: true,
    supportsImages: true,
    maxTokens: 200000,
    contextWindow: 200000,
    inputPrice: 30,
    outputPrice: 150,
    status: 'active' as const,
  },
  {
    id: generateId(),
    providerId: providerIdMap.anthropic,
    modelId: 'claude-3-5-haiku-20241022' as const,
    name: 'Claude 3.5 Haiku' as const,
    description: 'Anthropic fast and cost-effective model' as const,
    modelType: 'chat' as const,
    supportsRAG: true,
    supportsTools: true,
    supportsImages: false,
    maxTokens: 200000,
    contextWindow: 200000,
    inputPrice: 8,
    outputPrice: 40,
    status: 'active' as const,
  },
  // OpenRouter models (sample)
  {
    id: generateId(),
    providerId: providerIdMap.openrouter,
    modelId: 'anthropic/claude-3.5-sonnet' as const,
    name: 'Claude 3.5 Sonnet (via OpenRouter)' as const,
    description: 'Anthropic model via OpenRouter' as const,
    modelType: 'chat' as const,
    supportsRAG: true,
    supportsTools: true,
    supportsImages: true,
    maxTokens: 200000,
    contextWindow: 200000,
    inputPrice: 30,
    outputPrice: 150,
    status: 'active' as const,
  },
  // Alibaba Qwen models
  {
    id: generateId(),
    providerId: providerIdMap.aliyun,
    modelId: 'qwen-plus' as const,
    name: 'Qwen Plus' as const,
    description: 'Alibaba Cloud Qwen Plus model' as const,
    modelType: 'chat' as const,
    supportsRAG: true,
    supportsTools: true,
    supportsImages: false,
    maxTokens: 128000,
    contextWindow: 128000,
    inputPrice: 4,
    outputPrice: 12,
    status: 'active' as const,
  },
  {
    id: generateId(),
    providerId: providerIdMap.aliyun,
    modelId: 'qwen-turbo' as const,
    name: 'Qwen Turbo' as const,
    description: 'Alibaba Cloud Qwen Turbo model' as const,
    modelType: 'chat' as const,
    supportsRAG: true,
    supportsTools: true,
    supportsImages: false,
    maxTokens: 8000,
    contextWindow: 8000,
    inputPrice: 2,
    outputPrice: 6,
    status: 'active' as const,
  },
  {
    id: generateId(),
    providerId: providerIdMap.aliyun,
    modelId: 'text-embedding-v3' as const,
    name: 'Qwen Text Embedding V3' as const,
    description: 'Alibaba Cloud embedding model' as const,
    modelType: 'embedding' as const,
    supportsRAG: true,
    supportsTools: false,
    supportsImages: false,
    maxTokens: 8192,
    contextWindow: 8192,
    inputPrice: 0.1,
    outputPrice: 0,
    status: 'active' as const,
  },
  // Zhipu GLM models
  {
    id: generateId(),
    providerId: providerIdMap.zhipu,
    modelId: 'glm-4' as const,
    name: 'GLM-4' as const,
    description: 'Zhipu AI flagship model' as const,
    modelType: 'chat' as const,
    supportsRAG: true,
    supportsTools: true,
    supportsImages: true,
    maxTokens: 128000,
    contextWindow: 128000,
    inputPrice: 10,
    outputPrice: 10,
    status: 'active' as const,
  },
  {
    id: generateId(),
    providerId: providerIdMap.zhipu,
    modelId: 'glm-4-flash' as const,
    name: 'GLM-4 Flash' as const,
    description: 'Zhipu AI fast model' as const,
    modelType: 'chat' as const,
    supportsRAG: true,
    supportsTools: true,
    supportsImages: false,
    maxTokens: 128000,
    contextWindow: 128000,
    inputPrice: 1,
    outputPrice: 1,
    status: 'active' as const,
  },
] as const;

const SYSTEM_SETTINGS = [
  {
    id: generateId(),
    key: 'upload.max_file_size' as const,
    name: 'Maximum File Size' as const,
    description: 'Maximum file size for uploads in MB' as const,
    value: 50,
    valueType: 'number' as const,
    category: 'upload' as const,
    isSystem: '1',
    isPublic: '0',
    validationRules: {
      type: 'number' as const,
      min: 1,
      max: 500,
    },
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: generateId(),
    key: 'upload.max_total_size' as const,
    name: 'Maximum Total Upload Size' as const,
    description: 'Maximum total upload size in MB per request' as const,
    value: 100,
    valueType: 'number' as const,
    category: 'upload' as const,
    isSystem: '1',
    isPublic: '0',
    validationRules: {
      type: 'number' as const,
      min: 10,
      max: 1000,
    },
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: generateId(),
    key: 'upload.allowed_file_types' as const,
    name: 'Allowed File Types' as const,
    description: 'Allowed file extensions for upload' as const,
    value: [
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
      '.ppt',
      '.pptx',
      '.pdf',
      '.txt',
      '.md',
      '.csv',
      '.json',
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
    ],
    valueType: 'array' as const,
    category: 'upload' as const,
    isSystem: '1',
    isPublic: '1',
    validationRules: {
      type: 'array' as const,
      items: { type: 'string', pattern: '^\\.[a-zA-Z0-9]+$' },
    },
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: generateId(),
    key: 'document.chunk_size' as const,
    name: 'Document Chunk Size' as const,
    description:
      'Default chunk size for document processing in tokens' as const,
    value: 1000,
    valueType: 'number' as const,
    category: 'general' as const,
    isSystem: '1',
    isPublic: '1',
    validationRules: {
      type: 'number' as const,
      min: 100,
      max: 4000,
    },
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: generateId(),
    key: 'document.chunk_overlap' as const,
    name: 'Document Chunk Overlap' as const,
    description:
      'Default chunk overlap for document processing in tokens' as const,
    value: 200,
    valueType: 'number' as const,
    category: 'general' as const,
    isSystem: '1',
    isPublic: '1',
    validationRules: {
      type: 'number' as const,
      min: 0,
      max: 1000,
    },
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: generateId(),
    key: 'ai.default_chat_model' as const,
    name: 'Default Chat Model' as const,
    description: 'Default AI model for chat' as const,
    value: null,
    valueType: 'string' as const,
    category: 'ai' as const,
    isSystem: '1',
    isPublic: '1',
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: generateId(),
    key: 'ai.default_embedding_model' as const,
    name: 'Default Embedding Model' as const,
    description: 'Default AI model for embeddings' as const,
    value: null,
    valueType: 'string' as const,
    category: 'ai' as const,
    isSystem: '1',
    isPublic: '1',
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: generateId(),
    key: 'ai.max_concurrent_requests' as const,
    name: 'Max Concurrent AI Requests' as const,
    description: 'Maximum concurrent AI requests per user' as const,
    value: 5,
    valueType: 'number' as const,
    category: 'ai' as const,
    isSystem: '1',
    isPublic: '0',
    validationRules: {
      type: 'number' as const,
      min: 1,
      max: 20,
    },
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: generateId(),
    key: 'ui.theme' as const,
    name: 'Default UI Theme' as const,
    description: 'Default theme for UI' as const,
    value: 'dark' as const,
    valueType: 'string' as const,
    category: 'ui' as const,
    isSystem: '1',
    isPublic: '1',
    validationRules: {
      type: 'string' as const,
      enum: ['light', 'dark', 'system'],
    },
    createdBy: SYSTEM_USER_ID,
  },
] as const;

// Default admin user (password: admin123 - should be changed in production)
const ADMIN_USER = {
  id: generateId(),
  username: 'admin' as const,
  email: 'admin@knowledgeagent.local' as const,
  password: '$2b$10$N9qo8uLOickgx2ZMRZoMy.MrqKJhKdF4N.y4QzG.3qGJ3Gd/0e5G', // bcrypt hash of 'admin123'
  status: 'active' as const,
  emailVerified: true,
  emailVerifiedAt: new Date(),
  createdBy: SYSTEM_USER_ID,
} as const;

// ============================================================================
// Seed Functions
// ============================================================================

async function seedRoles() {
  console.log('Seeding roles...');

  for (const role of ROLES) {
    const { permissions: _, ...roleData } = role;
    const existing = await db
      .select()
      .from(roles)
      .where(eq(roles.code, role.code))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(roles).values(roleData);
      console.log(`  Created role: ${role.name}`);
    }
  }
}

async function seedPermissions() {
  console.log('Seeding permissions...');

  for (const permission of PERMISSIONS) {
    const existing = await db
      .select()
      .from(permissions)
      .where(eq(permissions.code, permission.code))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(permissions).values(permission);
      console.log(`  Created permission: ${permission.name}`);
    }
  }
}

async function seedRolePermissions() {
  console.log('Seeding role permissions...');

  const allRoles = await db.select().from(roles);
  const allPermissions = await db.select().from(permissions);
  const permissionMap = new Map(allPermissions.map((p) => [p.code, p.id]));
  const roleMap = new Map(allRoles.map((r) => [r.code, r.id]));

  for (const role of ROLES) {
    const roleId = roleMap.get(role.code);
    if (!roleId) continue;

    for (const permCode of role.permissions) {
      if (permCode === '*') {
        // Admin gets all permissions
        for (const perm of allPermissions) {
          const existing = await db
            .select()
            .from(rolePermissions)
            .where(
              and(
                eq(rolePermissions.roleId, roleId),
                eq(rolePermissions.permissionId, perm.id)
              )
            )
            .limit(1);

          if (existing.length === 0) {
            await db.insert(rolePermissions).values({
              id: generateId(),
              roleId,
              permissionId: perm.id,
              createdBy: SYSTEM_USER_ID,
            });
          }
        }
        break;
      }

      const permId = permissionMap.get(permCode);
      if (!permId) continue;

      const existing = await db
        .select()
        .from(rolePermissions)
        .where(
          and(
            eq(rolePermissions.roleId, roleId),
            eq(rolePermissions.permissionId, permId)
          )
        )
        .limit(1);

      if (existing.length === 0) {
        await db.insert(rolePermissions).values({
          id: generateId(),
          roleId,
          permissionId: permId,
          createdBy: SYSTEM_USER_ID,
        });
      }
    }
  }
  console.log('  Role permissions seeded');
}

async function seedAiProviders() {
  console.log('Seeding AI providers...');

  for (const provider of AI_PROVIDERS) {
    const existing = await db
      .select()
      .from(aiProviders)
      .where(eq(aiProviders.code, provider.code))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(aiProviders).values(provider);
      console.log(`  Created provider: ${provider.name}`);
    }
  }
}

async function seedAiModels() {
  console.log('Seeding AI models...');

  for (const model of AI_MODELS) {
    const existing = await db
      .select()
      .from(aiModels)
      .where(eq(aiModels.modelId, model.modelId))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(aiModels).values(model);
      console.log(`  Created model: ${model.name}`);
    }
  }
}

async function seedSystemSettings() {
  console.log('Seeding system settings...');

  for (const setting of SYSTEM_SETTINGS) {
    const existing = await db
      .select()
      .from(systemSettings)
      .where(eq(systemSettings.key, setting.key))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(systemSettings).values(setting);
      console.log(`  Created setting: ${setting.name}`);
    }
  }
}

async function seedDefaultAdmin() {
  console.log('Seeding default admin user...');

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, ADMIN_USER.email))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(users).values(ADMIN_USER);
    console.log(`  Created admin user: ${ADMIN_USER.username}`);
  }

  // Assign admin role to admin user
  const adminUser = await db
    .select()
    .from(users)
    .where(eq(users.email, ADMIN_USER.email))
    .limit(1);

  const adminRole = await db
    .select()
    .from(roles)
    .where(eq(roles.code, 'admin'))
    .limit(1);

  if (adminUser.length > 0 && adminRole.length > 0) {
    const existing = await db
      .select()
      .from(userRoles)
      .where(
        and(
          eq(userRoles.userId, adminUser[0]!.id),
          eq(userRoles.roleId, adminRole[0]!.id)
        )
      )
      .limit(1);

    if (existing.length === 0) {
      await db.insert(userRoles).values({
        id: generateId(),
        userId: adminUser[0]!.id,
        roleId: adminRole[0]!.id,
        assignedBy: SYSTEM_USER_ID,
      });
      console.log('  Assigned admin role to admin user');
    }
  }
}

// ============================================================================
// Main Seed Function
// ============================================================================

async function seed() {
  console.log('Starting database seeding...\n');

  try {
    await seedRoles();
    await seedPermissions();
    await seedRolePermissions();
    await seedAiProviders();
    await seedAiModels();
    await seedSystemSettings();
    await seedDefaultAdmin();

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nDefault admin credentials:');
    console.log('  Username: admin');
    console.log('  Email: admin@knowledgeagent.local');
    console.log('  Password: admin123 (please change this in production!)');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

// Bun-specific way to check if file is run directly
if (import.meta.main) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
