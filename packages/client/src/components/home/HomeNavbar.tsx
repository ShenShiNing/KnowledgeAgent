import { Link, useRouter } from '@tanstack/react-router';
import { ChevronDown, LayoutDashboard, LogOut, Monitor, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoMark from '@/assets/brand/logo-mark.svg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores';
import { homeGhostButtonClass, homeNavItems, homePrimaryButtonClass } from './home-content';

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

  const handleLogout = async () => {
    await logout();
    await router.navigate({ to: '/' });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="group flex h-10 items-center gap-2 rounded-full border border-(--home-border) bg-[rgba(255,252,247,0.78)] px-2 py-1.5 text-(--home-text-strong) shadow-[0_12px_24px_rgba(61,43,24,0.05)] transition-colors hover:border-[rgba(95,67,38,0.18)] hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1a16]"
          aria-label={t('openUserMenu')}
        >
          <Avatar size="sm">
            <AvatarImage src={user?.avatarUrl ?? undefined} alt={displayName} />
            <AvatarFallback className="bg-[#1f1a16] text-[#faf7f2]">{initials}</AvatarFallback>
          </Avatar>
          <ChevronDown className="size-3.5 text-(--home-text-soft) transition-transform group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 border-(--home-border) bg-[rgba(255,250,244,0.98)] text-(--home-text-strong) shadow-(--home-shadow)"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-(--home-text-soft)">{user?.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-(--home-border)" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            asChild
            className="cursor-pointer text-(--home-text-strong) focus:bg-[rgba(31,26,22,0.06)] focus:text-(--home-text-strong)"
          >
            <Link to="/dashboard">
              <LayoutDashboard className="mr-2 size-4" />
              {t('dashboard', { ns: 'common' })}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="cursor-pointer text-(--home-text-strong) focus:bg-[rgba(31,26,22,0.06)] focus:text-(--home-text-strong)"
          >
            <Link to="/profile">
              <User className="mr-2 size-4" />
              {t('profile', { ns: 'common' })}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="cursor-pointer text-(--home-text-strong) focus:bg-[rgba(31,26,22,0.06)] focus:text-(--home-text-strong)"
          >
            <Link to="/sessions">
              <Monitor className="mr-2 size-4" />
              {t('sessions', { ns: 'common' })}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-(--home-border)" />

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer text-(--home-text-strong) focus:bg-[rgba(255,95,95,0.12)]"
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

type HomeNavbarProps = {
  hasAuthSession: boolean;
};

export function HomeNavbar({ hasAuthSession }: HomeNavbarProps) {
  const { t } = useTranslation(['home', 'common']);
  const workspaceTarget = hasAuthSession ? '/dashboard' : '/auth/signup';

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6 md:pt-5">
      <div className="mx-auto max-w-290">
        <div className="flex items-center justify-between gap-4 rounded-full border border-(--home-border) bg-[rgba(250,246,239,0.78)] px-4 py-3 shadow-[0_14px_32px_rgba(61,43,24,0.06)] backdrop-blur-xl md:px-5">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2.5 text-(--home-text-strong) transition-opacity hover:opacity-85"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-(--home-border) bg-white/74 shadow-[0_10px_24px_rgba(61,43,24,0.05)]">
              <img src={logoMark} alt="" className="h-4.5 w-4.5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-(--home-text-strong)">
                {t('brand', { ns: 'common' })}
              </span>
              <span className="hidden truncate text-[10px] uppercase tracking-[0.2em] text-(--home-text-soft) lg:block">
                {t('nav.kicker')}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {homeNavItems.map((item) =>
              'href' in item ? (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--home-text-soft) transition-colors hover:text-(--home-text-strong)"
                >
                  {t(item.key)}
                </a>
              ) : (
                <Link
                  key={item.key}
                  to={item.route}
                  className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--home-text-soft) transition-colors hover:text-(--home-text-strong)"
                >
                  {t(item.key)}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            {hasAuthSession ? (
              <>
                <Button className={`${homePrimaryButtonClass} hidden sm:inline-flex`} asChild>
                  <Link to={workspaceTarget}>{t('dashboard', { ns: 'common' })}</Link>
                </Button>
                <HomeUserMenu />
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className={`${homeGhostButtonClass} hidden sm:inline-flex`}
                  asChild
                >
                  <Link to="/auth/login">{t('login')}</Link>
                </Button>
                <Button className={homePrimaryButtonClass} asChild>
                  <Link to={workspaceTarget}>{t('getStarted')}</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
