import type { KeyboardEvent } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useChat } from '@/hooks';
import { ChatMessages } from './ChatMessages';
import { TypingIndicator } from './TypingIndicator';

export function ChatBot() {
  const { messages, isBotTyping, error, sendMessage } = useChat();
  const { register, handleSubmit, reset, formState } = useForm<{
    prompt: string;
  }>();

  const onSubmit = handleSubmit((data) => {
    if (data.prompt.trim()) {
      sendMessage(data.prompt);
      reset();
    }
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 gap-3 overflow-y-auto">
        <ChatMessages messages={messages} />
        {isBotTyping && <TypingIndicator />}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <form
        onSubmit={onSubmit}
        onKeyDown={handleKeyDown}
        className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl mt-4"
      >
        <textarea
          {...register('prompt', {
            required: true,
            validate: (data) => data.trim().length > 0,
          })}
          autoFocus
          className="w-full border-0 focus:outline-0 resize-none bg-transparent"
          placeholder="Ask anything"
          maxLength={1000}
          rows={1}
          disabled={isBotTyping}
        />
        <Button
          disabled={!formState.isValid || isBotTyping}
          className="rounded-full w-9 h-9"
        >
          <FaArrowUp />
        </Button>
      </form>
    </div>
  );
}
