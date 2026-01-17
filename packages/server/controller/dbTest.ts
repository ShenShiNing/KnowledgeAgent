import type { Request, Response } from 'express';
import z from 'zod';
import { db } from '../db/index.ts';
import { users, conversations, messages } from '../db/schema.ts';
import { isNull, eq, and } from 'drizzle-orm';

// Schema definitions
const userIdParamSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
});

const conversationIdParamSchema = z.object({
  conversationId: z.string().uuid('Invalid conversation ID format'),
});

export const dbTestController = {
  /**
   * 查询数据库统计信息和示例数据
   * GET /api/db/test
   */
  async getDatabaseInfo(req: Request, res: Response) {
    try {
      // 查询所有用户（未删除）
      const allUsers = await db
        .select({
          id: users.id,
          username: users.username,
          email: users.email,
          createdAt: users.createdAt,
          createdBy: users.createdBy,
        })
        .from(users)
        .where(isNull(users.deletedAt));

      // 查询所有会话（未删除）
      const allConversations = await db
        .select({
          id: conversations.id,
          title: conversations.title,
          createdBy: conversations.createdBy,
          createdAt: conversations.createdAt,
          updatedAt: conversations.updatedAt,
        })
        .from(conversations)
        .where(isNull(conversations.deletedAt));

      // 查询所有消息（未删除）
      const allMessages = await db
        .select({
          id: messages.id,
          conversationId: messages.conversationId,
          role: messages.role,
          content: messages.content,
          createdBy: messages.createdBy,
          createdAt: messages.createdAt,
        })
        .from(messages)
        .where(isNull(messages.deletedAt));

      // 统计信息
      const stats = {
        users: {
          total: allUsers.length,
          system: allUsers.filter(
            (u) => u.id === '00000000-0000-0000-0000-000000000000'
          ).length,
        },
        conversations: {
          total: allConversations.length,
        },
        messages: {
          total: allMessages.length,
          byRole: {
            user: allMessages.filter((m) => m.role === 'user').length,
            assistant: allMessages.filter((m) => m.role === 'assistant').length,
            system: allMessages.filter((m) => m.role === 'system').length,
          },
        },
      };

      res.json({
        success: true,
        timestamp: new Date().toISOString(),
        stats,
        data: {
          users: allUsers,
          conversations: allConversations,
          messages: allMessages.map((m) => ({
            ...m,
            // 截断长内容以便查看
            content:
              m.content.length > 100
                ? m.content.substring(0, 100) + '...'
                : m.content,
          })),
        },
      });
    } catch (error) {
      console.error('Database test error:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  },

  /**
   * 查询指定用户的详细信息
   * GET /api/db/test/user/:userId
   */
  async getUserDetail(req: Request, res: Response) {
    const parseResult = userIdParamSchema.safeParse(req.params);
    if (!parseResult.success) {
      res.status(400).json(z.treeifyError(parseResult.error));
      return;
    }

    try {
      const { userId } = parseResult.data;

      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (user.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }

      // 查询该用户创建的会话
      const userConversations = await db
        .select()
        .from(conversations)
        .where(eq(conversations.createdBy, userId));

      // 查询该用户创建的消息
      const userMessages = await db
        .select()
        .from(messages)
        .where(eq(messages.createdBy, userId));

      res.json({
        success: true,
        data: {
          user: user[0],
          createdConversations: userConversations.length,
          createdMessages: userMessages.length,
          messagesByRole: {
            user: userMessages.filter((m) => m.role === 'user').length,
            assistant: userMessages.filter((m) => m.role === 'assistant')
              .length,
            system: userMessages.filter((m) => m.role === 'system').length,
          },
        },
      });
    } catch (error) {
      console.error('Get user detail error:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  },

  /**
   * 查询指定会话的详细信息
   * GET /api/db/test/conversation/:conversationId
   */
  async getConversationDetail(req: Request, res: Response) {
    const parseResult = conversationIdParamSchema.safeParse(req.params);
    if (!parseResult.success) {
      res.status(400).json(z.treeifyError(parseResult.error));
      return;
    }

    try {
      const { conversationId } = parseResult.data;

      const conversation = await db
        .select()
        .from(conversations)
        .where(
          and(
            eq(conversations.id, conversationId),
            isNull(conversations.deletedAt)
          )
        )
        .limit(1);

      if (conversation.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Conversation not found',
        });
      }

      // 查询该会话的所有消息
      const conversationMessages = await db
        .select()
        .from(messages)
        .where(
          and(
            eq(messages.conversationId, conversationId),
            isNull(messages.deletedAt)
          )
        );

      res.json({
        success: true,
        data: {
          conversation: conversation[0],
          messages: conversationMessages,
          messageCount: conversationMessages.length,
        },
      });
    } catch (error) {
      console.error('Get conversation detail error:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  },
};
