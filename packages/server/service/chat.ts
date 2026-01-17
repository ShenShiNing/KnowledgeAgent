import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation';
import { SYSTEM_USER_ID } from '../db/system-user';
import template from '../prompts/chatbox.txt';

type chatResponse = {
  id: string;
  message: string | null | undefined;
};

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

const knowledgeAgentInfo = fs.readFileSync(
  path.join(__dirname, '..', 'prompts', 'KnowledgeAgent.md'),
  'utf-8'
);
const instructions = template.replace(
  '{{knowledgeAgentInfo}}',
  knowledgeAgentInfo
);

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string,
    userId: string = SYSTEM_USER_ID
  ): Promise<chatResponse> {
    // Add user message to conversation
    await conversationRepository.addUserMessage(conversationId, prompt, userId);

    // Get conversation history
    const conversationMessages =
      await conversationRepository.getLastResponse(conversationId);

    // Prepend system instruction to every request
    const messages = [
      { role: 'system' as const, content: instructions },
      ...conversationMessages,
    ];

    // Call OpenAI Chat Completions API
    const response = await client.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: messages,
      temperature: 0.2,
      max_tokens: 200,
    });

    // Get assistant reply
    const assistantMessage = response.choices[0]?.message?.content || '';

    // Add assistant message to conversation
    await conversationRepository.addAssistantMessage(
      conversationId,
      assistantMessage,
      userId
    );

    return {
      id: response.id,
      message: response.choices[0]?.message.content,
    };
  },
};
