import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation';

type chatResponse = {
  id: string;
  message: string | null | undefined;
};

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string
  ): Promise<chatResponse> {
    // Add user message to conversation
    conversationRepository.addUserMessage(conversationId, prompt);

    // Get conversation history
    const messages = conversationRepository.getLastResponse(conversationId);

    // Call OpenAI Chat Completions API
    const response = await client.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: messages,
      temperature: 0.2,
      max_tokens: 100,
    });

    // Get assistant reply
    const assistantMessage = response.choices[0]?.message?.content || '';

    // Add assistant message to conversation
    conversationRepository.addAssistantMessage(
      conversationId,
      assistantMessage
    );

    return {
      id: response.id,
      message: response.choices[0]?.message.content,
    };
  },
};
