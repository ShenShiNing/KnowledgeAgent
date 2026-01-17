import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { MessageSquare, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store';

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});

function Header() {
  const { token, clearAuth } = useAuthStore();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <MessageSquare className="size-5" />
          <span>Knowledge Agent</span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-4">
          {token ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/chat">Chat</Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={clearAuth}>
                <LogOut className="size-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth/login">Sign In</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
