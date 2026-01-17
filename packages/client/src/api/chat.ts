import apiClient from './client';
import type { ChatMessage } from '@/types/chat';

export type ChatResponse = {
  message: string;
};

export type ChatRequest = {
  prompt: string;
  conversationId: string;
};

/**
 * Send a chat message to the server
 */
export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  const { data } = await apiClient.post<ChatResponse>('/chat', request);
  return data;
}

/**
 * Get conversation history
 */
export async function getConversationHistory(
  conversationId: string
): Promise<ChatMessage[]> {
  const { data } = await apiClient.get<ChatMessage[]>(
    `/conversations/${conversationId}`
  );
  return data;
}
