import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, type Language } from '@/i18n';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  compact?: boolean;
  className?: string;
}

export function LanguageToggle({ compact = false, className }: LanguageToggleProps) {
  const { t, i18n } = useTranslation(['language', 'common']);
  const language =
    SUPPORTED_LANGUAGES.find((lng) => lng === i18n.resolvedLanguage || lng === i18n.language) ??
    DEFAULT_LANGUAGE;
  const label = language === 'zh-CN' ? t('zh', { ns: 'language' }) : t('en', { ns: 'language' });
  const compactLabel = language === 'zh-CN' ? '中' : 'EN';

  const handleLanguageChange = (value: string) => {
    if (value !== 'zh-CN' && value !== 'en-US') return;

    void i18n.changeLanguage(value as Language);
    localStorage.setItem('groundpath.language', value);
    document.documentElement.lang = value;
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size={compact ? 'sm' : 'sm'}
          className={cn('cursor-pointer gap-2', className)}
          aria-label={t('switch', { ns: 'language' })}
          title={t('switch', { ns: 'language' })}
        >
          <Languages className="size-4" />
          {compact ? (
            <span className="text-[11px] font-semibold">{compactLabel}</span>
          ) : (
            <span className="text-xs">{label}</span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
          <DropdownMenuRadioItem value="zh-CN">{t('zh', { ns: 'language' })}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en-US">{t('en', { ns: 'language' })}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
