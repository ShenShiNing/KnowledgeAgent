import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { HomeMetricCard } from './HomePrimitives';
import {
  homeHeroMetrics,
  homePrimaryButtonClass,
  homeSecondaryButtonClass,
} from './home-content';

type HomeHeroProps = {
  hasAuthSession: boolean;
};

export function HomeHero({ hasAuthSession }: HomeHeroProps) {
  const { t } = useTranslation('home');
  const primaryTarget = hasAuthSession ? '/dashboard' : '/auth/signup';
  const primaryLabel = hasAuthSession ? t('hero.primary.auth') : t('hero.primary.guest');
  const metrics = homeHeroMetrics.map((metric) => ({
    detail: t(metric.detailKey),
    label: t(metric.labelKey),
    value: t(metric.valueKey),
  }));

  return (
    <section className="px-4 pb-10 pt-32 md:px-6 md:pb-14 md:pt-40">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-10 border-b border-(--home-border) pb-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.68fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--home-text-soft)">
              {t('hero.eyebrow')}
            </p>
            <h1 className="font-editorial mt-6 max-w-4xl text-[clamp(3.5rem,9vw,7rem)] leading-[0.9] tracking-[-0.075em] text-(--home-text-strong)">
              <span className="block">{t('hero.title.lineOne')}</span>
              <span className="block">{t('hero.title.lineTwo')}</span>
              <span className="block">{t('hero.title.lineThree')}</span>
            </h1>
          </div>

          <div className="max-w-md lg:pt-4">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-(--home-text-soft)">
              {t('hero.status')}
            </p>
            <p className="mt-5 text-lg leading-8 text-(--home-text-strong)">{t('hero.summary')}</p>
            <p className="mt-5 text-base leading-7 text-(--home-text-muted)">{t('hero.support')}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button className={homePrimaryButtonClass} asChild>
                <Link to={primaryTarget}>
                  {primaryLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="ghost" className={homeSecondaryButtonClass} asChild>
                <a href="#releases">{t('hero.secondary')}</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <HomeMetricCard
              key={metric.label}
              detail={metric.detail}
              label={metric.label}
              value={metric.value}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
