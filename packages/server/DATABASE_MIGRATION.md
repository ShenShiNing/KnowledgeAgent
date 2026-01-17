# 数据库架构更新说明

## 变更概述

已成功将数据库架构从自增 ID 迁移到 UUID，并实现了软删除和完整的审计功能。

## 主要变更

### 1. 数据库表结构

#### Users 表（新增）
```sql
- id: VARCHAR(36) PRIMARY KEY           -- UUID
- username: VARCHAR(100) NOT NULL
- email: VARCHAR(255) NOT NULL UNIQUE
- password: VARCHAR(255) NOT NULL
- created_by: VARCHAR(36)               -- 创建人
- created_at: TIMESTAMP                 -- 创建时间
- updated_by: VARCHAR(36)               -- 最后修改人
- updated_at: TIMESTAMP                 -- 最后修改时间
- deleted_by: VARCHAR(36)               -- 删除人
- deleted_at: TIMESTAMP                 -- 删除时间（软删除）
```

#### Conversations 表
```sql
- id: VARCHAR(36) PRIMARY KEY           -- UUID（之前是自增）
- title: VARCHAR(255)                   -- 会话标题（新增）
- created_by: VARCHAR(36) NOT NULL      -- 创建人（新增）
- created_at: TIMESTAMP
- updated_by: VARCHAR(36)               -- 最后修改人（新增）
- updated_at: TIMESTAMP
- deleted_by: VARCHAR(36)               -- 删除人（新增）
- deleted_at: TIMESTAMP                 -- 软删除（新增）
```

#### Messages 表
```sql
- id: VARCHAR(36) PRIMARY KEY           -- UUID（之前是 INT AUTO_INCREMENT）
- conversation_id: VARCHAR(36) NOT NULL -- 逻辑外键
- role: ENUM('user', 'assistant', 'system')
- content: TEXT
- created_by: VARCHAR(36) NOT NULL      -- 创建人（新增）
- created_at: TIMESTAMP
- updated_by: VARCHAR(36)               -- 最后修改人（新增）
- updated_at: TIMESTAMP
- deleted_by: VARCHAR(36)               -- 删除人（新增）
- deleted_at: TIMESTAMP                 -- 软删除（新增）
```

### 2. 索引

每个表都添加了以下索引以优化查询性能：
- `deleted_at_idx`: 用于快速过滤软删除记录
- `created_by_idx` (conversations): 按创建人查询
- `email_idx` (users): 按邮箱查询
- `conversation_id_idx` (messages): 按会话查询
- `created_at_idx` (messages): 按时间排序

### 3. 关系设计

**逻辑外键（非物理外键）**：
- messages.conversation_id → conversations.id
- conversations.created_by → users.id
- messages.created_by → users.id

使用逻辑外键的优势：
- 更好的性能（无外键约束检查）
- 更灵活的数据迁移
- 避免级联删除问题

### 4. 代码更新

#### 新增文件
- `db/system-user.ts`: 系统用户管理
- `repositories/user.ts`: 用户 Repository

#### 更新文件
- `db/schema.ts`: 完全重写，添加 users 表和审计字段
- `repositories/conversation.ts`: 支持软删除和 UUID
  - 所有查询自动过滤已删除记录
  - 新增 `deleteConversation()` 和 `deleteMessage()` 方法
  - 所有写操作需要传入 `userId` 用于审计
- `service/chat.ts`: 传递 userId 参数
- `index.ts`: 启动时创建系统用户

## 系统用户

为了在未实现用户认证前能够正常使用，系统会自动创建一个默认用户：
- **ID**: `00000000-0000-0000-0000-000000000000`
- **用户名**: System
- **邮箱**: system@knowledgeagent.local

所有当前操作都将使用此系统用户进行审计。

## Repository 使用示例

### Conversation Repository

```typescript
// 添加用户消息（会自动创建会话）
await conversationRepository.addUserMessage(
  conversationId,
  content,
  userId
);

// 添加 AI 回复
await conversationRepository.addAssistantMessage(
  conversationId,
  content,
  userId
);

// 获取会话历史（自动过滤已删除）
const messages = await conversationRepository.getLastResponse(conversationId);

// 软删除会话
await conversationRepository.deleteConversation(conversationId, userId);

// 软删除单条消息
await conversationRepository.deleteMessage(messageId, userId);
```

### User Repository

```typescript
// 创建用户
const userId = await userRepository.createUser(
  'username',
  'email@example.com',
  'hashed_password'
);

// 查找用户
const user = await userRepository.findById(userId);
const userByEmail = await userRepository.findByEmail('email@example.com');

// 更新用户
await userRepository.updateUser(
  userId,
  { username: 'new_name' },
  updatedBy
);

// 软删除用户
await userRepository.deleteUser(userId, deletedBy);

// 列出用户
const users = await userRepository.listUsers(limit, offset);
```

## 软删除说明

所有删除操作都是软删除：
- 记录不会从数据库中物理删除
- 设置 `deleted_at` 时间戳和 `deleted_by` 用户 ID
- 所有查询自动过滤 `deleted_at IS NULL`
- 可以通过查询 `deleted_at IS NOT NULL` 来恢复或查看已删除数据

## 审计追踪

每条记录都包含完整的审计信息：
- **创建**: `created_by`, `created_at`
- **修改**: `updated_by`, `updated_at` (自动更新)
- **删除**: `deleted_by`, `deleted_at`

这使得可以追踪所有数据的完整生命周期。

## 迁移说明

如果需要重新生成迁移：
```bash
cd packages/server
bun run db:generate  # 生成迁移文件
bun run db:migrate   # 执行迁移
bun run db:studio    # 可视化管理（Drizzle Studio）
```

## 注意事项

1. **UUID 生成**: 使用 Node.js 内置的 `crypto.randomUUID()`
2. **时间戳**: 使用数据库的 `NOW()` 函数，自动处理时区
3. **查询优化**: 所有涉及软删除的查询都添加了 `deleted_at IS NULL` 条件
4. **事务**: 复杂操作使用事务确保数据一致性
5. **未来扩展**: 可以轻松添加用户认证，只需将 `SYSTEM_USER_ID` 替换为实际用户 ID

## 数据库命令

```bash
# 查看所有表
mysql -u root -p -D knowledge_agent -e "SHOW TABLES;"

# 查看用户
mysql -u root -p -D knowledge_agent -e "SELECT * FROM users;"

# 查看会话（未删除）
mysql -u root -p -D knowledge_agent -e "SELECT * FROM conversations WHERE deleted_at IS NULL;"

# 查看消息（未删除）
mysql -u root -p -D knowledge_agent -e "SELECT * FROM messages WHERE deleted_at IS NULL;"
```
