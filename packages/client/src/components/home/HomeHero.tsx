import { Link } from '@tanstack/react-router';
import { ArrowRight, BadgeCheck, FileSearch, LockKeyhole } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { HomeMetricCard, HomeSignalPill } from './HomePrimitives';
import { homeHeroMetrics, homePrimaryButtonClass } from './home-content';

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
  const metrics = homeHeroMetrics.map((metric) => ({
    label: t(metric.labelKey),
    value: t(metric.valueKey),
  }));

  return (
    <section className="px-4 pb-18 pt-8 md:px-6 md:pb-24 md:pt-12 lg:pt-16">
      <div className="mx-auto max-w-290">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(390px,1fr)] lg:items-end xl:gap-14">
          <div className="max-w-175 motion-reduce:animate-none animate-[home-rise_720ms_ease-out_both]">
            <p className="inline-flex items-center gap-3 rounded-full border border-(--home-border) bg-[rgba(255,255,255,0.04)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-(--home-text-strong)">
              <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.78)]" />
              {t('hero.eyebrow')}
            </p>

            <h1
              className={`mt-7 flex max-w-[11ch] flex-col text-balance font-display text-[clamp(3.1rem,11vw,6.4rem)] font-extrabold leading-none text-(--home-text-strong) ${isChineseHero ? 'gap-[0.16em] tracking-[-0.06em]' : 'gap-[0.08em] tracking-[-0.09em] sm:gap-[0.1em]'}`}
            >
              <span className={`block ${isChineseHero ? 'leading-[1.04]' : 'leading-[0.9]'}`}>
                {titleLineOne}
              </span>
              {titleLineTwo ? (
                <span
                  className={`block text-[rgba(246,248,241,0.92)] ${isChineseHero ? 'font-display text-[0.92em] leading-[1.04] not-italic tracking-[-0.06em]' : 'pt-[0.03em] font-editorial text-[0.96em] leading-[0.94] italic tracking-[-0.05em]'}`}
                >
                  {titleLineTwo}
                </span>
              ) : null}
            </h1>

            <div className="mt-7 max-w-160 space-y-4">
              <p className="text-[1.02rem] leading-8 text-(--home-text-muted) sm:text-[1.08rem]">
                {t('hero.summary')}
              </p>
              <p className="max-w-152 text-sm leading-7 text-(--home-text-soft) sm:text-[0.98rem]">
                {t('hero.support')}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
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

            <div className="mt-10 flex flex-wrap gap-3">
              {signals.map((signal) => (
                <HomeSignalPill key={signal}>{signal}</HomeSignalPill>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <HomeMetricCard key={metric.label} label={metric.label} value={metric.value} />
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-140 motion-reduce:animate-none animate-[home-rise_860ms_ease-out_both] [animation-delay:120ms] lg:mx-0">
            <div
              aria-hidden
              className="absolute inset-x-8 -top-8 h-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_72%)] blur-2xl"
            />
            <div
              aria-hidden
              className="absolute -inset-5 rounded-[40px] border border-[rgba(255,255,255,0.08)] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)] opacity-80"
            />

            <div className="relative overflow-hidden rounded-[34px] border border-(--home-border-strong) bg-[linear-gradient(180deg,rgba(22,22,24,0.98),rgba(9,9,11,0.92))] p-4 shadow-(--home-shadow)">
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[34px_34px] opacity-[0.08]"
              />

              <div className="relative rounded-[28px] border border-(--home-border) bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.26)]">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                    {t('hero.console.eyebrow')}
                  </p>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.95)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#09090b]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#09090b]" />
                    {t('hero.console.status')}
                  </span>
                </div>

                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                  {t('hero.console.answerLabel')}
                </p>
                <p className="mt-3 max-w-[28ch] font-display text-[1.85rem] font-bold leading-[1.02] tracking-[-0.06em] text-(--home-text-strong)">
                  {t('hero.console.answerBody')}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-3 py-1.5 text-[11px] text-(--home-text-muted)">
                    {t('hero.console.citations.scope')}
                  </span>
                  <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-3 py-1.5 text-[11px] text-(--home-text-muted)">
                    {t('hero.console.citations.freshness')}
                  </span>
                  <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-3 py-1.5 text-[11px] text-(--home-text-muted)">
                    {t('hero.console.citations.access')}
                  </span>
                </div>
              </div>

              <div className="relative mt-4 grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
                <article className="overflow-hidden rounded-[26px] border border-(--home-border) bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
                  <span className="flex size-10 items-center justify-center rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-(--home-accent)">
                    <FileSearch className="size-4" />
                  </span>
                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-(--home-text-soft)">
                    {t('hero.console.scopeLabel')}
                  </p>
                  <h2 className="mt-3 max-w-[13ch] font-display text-[1.4rem] font-bold leading-[1.02] tracking-[-0.05em] text-(--home-text-strong)">
                    {t('hero.console.scopeTitle')}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-(--home-text-muted)">
                    {t('hero.console.scopeBody')}
                  </p>
                </article>

                <article className="overflow-hidden rounded-[26px] border border-(--home-border) bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-10 items-center justify-center rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-(--home-accent)">
                      <BadgeCheck className="size-4" />
                    </span>
                    <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.95)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#09090b]">
                      {t('hero.console.reviewLabel')}
                    </span>
                  </div>
                  <h2 className="mt-5 max-w-[11ch] font-display text-[1.4rem] font-bold leading-[1.02] tracking-[-0.05em] text-(--home-text-strong)">
                    {t('hero.console.reviewTitle')}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-(--home-text-muted)">
                    {t('hero.console.reviewBody')}
                  </p>

                  <div className="mt-6 space-y-2.5">
                    <div className="h-2 rounded-full bg-[rgba(255,255,255,0.08)]">
                      <div className="h-full w-[82%] rounded-full bg-[linear-gradient(90deg,#fafafa,#d4d4d8)]" />
                    </div>
                    <div className="h-2 rounded-full bg-[rgba(255,255,255,0.08)]">
                      <div className="h-full w-[68%] rounded-full bg-[linear-gradient(90deg,#a1a1aa,#d4d4d8)]" />
                    </div>
                    <div className="h-2 rounded-full bg-[rgba(255,255,255,0.08)]">
                      <div className="h-full w-[91%] rounded-full bg-[linear-gradient(90deg,#71717a,#a1a1aa)]" />
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <article className="absolute -left-6 top-9 hidden max-w-47.5 rounded-[22px] border border-(--home-border) bg-[rgba(12,12,14,0.94)] p-4 shadow-(--home-shadow-soft) lg:block">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-[14px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] text-(--home-text-strong)">
                  <BadgeCheck className="size-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-(--home-text-soft)">
                    {t('hero.console.floatingFresh')}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-(--home-text-strong)">
                    {t('hero.console.floatingFreshValue')}
                  </p>
                </div>
              </div>
            </article>

            <article className="absolute -bottom-5 right-6 hidden max-w-55 rounded-[22px] border border-(--home-border) bg-[rgba(12,12,14,0.94)] p-4 shadow-(--home-shadow-soft) lg:block">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-[14px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] text-(--home-text-strong)">
                  <LockKeyhole className="size-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-(--home-text-soft)">
                    {t('hero.console.floatingScope')}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-(--home-text-strong)">
                    {t('hero.console.floatingScopeValue')}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
