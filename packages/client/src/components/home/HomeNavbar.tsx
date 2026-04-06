import { useCallback } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { ChevronDown, LayoutDashboard, LogOut, Monitor, Moon, Sun, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoMark from '@/assets/brand/logo-mark.svg';
import { LanguageToggle } from '@/components/i18n/LanguageToggle';
import { useTheme } from '@/components/theme/theme-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores';
import {
  homeGhostButtonClass,
  homeNavItems,
  homePrimaryButtonClass,
} from './home-content';

function getUserInitials(username?: string, email?: string): string {
  if (username) return username.slice(0, 2).toUpperCase();
  if (email) return email.slice(0, 2).toUpperCase();
  return 'U';
}

function HomeUserMenu() {
  const { t } = useTranslation(['home', 'common']);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const displayName = user?.username ?? t('user', { ns: 'common' });
  const initials = getUserInitials(user?.username, user?.email);

  const handleLogout = useCallback(async () => {
    await logout();
    await router.navigate({ to: '/' });
  }, [logout, router]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="group flex items-center gap-2 rounded-full border border-(--home-border) bg-(--home-surface) px-2 py-1.5 text-(--home-text-strong) shadow-[var(--home-shadow-soft)] backdrop-blur-md transition-colors hover:bg-(--home-surface-soft) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--home-accent)]"
          aria-label={t('openUserMenu')}
        >
          <Avatar size="sm">
            <AvatarImage src={user?.avatarUrl ?? undefined} alt={displayName} />
            <AvatarFallback className="bg-[color:var(--home-accent-soft)] text-(--home-text-strong)">
              {initials}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="size-3.5 text-(--home-text-soft) transition-transform group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/dashboard">
              <LayoutDashboard className="mr-2 size-4" />
              {t('dashboard', { ns: 'common' })}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/profile">
              <User className="mr-2 size-4" />
              {t('profile', { ns: 'common' })}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/sessions">
              <Monitor className="mr-2 size-4" />
              {t('sessions', { ns: 'common' })}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onSelect={() => {
            void handleLogout();
          }}
        >
          <LogOut className="mr-2 size-4" />
          {t('logout', { ns: 'common' })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HomeThemeMenu() {
  const { t } = useTranslation(['home', 'common', 'app']);
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full border border-(--home-border) bg-(--home-surface) text-(--home-text-strong) shadow-[var(--home-shadow-soft)] transition-colors hover:bg-(--home-surface-soft)"
        >
          <Sun className="size-4 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-4 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{t('theme.toggle', { ns: 'home' })}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
        >
          <DropdownMenuRadioItem value="light">
            {t('userMenu.themeLight', { ns: 'app' })}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            {t('userMenu.themeDark', { ns: 'app' })}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            {t('userMenu.themeSystem', { ns: 'app' })}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type HomeNavbarProps = {
  hasAuthSession: boolean;
};

export function HomeNavbar({ hasAuthSession }: HomeNavbarProps) {
  const { t } = useTranslation(['home', 'common']);
  const workspaceTarget = hasAuthSession ? '/dashboard' : '/auth/signup';

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4 rounded-full border border-(--home-border-strong) bg-[rgba(244,238,228,0.76)] px-4 py-2.5 shadow-[var(--home-shadow-soft)] backdrop-blur-md dark:bg-[rgba(22,18,14,0.82)]">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 text-(--home-text-strong) transition-opacity hover:opacity-85"
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-(--home-border) bg-(--home-surface)">
            <img src={logoMark} alt="" className="size-6" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[0.02em]">
              {t('brand', { ns: 'common' })}
            </p>
            <p className="hidden truncate text-[11px] uppercase tracking-[0.18em] text-(--home-text-soft) md:block">
              {t('nav.kicker')}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {homeNavItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-[13px] font-medium uppercase tracking-[0.12em] text-(--home-text-soft) transition-colors hover:text-(--home-text-strong)"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle
            compact
            className="hidden rounded-full border border-(--home-border) bg-(--home-surface) text-(--home-text-strong) shadow-[var(--home-shadow-soft)] hover:bg-(--home-surface-soft) sm:inline-flex"
          />
          <HomeThemeMenu />

          {hasAuthSession ? (
            <HomeUserMenu />
          ) : (
            <>
              <Button variant="ghost" className={homeGhostButtonClass} asChild>
                <Link to="/auth/login">{t('login')}</Link>
              </Button>
              <Button className={homePrimaryButtonClass} asChild>
                <Link to={workspaceTarget}>{t('getStarted')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
