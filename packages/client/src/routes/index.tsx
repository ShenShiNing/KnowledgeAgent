import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-muted/40">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <MessageSquare className="size-8 text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Welcome to Knowledge Agent
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Your intelligent AI-powered assistant for answering questions and
          providing insights.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/auth/login">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/auth/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
