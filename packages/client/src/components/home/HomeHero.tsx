import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { HomeSignalPill } from './HomePrimitives';
import { homeGhostButtonClass, homePrimaryButtonClass } from './home-content';

type HomeHeroProps = {
  hasAuthSession: boolean;
};

export function HomeHero({ hasAuthSession }: HomeHeroProps) {
  const { t, i18n } = useTranslation('home');
  const primaryTarget = hasAuthSession ? '/dashboard' : '/auth/signup';
  const primaryLabel = hasAuthSession ? t('hero.primary.auth') : t('hero.primary.guest');
  const titleLineOne = t('hero.title.lineOne');
  const titleLineTwo = t('hero.title.lineTwo');
  const isChineseHero = /^zh/i.test(i18n.resolvedLanguage ?? i18n.language);

  const signals = [t('hero.signals.sources'), t('hero.signals.scope'), t('hero.signals.review')];

  return (
    <section className="px-4 pb-14 pt-8 md:px-6 md:pb-18 md:pt-12 lg:pt-14">
      <div className="mx-auto max-w-290">
        <div className="mx-auto max-w-185 text-center motion-reduce:animate-none animate-[home-rise_720ms_ease-out_both]">
          <p className="inline-flex items-center gap-3 rounded-full border border-(--home-border) bg-[rgba(255,252,247,0.76)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-(--home-text-soft)">
            <span className="h-2 w-2 rounded-full bg-[#b78347]" />
            {t('hero.eyebrow')}
          </p>

          <h1
            className={`mx-auto mt-7 max-w-[11ch] text-balance font-display text-[clamp(3.2rem,10vw,6.8rem)] font-semibold text-(--home-text-strong) ${isChineseHero ? 'space-y-2 leading-[1.08] tracking-[-0.05em]' : 'space-y-1.5 leading-[0.98] tracking-[-0.07em]'}`}
          >
            <span className="block">{titleLineOne}</span>
            <span className="block bg-[linear-gradient(135deg,#201914_0%,#8f6534_52%,#cf9b59_100%)] bg-clip-text text-transparent">
              {titleLineTwo}
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-4xl text-[1.04rem] leading-[1.78] text-(--home-text-muted) sm:text-[1.12rem]">
            {t('hero.summary')}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-[1.72] text-(--home-text-soft) sm:text-[0.98rem]">
            {t('hero.support')}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button className={homePrimaryButtonClass} asChild>
              <Link to={primaryTarget}>
                {primaryLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button variant="ghost" className={`${homeGhostButtonClass} bg-transparent`} asChild>
              <Link to="/about">{t('hero.secondary')}</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {signals.map((signal) => (
              <HomeSignalPill key={signal}>{signal}</HomeSignalPill>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
