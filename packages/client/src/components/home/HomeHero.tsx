import { Link } from '@tanstack/react-router';
import { ArrowRight, BadgeCheck, FileSearch, LockKeyhole, Sparkles } from 'lucide-react';
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

  return (
    <section id="product" className="px-4 pb-18 pt-8 md:px-6 md:pb-24 md:pt-12 lg:pt-14">
      <div className="mx-auto max-w-290">
        <div className="mx-auto max-w-185 text-center motion-reduce:animate-none animate-[home-rise_720ms_ease-out_both]">
          <p className="inline-flex items-center gap-3 rounded-full border border-(--home-border) bg-[rgba(255,252,247,0.84)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-(--home-text-soft) shadow-[0_14px_28px_rgba(61,43,24,0.06)]">
            <span className="h-2 w-2 rounded-full bg-[#b78347]" />
            {t('hero.eyebrow')}
          </p>

          <h1
            className={`mx-auto mt-7 flex max-w-[11ch] flex-col text-balance font-display text-[clamp(3.4rem,11vw,7.2rem)] font-semibold leading-none text-(--home-text-strong) ${isChineseHero ? 'gap-[0.14em] tracking-[-0.07em]' : 'gap-[0.08em] tracking-[-0.09em]'}`}
          >
            <span className={`block ${isChineseHero ? 'leading-[1.02]' : 'leading-[0.9]'}`}>
              {titleLineOne}
            </span>
            <span className="block bg-[linear-gradient(135deg,#201914_0%,#8f6534_52%,#cf9b59_100%)] bg-clip-text text-transparent">
              {titleLineTwo}
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-4xl text-[1.06rem] leading-8 text-(--home-text-muted) sm:text-[1.14rem]">
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

        <div className="relative mx-auto mt-14 max-w-6xl motion-reduce:animate-none animate-[home-rise_860ms_ease-out_both] [animation-delay:120ms]">
          <div
            aria-hidden
            className="absolute left-1/2 top-10 h-52 w-[72%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(205,157,98,0.24),transparent_70%)] blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -left-10 top-24 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.78),transparent_68%)] blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -right-8 top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(226,206,180,0.66),transparent_68%)] blur-3xl"
          />

          <article className="absolute -left-8 top-18 hidden max-w-52 rounded-[24px] border border-(--home-border) bg-[rgba(255,252,247,0.88)] p-4 shadow-(--home-shadow-soft) xl:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-(--home-text-soft)">
              {t('hero.preview.floating.left.label')}
            </p>
            <p className="mt-2 font-display text-[1.2rem] font-semibold tracking-[-0.04em] text-(--home-text-strong)">
              {t('hero.preview.floating.left.value')}
            </p>
          </article>

          <article className="absolute -right-8 top-14 hidden max-w-56 rounded-[24px] border border-(--home-border) bg-[rgba(255,252,247,0.88)] p-4 shadow-(--home-shadow-soft) xl:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-(--home-text-soft)">
              {t('hero.preview.floating.right.label')}
            </p>
            <p className="mt-2 font-display text-[1.2rem] font-semibold tracking-[-0.04em] text-(--home-text-strong)">
              {t('hero.preview.floating.right.value')}
            </p>
          </article>

          <article className="absolute bottom-4 left-10 hidden max-w-58 rounded-[24px] border border-(--home-border) bg-[rgba(255,252,247,0.88)] p-4 shadow-(--home-shadow-soft) xl:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-(--home-text-soft)">
              {t('hero.preview.floating.bottom.label')}
            </p>
            <p className="mt-2 font-display text-[1.2rem] font-semibold tracking-[-0.04em] text-(--home-text-strong)">
              {t('hero.preview.floating.bottom.value')}
            </p>
          </article>

          <div className="relative overflow-hidden rounded-[38px] border border-(--home-border) bg-[rgba(255,249,242,0.82)] p-4 shadow-(--home-shadow) backdrop-blur-md sm:p-6 lg:p-7">
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(93,68,39,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(93,68,39,0.04)_1px,transparent_1px)] bg-size-[34px_34px] opacity-45"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(205,157,98,0.22),transparent_74%)]"
            />

            <div className="relative grid gap-4 xl:grid-cols-[220px_minmax(0,1fr)_250px]">
              <aside className="space-y-4">
                <div className="rounded-[28px] border border-(--home-border) bg-white/72 p-5 shadow-(--home-shadow-soft)">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                    {t('hero.preview.kicker')}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-(--home-text-muted)">
                    {t('hero.preview.searchLabel')}
                  </p>
                  <p className="mt-2 font-display text-[1.4rem] font-semibold leading-[1.05] tracking-[-0.05em] text-(--home-text-strong)">
                    {t('hero.preview.searchValue')}
                  </p>
                </div>

                <div className="rounded-[28px] border border-(--home-border) bg-[rgba(253,247,238,0.94)] p-5 shadow-(--home-shadow-soft)">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                    {t('hero.preview.scopeLabel')}
                  </p>
                  <p className="mt-3 font-medium text-(--home-text-strong)">
                    {t('hero.preview.scopeValue')}
                  </p>
                  <div className="mt-4 space-y-2.5">
                    {sourceItems.map((item) => (
                      <div
                        key={item}
                        className="rounded-3xl border border-(--home-border) bg-white/72 px-3 py-2.5 text-sm text-(--home-text-muted)"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="space-y-4">
                <div className="rounded-[30px] border border-(--home-border) bg-white/82 p-5 shadow-[0_20px_50px_rgba(61,43,24,0.08)] sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                      {t('hero.preview.answerLabel')}
                    </p>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(183,131,71,0.18)] bg-[rgba(248,237,222,0.92)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7a5425]">
                      <Sparkles className="size-3.5" />
                      {t('hero.preview.answerBadge')}
                    </span>
                  </div>

                  <h2 className="mt-5 max-w-[12ch] font-display text-[clamp(2rem,3vw,3rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-(--home-text-strong)">
                    {t('hero.preview.answerTitle')}
                  </h2>
                  <p className="mt-5 max-w-3xl text-[1rem] leading-8 text-(--home-text-muted)">
                    {t('hero.preview.answerBody')}
                  </p>

                  <div className="mt-6 rounded-[24px] border border-(--home-border) bg-[rgba(248,241,232,0.9)] p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 flex size-9 items-center justify-center rounded-full bg-[#1f1a16] text-[#faf7f2]">
                        <BadgeCheck className="size-4" />
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--home-text-soft)">
                          {t('hero.preview.reviewLabel')}
                        </p>
                        <p className="mt-1 text-sm leading-7 text-(--home-text-muted)">
                          {t('hero.preview.reviewValue')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                  <article className="rounded-[28px] border border-(--home-border) bg-[rgba(255,252,247,0.82)] p-5 shadow-(--home-shadow-soft)">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-3xl border border-(--home-border) bg-white/72 text-(--home-text-strong)">
                        <FileSearch className="size-4" />
                      </span>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                        {t('hero.preview.sourcesLabel')}
                      </p>
                    </div>
                    <h3 className="mt-5 max-w-[16ch] font-display text-[1.6rem] font-semibold leading-[1.02] tracking-[-0.05em] text-(--home-text-strong)">
                      {t('hero.preview.sourcesTitle')}
                    </h3>
                    <div className="mt-5 space-y-3">
                      {sourceItems.map((item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between gap-3 rounded-[22px] border border-(--home-border) bg-white/74 px-4 py-3"
                        >
                          <span className="text-sm text-(--home-text-muted)">{item}</span>
                          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-(--home-text-soft)">
                            {t('hero.preview.sources.ready')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="rounded-[28px] border border-[rgba(31,26,22,0.08)] bg-[linear-gradient(180deg,#1f1a16_0%,#17120f_100%)] p-5 text-[#faf7f2] shadow-[0_22px_54px_rgba(31,26,22,0.18)]">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-3xl border border-white/10 bg-white/6 text-white">
                        <LockKeyhole className="size-4" />
                      </span>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgba(255,247,240,0.56)]">
                        {t('hero.preview.actionsLabel')}
                      </p>
                    </div>
                    <h3 className="mt-5 max-w-[12ch] font-display text-[1.6rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white">
                      {t('hero.preview.actionsTitle')}
                    </h3>
                    <div className="mt-5 space-y-3">
                      {actionItems.map((item, index) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-[22px] border border-white/8 bg-white/5 px-4 py-3"
                        >
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-[#1f1a16]">
                            {index + 1}
                          </span>
                          <span className="text-sm leading-6 text-[rgba(255,247,240,0.74)]">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </article>
                </div>
              </div>

              <aside className="grid gap-4">
                <div className="rounded-[28px] border border-(--home-border) bg-[rgba(255,252,247,0.82)] p-5 shadow-(--home-shadow-soft)">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                    {t('hero.preview.side.reviewLabel')}
                  </p>
                  <p className="mt-3 font-display text-[1.8rem] font-semibold tracking-[-0.05em] text-(--home-text-strong)">
                    {t('hero.preview.side.reviewValue')}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-(--home-text-muted)">
                    {t('hero.preview.side.reviewBody')}
                  </p>
                </div>

                <div className="rounded-[28px] border border-(--home-border) bg-[rgba(249,242,232,0.84)] p-5 shadow-(--home-shadow-soft)">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                    {t('hero.preview.side.scopeLabel')}
                  </p>
                  <p className="mt-3 font-display text-[1.8rem] font-semibold tracking-[-0.05em] text-(--home-text-strong)">
                    {t('hero.preview.side.scopeValue')}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-(--home-text-muted)">
                    {t('hero.preview.side.scopeBody')}
                  </p>
                </div>

                <div className="rounded-[28px] border border-(--home-border) bg-[rgba(255,252,247,0.82)] p-5 shadow-(--home-shadow-soft)">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                    {t('hero.preview.side.handoffLabel')}
                  </p>
                  <p className="mt-3 font-display text-[1.8rem] font-semibold tracking-[-0.05em] text-(--home-text-strong)">
                    {t('hero.preview.side.handoffValue')}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-(--home-text-muted)">
                    {t('hero.preview.side.handoffBody')}
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
