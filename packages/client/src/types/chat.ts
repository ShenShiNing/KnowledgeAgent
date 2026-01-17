export type MessageRole = 'user' | 'bot';

export type ChatMessage = {
  id: string;
  content: string;
  role: MessageRole;
  timestamp?: Date;
};

export type Conversation = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};
