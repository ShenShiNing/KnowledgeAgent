import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import type { ChatMessage } from '@/types/chat';

type ChatMessagesProps = {
  messages: ChatMessage[];
};

export function ChatMessages({ messages }: ChatMessagesProps) {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onCopyMessage = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {messages.map((message, index) => (
        <div
          key={message.id}
          onCopy={onCopyMessage}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          className={`px-3 py-2 rounded-xl max-w-[80%] ${
            message.role === 'user'
              ? 'bg-blue-600 text-white self-end ml-auto'
              : 'bg-gray-100 text-black self-start mr-auto'
          }`}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
}
