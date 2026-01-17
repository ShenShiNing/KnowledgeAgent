import { useState, useRef, useCallback } from 'react';
import { sendMessage } from '@/api/chat';
import type { ChatMessage } from '@/types/chat';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const conversationId = useRef(crypto.randomUUID());

  const sendMessageToBot = useCallback(async (prompt: string) => {
    try {
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: prompt,
        role: 'user',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsBotTyping(true);
      setError(null);

      const response = await sendMessage({
        prompt,
        conversationId: conversationId.current,
      });

      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: response.message,
        role: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Something went wrong, please try again!');
    } finally {
      setIsBotTyping(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    conversationId.current = crypto.randomUUID();
  }, []);

  return {
    messages,
    isBotTyping,
    error,
    sendMessage: sendMessageToBot,
    clearMessages,
  };
}
