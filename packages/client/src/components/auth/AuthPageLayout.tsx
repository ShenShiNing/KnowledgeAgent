import { Link } from '@tanstack/react-router';
import { Languages, Monitor, Moon, Sun } from 'lucide-react';
import { HomePreferenceMenu } from '@/components/home/HomePreferenceMenu';
import { homeGhostButtonClass, homePrimaryButtonClass } from '@/components/home/home-content';
import { LanguageToggle } from '@/components/i18n/LanguageToggle';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { useTheme } from '@/components/theme/theme-provider';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores';

type AuthHeaderVariant = 'default' | 'home';
type AuthBackgroundVariant = 'default' | 'home';

interface AuthPageLayoutProps {
  backgroundVariant?: AuthBackgroundVariant;
  children: React.ReactNode;
  title: string;
  description: string;
  footer: React.ReactNode;
  headerVariant?: AuthHeaderVariant;
}

function AuthHeader({ variant = 'default' }: { variant?: AuthHeaderVariant }) {
  const { t, i18n } = useTranslation(['auth', 'common', 'app', 'language']);
  const { theme, setTheme } = useTheme();
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasAuthSession = isAuthenticated || !!accessToken;
  const currentLanguage =
    i18n.resolvedLanguage === 'en-US' || i18n.language === 'en-US' ? 'en-US' : 'zh-CN';
  const themeOptions = [
    { label: t('userMenu.themeDark', { ns: 'app' }), value: 'dark' },
    { label: t('userMenu.themeLight', { ns: 'app' }), value: 'light' },
    { label: t('userMenu.themeSystem', { ns: 'app' }), value: 'system' },
  ] as const;
  const languageOptions = [
    { label: t('zh', { ns: 'language' }), value: 'zh-CN' },
    { label: t('en', { ns: 'language' }), value: 'en-US' },
  ] as const;
  const themeIcon =
    theme === 'dark' ? (
      <Moon className="size-4" />
    ) : theme === 'light' ? (
      <Sun className="size-4" />
    ) : (
      <Monitor className="size-4" />
    );

  const handleThemeChange = (value: string) => {
    if (value === 'dark' || value === 'light' || value === 'system') {
      setTheme(value);
    }
  };

  const handleLanguageChange = (value: string) => {
    if (value !== 'zh-CN' && value !== 'en-US') return;

    void i18n.changeLanguage(value);
    localStorage.setItem('groundpath.language', value);
    document.documentElement.lang = value;
  };

  if (variant === 'home') {
    const headerActionButtonClass =
      'hidden sm:inline-flex min-w-[6rem] justify-center rounded-full px-5 text-sm font-semibold';

    return (
      <header className="relative z-10 border-b border-(--home-border) bg-[var(--home-navbar-bg)] backdrop-blur-md">
        <div className="flex h-16 w-full items-center justify-between gap-3 px-4 md:px-6">
          <Link
            to={hasAuthSession ? '/dashboard' : '/'}
            className="min-w-0 font-display text-lg font-semibold tracking-[-0.05em] text-(--home-text-strong) transition-opacity hover:opacity-85"
          >
            <span className="block truncate">{t('brand', { ns: 'common' })}</span>
          </Link>

          <div className="flex items-center justify-end gap-3">
            <HomePreferenceMenu
              ariaLabel="Theme"
              icon={themeIcon}
              onValueChange={handleThemeChange}
              options={themeOptions}
              value={theme}
            />
            <HomePreferenceMenu
              ariaLabel="Language"
              icon={<Languages className="size-4" />}
              onValueChange={handleLanguageChange}
              options={languageOptions}
              value={currentLanguage}
            />
            <Button
              variant="ghost"
              className={cn(homeGhostButtonClass, headerActionButtonClass)}
              asChild
            >
              <Link to="/">{t('header.home')}</Link>
            </Button>
            {hasAuthSession && (
              <Button
                className={cn(
                  homePrimaryButtonClass,
                  'hidden sm:inline-flex min-w-[8.75rem] justify-center rounded-full px-5 text-sm font-semibold'
                )}
                asChild
              >
                <Link to="/dashboard">{t('header.console')}</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="relative z-10 border-b border-border/60 bg-background/88 backdrop-blur-md">
      <div className="flex h-16 w-full items-center justify-between gap-3 px-4">
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
    </header>
  );
}

export function AuthPageLayout({
  backgroundVariant = 'default',
  children,
  title,
  description,
  footer,
  headerVariant = 'default',
}: AuthPageLayoutProps) {
  const isHomeBackground = backgroundVariant === 'home';

  return (
    <div
      className={cn(
        'relative flex min-h-screen flex-col overflow-hidden',
        isHomeBackground ? 'bg-(--home-app-bg) text-(--home-text-strong)' : 'bg-background'
      )}
    >
      <AuthHeader variant={headerVariant} />

      {isHomeBackground ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[var(--home-backdrop-base)]" />
          <div className="absolute -left-18 top-12 h-88 w-88 rounded-full bg-[var(--home-backdrop-glow-left)] blur-3xl" />
          <div className="absolute -right-12 top-0 h-96 w-96 rounded-full bg-[var(--home-backdrop-glow-right)] blur-3xl motion-reduce:animate-none animate-[home-drift_18s_ease-in-out_infinite]" />
          <div className="absolute left-1/2 top-82 h-132 w-272 -translate-x-1/2 rounded-full bg-[var(--home-backdrop-glow-center)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--home-backdrop-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--home-backdrop-grid)_1px,transparent_1px)] bg-size-[80px_80px] opacity-28" />
        </div>
      ) : (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-80 w-176 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -left-20 bottom-8 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
        </div>
      )}

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md py-8">
          <div className="mb-8 flex flex-col items-center space-y-2 text-center">
            <h1
              className={cn(
                'font-display text-2xl font-semibold tracking-tight',
                isHomeBackground && 'text-(--home-text-strong)'
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                'text-sm',
                isHomeBackground ? 'text-(--home-text-muted)' : 'text-muted-foreground'
              )}
            >
              {description}
            </p>
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
