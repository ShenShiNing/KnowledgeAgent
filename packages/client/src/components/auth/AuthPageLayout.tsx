import { Link } from '@tanstack/react-router';
import { LanguageToggle } from '@/components/i18n/LanguageToggle';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores';

interface AuthPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  footer: React.ReactNode;
}

function AuthHeader() {
  const { t } = useTranslation(['auth', 'common']);
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasAuthSession = isAuthenticated || !!accessToken;

  return (
    <header className="relative z-10 border-b border-border/60 bg-background/88 px-4 backdrop-blur-md">
      <div className="container">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3">
          <Link
            to={hasAuthSession ? '/dashboard' : '/'}
            className="min-w-0 font-display text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-85"
          >
            <span className="truncate">{t('brand', { ns: 'common' })}</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden cursor-pointer sm:inline-flex"
              asChild
            >
              <Link to="/">{t('header.home')}</Link>
            </Button>
            {hasAuthSession && (
              <Button size="sm" className="hidden cursor-pointer sm:inline-flex" asChild>
                <Link to="/dashboard">{t('header.console')}</Link>
              </Button>
            )}
            <LanguageToggle />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export function AuthPageLayout({ children, title, description, footer }: AuthPageLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <AuthHeader />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-176 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-20 bottom-8 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md py-8">
          <div className="mb-8 flex flex-col items-center space-y-2 text-center">
            <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {children}

          {footer}
        </div>
      </div>
    </div>
  );
}

interface AuthFooterLinkProps {
  text: string;
  linkText: string;
  linkTo: string;
}

export function AuthFooterLink({ text, linkText, linkTo }: AuthFooterLinkProps) {
  return (
    <p className="text-center text-sm text-muted-foreground mt-6">
      {text}{' '}
      <Link to={linkTo} className="font-semibold hover:underline underline-offset-4 cursor-pointer">
        {linkText}
      </Link>
    </p>
  );
}
