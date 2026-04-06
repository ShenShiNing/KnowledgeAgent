import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { homePrimaryButtonClass } from './home-content';

type HomeHeroProps = {
  hasAuthSession: boolean;
};

export function HomeHero({ hasAuthSession }: HomeHeroProps) {
  const { t } = useTranslation('home');
  const primaryTarget = hasAuthSession ? '/dashboard' : '/auth/signup';
  const primaryLabel = hasAuthSession ? t('hero.primary.auth') : t('hero.primary.guest');
  const titleLineOne = t('hero.title.lineOne');
  const titleLineTwo = t('hero.title.lineTwo');

  return (
    <section className="px-4 pb-20 pt-18 md:px-6 md:pb-28 md:pt-28">
      <div className="mx-auto max-w-[1120px]">
        <div className="motion-safe:animate-[home-rise_0.9s_ease-out_both] text-center">
          <p className="mx-auto inline-flex items-center rounded-full border border-[rgba(214,255,22,0.16)] bg-[rgba(214,255,22,0.06)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-(--home-accent)">
            {t('hero.eyebrow')}
          </p>

          <h1 className="mx-auto mt-8 max-w-[10ch] font-display text-[clamp(3.5rem,10vw,6.15rem)] font-extrabold leading-[0.88] tracking-[-0.085em] text-(--home-text-strong)">
            <span className="block">{titleLineOne}</span>
            {titleLineTwo ? <span className="block">{titleLineTwo}</span> : null}
          </h1>

          <div className="mx-auto mt-7 max-w-[720px] space-y-4">
            <p className="text-[0.98rem] leading-7 text-(--home-text-muted) sm:text-[1.04rem]">
              {t('hero.summary')}
            </p>
            <p className="mx-auto max-w-[620px] text-sm leading-7 text-(--home-text-soft) sm:text-[0.97rem]">
              {t('hero.support')}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <Button className={homePrimaryButtonClass} asChild>
              <Link to={primaryTarget}>
                {primaryLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-(--home-text-soft) transition-colors hover:text-(--home-text-strong)"
            >
              {t('hero.secondary')}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
