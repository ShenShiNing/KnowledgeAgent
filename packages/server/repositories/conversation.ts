type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const conversations = new Map<string, Array<Message>>();

export const conversationRepository = {
  getLastResponse(conversationId: string): Array<Message> {
    return conversations.get(conversationId) || [];
  },

  setLastResponse(conversationId: string, response: Array<Message>) {
    conversations.set(conversationId, response);
  },

  addUserMessage(conversationId: string, content: string) {
    const messages = this.getLastResponse(conversationId);
    messages.push({ role: 'user', content });
    conversations.set(conversationId, messages);
  },

  addAssistantMessage(conversationId: string, content: string) {
    const messages = this.getLastResponse(conversationId);
    messages.push({ role: 'assistant', content });
    conversations.set(conversationId, messages);
  },
};
