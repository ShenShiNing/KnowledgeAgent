import { db } from '../db/index.ts';
import { conversations, messages } from '../db/index.ts';
import { eq, asc, isNull, and } from 'drizzle-orm';
import { randomUUID } from 'crypto';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export const conversationRepository = {
  /**
   * Get all messages in a conversation (excluding soft-deleted ones)
   */
  async getLastResponse(conversationId: string): Promise<Array<Message>> {
    const result = await db
      .select({
        role: messages.role,
        content: messages.content,
      })
      .from(messages)
      .where(
        and(
          eq(messages.conversationId, conversationId),
          isNull(messages.deletedAt)
        )
      )
      .orderBy(asc(messages.createdAt));

    return result;
  },

  /**
   * Replace all messages in a conversation
   * This will soft delete existing messages and insert new ones
   */
  async setLastResponse(
    conversationId: string,
    response: Array<Message>,
    userId: string
  ) {
    await db.transaction(async (tx) => {
      // Ensure the conversation exists
      const existingConversation = await tx
        .select()
        .from(conversations)
        .where(
          and(
            eq(conversations.id, conversationId),
            isNull(conversations.deletedAt)
          )
        )
        .limit(1);

      if (existingConversation.length === 0) {
        // Create new conversation
        await tx.insert(conversations).values({
          id: conversationId,
          createdBy: userId,
          updatedBy: userId,
        });
      } else {
        // Update existing conversation
        await tx
          .update(conversations)
          .set({
            updatedBy: userId,
            updatedAt: new Date(),
          })
          .where(eq(conversations.id, conversationId));
      }

      // Soft delete existing messages
      await tx
        .update(messages)
        .set({
          deletedBy: userId,
          deletedAt: new Date(),
        })
        .where(
          and(
            eq(messages.conversationId, conversationId),
            isNull(messages.deletedAt)
          )
        );

      // Insert new messages
      if (response.length > 0) {
        await tx.insert(messages).values(
          response.map((msg) => ({
            id: randomUUID(),
            conversationId,
            role: msg.role,
            content: msg.content,
            createdBy: userId,
          }))
        );
      }
    });
  },

  /**
   * Add a user message to a conversation
   */
  async addUserMessage(
    conversationId: string,
    content: string,
    userId: string
  ) {
    await db.transaction(async (tx) => {
      // Check if conversation exists
      const existingConversation = await tx
        .select()
        .from(conversations)
        .where(
          and(
            eq(conversations.id, conversationId),
            isNull(conversations.deletedAt)
          )
        )
        .limit(1);

      if (existingConversation.length === 0) {
        // Create new conversation
        await tx.insert(conversations).values({
          id: conversationId,
          createdBy: userId,
          updatedBy: userId,
        });
      } else {
        // Update conversation timestamp
        await tx
          .update(conversations)
          .set({
            updatedBy: userId,
            updatedAt: new Date(),
          })
          .where(eq(conversations.id, conversationId));
      }

      // Insert user message
      await tx.insert(messages).values({
        id: randomUUID(),
        conversationId,
        role: 'user',
        content,
        createdBy: userId,
      });
    });
  },

  /**
   * Add an assistant message to a conversation
   */
  async addAssistantMessage(
    conversationId: string,
    content: string,
    userId: string
  ) {
    await db.transaction(async (tx) => {
      // Update conversation timestamp
      await tx
        .update(conversations)
        .set({
          updatedBy: userId,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(conversations.id, conversationId),
            isNull(conversations.deletedAt)
          )
        );

      // Insert assistant message
      await tx.insert(messages).values({
        id: randomUUID(),
        conversationId,
        role: 'assistant',
        content,
        createdBy: userId,
      });
    });
  },

  /**
   * Soft delete a conversation and all its messages
   */
  async deleteConversation(conversationId: string, userId: string) {
    await db.transaction(async (tx) => {
      // Soft delete conversation
      await tx
        .update(conversations)
        .set({
          deletedBy: userId,
          deletedAt: new Date(),
        })
        .where(
          and(
            eq(conversations.id, conversationId),
            isNull(conversations.deletedAt)
          )
        );

      // Soft delete all messages in the conversation
      await tx
        .update(messages)
        .set({
          deletedBy: userId,
          deletedAt: new Date(),
        })
        .where(
          and(
            eq(messages.conversationId, conversationId),
            isNull(messages.deletedAt)
          )
        );
    });
  },

  /**
   * Soft delete a specific message
   */
  async deleteMessage(messageId: string, userId: string) {
    await db
      .update(messages)
      .set({
        deletedBy: userId,
        deletedAt: new Date(),
      })
      .where(and(eq(messages.id, messageId), isNull(messages.deletedAt)));
  },
};
