import { createFileRoute, redirect } from '@tanstack/react-router';
import { ChatBot } from '@/components/chat/ChatBot';
import { useAuthStore } from '@/store';

// Protected route loader
const protectedLoader = () => {
  const { accessToken } = useAuthStore.getState();
  if (!accessToken) {
    throw redirect({ to: '/auth/login' });
  }
  return null;
};

export const Route = createFileRoute('/chat')({
  beforeLoad: protectedLoader,
  component: ChatPage,
});

function ChatPage() {
  return (
    <div className="container mx-auto h-[calc(100vh-3.5rem)] max-w-4xl p-4">
      <ChatBot />
    </div>
  );
}
