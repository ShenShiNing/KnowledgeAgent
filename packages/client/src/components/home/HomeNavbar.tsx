import { Link, useRouter } from '@tanstack/react-router';
import {
  ChevronDown,
  Languages,
  LayoutDashboard,
  LogOut,
  Monitor,
  Moon,
  Sun,
  User,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme/theme-provider';
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
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores';
import { homeGhostButtonClass, homeNavItems, homePrimaryButtonClass } from './home-content';

function getUserInitials(username?: string, email?: string): string {
  if (username) return username.slice(0, 2).toUpperCase();
  if (email) return email.slice(0, 2).toUpperCase();
  return 'U';
}

type HomePreferenceMenuProps = {
  ariaLabel: string;
  className?: string;
  icon: React.ReactNode;
  onValueChange: (value: string) => void;
  options: ReadonlyArray<{
    label: string;
    value: string;
  }>;
  value: string;
};

function HomePreferenceMenu({
  ariaLabel,
  className,
  icon,
  onValueChange,
  options,
  value,
}: HomePreferenceMenuProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className={cn(
            'hidden h-9 w-9 rounded-full bg-transparent p-0 text-(--home-text-strong) shadow-none transition-colors hover:bg-white/75 hover:text-(--home-text-strong) focus-visible:ring-[#1f1a16] sm:inline-flex',
            className
          )}
          aria-label={ariaLabel}
          title={ariaLabel}
        >
          {icon}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-40 border-(--home-border) bg-[rgba(255,250,244,0.98)] text-(--home-text-strong) shadow-(--home-shadow)"
      >
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
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
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation('language');
  const workspaceTarget = hasAuthSession ? '/dashboard' : '/auth/signup';
  const currentLanguage =
    i18n.resolvedLanguage === 'en-US' || i18n.language === 'en-US' ? 'en-US' : 'zh-CN';
  const headerActionButtonClass =
    'h-11 min-w-[8.75rem] justify-center rounded-full px-5 text-sm font-semibold';
  const themeOptions = [
    { label: 'dark', value: 'dark' },
    { label: 'light', value: 'light' },
    { label: 'system', value: 'system' },
  ] as const;
  const languageOptions = [
    { label: 'Chinese', value: 'zh-CN' },
    { label: 'English', value: 'en-US' },
  ] as const;
  const themeIcon =
    theme === 'dark' ? (
      <Moon className="size-4.5" />
    ) : theme === 'light' ? (
      <Sun className="size-4.5" />
    ) : (
      <Monitor className="size-4.5" />
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

  return (
    <header className="sticky top-0 z-50 border-b border-(--home-border) bg-[rgba(246,240,230,0.82)] backdrop-blur-xl">
      <div className="grid h-16 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Link
          to="/"
          className="min-w-0 font-display text-lg font-semibold tracking-[-0.05em] text-(--home-text-strong) transition-opacity hover:opacity-85"
        >
          <span className="block truncate">{t('brand', { ns: 'common' })}</span>
        </Link>

        <nav className="hidden items-center justify-center gap-6 lg:flex">
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

        <div className="flex items-center justify-end gap-3">
          <div className="hidden items-center gap-1 rounded-full border border-(--home-border) bg-[rgba(255,250,244,0.7)] p-1 shadow-[0_10px_24px_rgba(61,43,24,0.04)] sm:inline-flex">
            <HomePreferenceMenu
              ariaLabel="Theme"
              icon={themeIcon}
              onValueChange={handleThemeChange}
              options={themeOptions}
              value={theme}
            />
            <span className="h-5 w-px bg-(--home-border)" />
            <HomePreferenceMenu
              ariaLabel="Language"
              icon={<Languages className="size-4.5" />}
              onValueChange={handleLanguageChange}
              options={languageOptions}
              value={currentLanguage}
            />
          </div>
          {hasAuthSession ? (
            <>
              <Button
                className={cn(
                  homePrimaryButtonClass,
                  'hidden sm:inline-flex',
                  headerActionButtonClass
                )}
                asChild
              >
                <Link to={workspaceTarget}>{t('dashboard', { ns: 'common' })}</Link>
              </Button>
              <HomeUserMenu />
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className={cn(
                  homeGhostButtonClass,
                  'hidden sm:inline-flex',
                  headerActionButtonClass
                )}
                asChild
              >
                <Link to="/auth/login">{t('login')}</Link>
              </Button>
              <Button className={cn(homePrimaryButtonClass, headerActionButtonClass)} asChild>
                <Link to={workspaceTarget}>{t('getStarted')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
