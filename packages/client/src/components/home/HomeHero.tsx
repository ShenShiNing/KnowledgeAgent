import { Link } from '@tanstack/react-router';
import { ArrowRight, BadgeCheck, FileSearch, Sparkles } from 'lucide-react';
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
  const sourceItems = [
    t('hero.preview.sources.items.one'),
    t('hero.preview.sources.items.two'),
    t('hero.preview.sources.items.three'),
  ];
  const actionItems = [
    t('hero.preview.actions.items.one'),
    t('hero.preview.actions.items.two'),
    t('hero.preview.actions.items.three'),
  ];

  const stats = [
    {
      body: t('hero.preview.side.reviewBody'),
      label: t('hero.preview.side.reviewLabel'),
      value: t('hero.preview.side.reviewValue'),
    },
    {
      body: t('hero.preview.side.scopeBody'),
      label: t('hero.preview.side.scopeLabel'),
      value: t('hero.preview.side.scopeValue'),
    },
    {
      body: t('hero.preview.side.handoffBody'),
      label: t('hero.preview.side.handoffLabel'),
      value: t('hero.preview.side.handoffValue'),
    },
  ];

  return (
    <section id="product" className="px-4 pb-18 pt-8 md:px-6 md:pb-24 md:pt-12 lg:pt-14">
      <div className="mx-auto max-w-290">
        <div className="mx-auto max-w-185 text-center motion-reduce:animate-none animate-[home-rise_720ms_ease-out_both]">
          <p className="inline-flex items-center gap-3 rounded-full border border-(--home-border) bg-[rgba(255,252,247,0.76)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-(--home-text-soft)">
            <span className="h-2 w-2 rounded-full bg-[#b78347]" />
            {t('hero.eyebrow')}
          </p>

          <h1
            className={`mx-auto mt-7 flex max-w-[11ch] flex-col text-balance font-display text-[clamp(3.2rem,10vw,6.8rem)] font-semibold leading-none text-(--home-text-strong) ${isChineseHero ? 'gap-[0.14em] tracking-[-0.07em]' : 'gap-[0.08em] tracking-[-0.09em]'}`}
          >
            <span className={`block ${isChineseHero ? 'leading-[1.02]' : 'leading-[0.9]'}`}>
              {titleLineOne}
            </span>
            <span className="block bg-[linear-gradient(135deg,#201914_0%,#8f6534_52%,#cf9b59_100%)] bg-clip-text text-transparent">
              {titleLineTwo}
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-4xl text-[1.04rem] leading-8 text-(--home-text-muted) sm:text-[1.12rem]">
            {t('hero.summary')}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-(--home-text-soft) sm:text-[0.98rem]">
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

        <div className="mx-auto mt-14 max-w-6xl motion-reduce:animate-none animate-[home-rise_860ms_ease-out_both] [animation-delay:120ms]">
          <div className="relative overflow-hidden rounded-[36px] border border-(--home-border) bg-[rgba(255,249,242,0.74)] shadow-(--home-shadow) backdrop-blur-md">
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(93,68,39,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(93,68,39,0.04)_1px,transparent_1px)] bg-size-[36px_36px] opacity-35"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-30 bg-[radial-gradient(circle_at_top,rgba(205,157,98,0.2),transparent_74%)]"
            />

            <div className="relative grid lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--home-border) pb-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                      {t('hero.preview.kicker')}
                    </p>
                    <p className="mt-3 text-sm text-(--home-text-muted)">
                      {t('hero.preview.searchLabel')}
                    </p>
                    <p className="mt-1 font-display text-[1.4rem] font-semibold leading-[1.05] tracking-[-0.05em] text-(--home-text-strong)">
                      {t('hero.preview.searchValue')}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(183,131,71,0.18)] bg-[rgba(248,237,222,0.9)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7a5425]">
                    <Sparkles className="size-3.5" />
                    {t('hero.preview.answerBadge')}
                  </span>
                </div>

                <div className="pt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                    {t('hero.preview.answerLabel')}
                  </p>
                  <h2 className="mt-5 max-w-[12ch] font-display text-[clamp(2rem,3vw,3.1rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-(--home-text-strong)">
                    {t('hero.preview.answerTitle')}
                  </h2>
                  <p className="mt-5 max-w-3xl text-[1rem] leading-8 text-(--home-text-muted)">
                    {t('hero.preview.answerBody')}
                  </p>
                </div>

                <div className="mt-8 border-t border-(--home-border) pt-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex size-9 items-center justify-center rounded-full bg-[#1f1a16] text-[#faf7f2]">
                      <BadgeCheck className="size-4" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--home-text-soft)">
                        {t('hero.preview.reviewLabel')}
                      </p>
                      <p className="mt-1 max-w-3xl text-sm leading-7 text-(--home-text-muted)">
                        {t('hero.preview.reviewValue')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-5 border-t border-(--home-border) pt-6 sm:grid-cols-3">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className={
                        index > 0 ? 'sm:border-l sm:border-(--home-border) sm:pl-5' : undefined
                      }
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-(--home-text-soft)">
                        {stat.label}
                      </p>
                      <p className="mt-3 font-display text-[1.45rem] font-semibold tracking-[-0.05em] text-(--home-text-strong)">
                        {stat.value}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-(--home-text-muted)">{stat.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-(--home-border) p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                    {t('hero.preview.scopeLabel')}
                  </p>
                  <h3 className="mt-3 max-w-[16ch] font-display text-[1.7rem] font-semibold leading-[1.02] tracking-[-0.05em] text-(--home-text-strong)">
                    {t('hero.preview.sourcesTitle')}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-(--home-text-muted)">
                    {t('hero.preview.scopeValue')}
                  </p>
                </div>

                <div className="mt-6 border-t border-(--home-border)">
                  {sourceItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between gap-3 border-b border-(--home-border) py-4"
                    >
                      <span className="min-w-0 text-sm text-(--home-text-muted)">{item}</span>
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-(--home-text-soft)">
                        {t('hero.preview.sources.ready')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-(--home-border) pt-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full border border-(--home-border) bg-white/70 text-(--home-text-strong)">
                      <FileSearch className="size-4" />
                    </span>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                      {t('hero.preview.actionsLabel')}
                    </p>
                  </div>

                  <h3 className="mt-5 max-w-[14ch] font-display text-[1.7rem] font-semibold leading-[1.02] tracking-[-0.05em] text-(--home-text-strong)">
                    {t('hero.preview.actionsTitle')}
                  </h3>

                  <div className="mt-5 space-y-4">
                    {actionItems.map((item, index) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#1f1a16] text-[11px] font-semibold text-[#faf7f2]">
                          {index + 1}
                        </span>
                        <span className="text-sm leading-7 text-(--home-text-muted)">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
