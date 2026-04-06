import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoMark from '@/assets/brand/logo-mark.svg';
import { Button } from '@/components/ui/button';
import {
  HomeEvidenceCard,
  HomeFaqItem,
  HomeFeatureCard,
  HomeFooterColumn,
  HomeSectionHeading,
  HomeWorkflowCard,
} from './HomePrimitives';
import {
  homeFaqItems,
  homeFeatureCards,
  homeFooterColumns,
  homeProofCards,
  homePrimaryButtonClass,
  homeWorkflowSteps,
  type HomeRoute,
} from './home-content';

function resolveRoute(
  hasAuthSession: boolean,
  item: {
    route?: HomeRoute;
    routeAuth?: HomeRoute;
    routeGuest?: HomeRoute;
  }
) {
  return item.route ?? (hasAuthSession ? item.routeAuth : item.routeGuest);
}

export function HomeProofSection() {
  const { t } = useTranslation('home');
  const cards = homeProofCards.map((card) => ({
    description: t(card.descriptionKey),
    icon: card.icon,
    title: t(card.titleKey),
    value: t(card.valueKey),
  }));
  const railPoints = [
    t('proof.rail.points.scope'),
    t('proof.rail.points.version'),
    t('proof.rail.points.audit'),
  ];

  return (
    <section className="px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-290">
        <HomeSectionHeading
          align="center"
          className="max-w-4xl"
          eyebrow={t('proof.eyebrow')}
          title={t('proof.title')}
          titleClassName="max-w-[14ch]"
          description={t('proof.description')}
          descriptionClassName="max-w-[44rem]"
        />

        <div className="mt-12 grid gap-4 xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <article className="relative overflow-hidden rounded-[34px] border border-(--home-border) bg-[rgba(255,252,247,0.82)] p-6 shadow-(--home-shadow-soft) sm:p-8">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(205,157,98,0.2),transparent_74%)]"
            />

            <div className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                {t('proof.rail.label')}
              </p>
              <h3 className="mt-5 max-w-[14ch] font-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-(--home-text-strong)">
                {t('proof.rail.title')}
              </h3>
              <p className="mt-5 max-w-3xl text-[1rem] leading-8 text-(--home-text-muted)">
                {t('proof.rail.description')}
              </p>

              <div className="mt-8 space-y-3">
                {railPoints.map((point, index) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-[24px] border border-(--home-border) bg-white/72 px-4 py-3.5"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#1f1a16] text-[11px] font-semibold text-[#faf7f2]">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-(--home-text-muted)">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card, index) => (
              <HomeEvidenceCard
                key={card.title}
                className={index === 0 ? 'sm:col-span-2' : index === 1 ? 'sm:translate-y-6' : ''}
                description={card.description}
                icon={card.icon}
                title={card.title}
                value={card.value}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeWorkflowSection() {
  const { t } = useTranslation('home');
  const workflow = homeWorkflowSteps.map((step) => ({
    description: t(step.descriptionKey),
    icon: step.icon,
    number: step.number,
    title: t(step.titleKey),
  }));

  return (
    <section id="workflow" className="scroll-mt-24 px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-290">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div className="relative overflow-hidden rounded-[34px] border border-(--home-border) bg-[linear-gradient(180deg,#1f1a16_0%,#18130f_100%)] p-6 text-[#faf7f2] shadow-[0_28px_58px_rgba(31,26,22,0.18)] sm:p-8">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_74%)]"
            />

            <div className="relative">
              <HomeSectionHeading
                eyebrow={t('workflow.label')}
                title={t('workflow.title')}
                titleClassName="max-w-[13ch] text-[#faf7f2]"
                description={t('workflow.description')}
                descriptionClassName="max-w-[32rem] text-[rgba(255,247,240,0.72)]"
              />

              <div className="mt-8 rounded-[28px] border border-white/8 bg-white/5 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgba(255,247,240,0.56)]">
                  {t('workflow.board.label')}
                </p>
                <h3 className="mt-4 max-w-[14ch] font-display text-[1.9rem] font-semibold leading-none tracking-[-0.05em] text-white">
                  {t('workflow.board.title')}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[rgba(255,247,240,0.72)]">
                  {t('workflow.board.description')}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      label: t('workflow.board.metrics.scope.label'),
                      value: t('workflow.board.metrics.scope.value'),
                    },
                    {
                      label: t('workflow.board.metrics.review.label'),
                      value: t('workflow.board.metrics.review.value'),
                    },
                    {
                      label: t('workflow.board.metrics.delivery.label'),
                      value: t('workflow.board.metrics.delivery.value'),
                    },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[22px] border border-white/8 bg-white/5 px-4 py-4"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(255,247,240,0.5)]">
                        {metric.label}
                      </p>
                      <p className="mt-3 font-display text-[1.2rem] font-semibold tracking-[-0.04em] text-white">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {workflow.map((step) => (
              <HomeWorkflowCard
                key={step.number}
                description={step.description}
                icon={step.icon}
                number={step.number}
                title={step.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type HomeCapabilitiesSectionProps = {
  hasAuthSession: boolean;
};

export function HomeCapabilitiesSection({ hasAuthSession }: HomeCapabilitiesSectionProps) {
  const { t } = useTranslation('home');

  return (
    <section className="px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-290">
        <div className="relative overflow-hidden rounded-[36px] border border-(--home-border) bg-[rgba(255,249,242,0.82)] p-6 shadow-(--home-shadow-soft) sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-44 w-56 bg-[radial-gradient(circle,rgba(205,157,98,0.18),transparent_70%)]"
          />

          <div className="relative">
            <HomeSectionHeading
              className="max-w-4xl"
              eyebrow={t('capabilities.label')}
              title={t('capabilities.title')}
              titleClassName="max-w-[14ch]"
              description={t('capabilities.description')}
              descriptionClassName="max-w-[44rem]"
            />

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {homeFeatureCards.map((card) => {
                const target = resolveRoute(hasAuthSession, card);
                const cardNode = (
                  <HomeFeatureCard
                    cta={t(card.ctaKey)}
                    description={t(card.descriptionKey)}
                    eyebrow={t(card.eyebrowKey)}
                    icon={card.icon}
                    signal={t(card.signalKey)}
                    title={t(card.titleKey)}
                    tone={card.tone}
                  />
                );

                return target ? (
                  <Link key={card.titleKey} to={target} className="block h-full">
                    {cardNode}
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeFaqSection() {
  const { t } = useTranslation('home');

  return (
    <section id="faq" className="scroll-mt-24 px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-290">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)]">
          <div className="space-y-4">
            <HomeSectionHeading
              eyebrow={t('faq.label')}
              title={t('faq.title')}
              titleClassName="max-w-[13ch]"
              description={t('faq.description')}
              descriptionClassName="max-w-[32rem]"
            />

            <article className="overflow-hidden rounded-[30px] border border-(--home-border) bg-[rgba(255,252,247,0.82)] p-6 shadow-(--home-shadow-soft)">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                {t('faq.aside.label')}
              </p>
              <h3 className="mt-4 max-w-[12ch] font-display text-[2rem] font-semibold leading-[0.98] tracking-[-0.05em] text-(--home-text-strong)">
                {t('faq.aside.title')}
              </h3>
              <p className="mt-4 text-sm leading-7 text-(--home-text-muted)">
                {t('faq.aside.body')}
              </p>
            </article>
          </div>

          <div className="grid gap-4">
            {homeFaqItems.map((item) => (
              <HomeFaqItem
                key={item.questionKey}
                answer={t(item.answerKey)}
                question={t(item.questionKey)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type HomeCtaSectionProps = {
  hasAuthSession: boolean;
};

export function HomeCtaSection({ hasAuthSession }: HomeCtaSectionProps) {
  const { t } = useTranslation('home');
  const primaryTarget = hasAuthSession ? '/dashboard' : '/auth/signup';
  const steps = [
    t('cta.board.items.connect'),
    t('cta.board.items.review'),
    t('cta.board.items.deploy'),
  ];

  return (
    <section className="px-4 pb-8 pt-14 md:px-6 md:pb-14 md:pt-20">
      <div className="mx-auto max-w-290">
        <div className="relative overflow-hidden rounded-[38px] border border-(--home-border) bg-[linear-gradient(180deg,#fdf8f0_0%,#f6ecde_100%)] px-6 py-10 shadow-[0_28px_60px_rgba(61,43,24,0.09)] sm:px-8 sm:py-12 lg:px-10">
          <div
            aria-hidden
            className="absolute right-0 top-0 h-56 w-64 bg-[radial-gradient(circle,rgba(205,157,98,0.24),transparent_72%)]"
          />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(300px,0.96fr)] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-3 rounded-full border border-(--home-border) bg-white/62 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                <span className="h-2 w-2 rounded-full bg-[#b78347]" />
                {t('cta.eyebrow')}
              </p>

              <h2 className="mt-6 max-w-[11ch] text-balance font-display text-[clamp(2.4rem,10vw,5rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-(--home-text-strong)">
                {t('cta.title')}
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-(--home-text-muted) sm:text-lg">
                {t('cta.description')}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button className={homePrimaryButtonClass} asChild>
                  <Link to={primaryTarget}>
                    {hasAuthSession ? t('cta.primary.auth') : t('cta.primary.guest')}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-11 rounded-full border-(--home-border) bg-white/62 px-5 text-(--home-text-strong) hover:bg-white"
                  asChild
                >
                  <Link to="/about">{t('cta.secondary')}</Link>
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-[rgba(31,26,22,0.08)] bg-[linear-gradient(180deg,#1f1a16_0%,#18130f_100%)] p-5 text-[#faf7f2] shadow-[0_22px_54px_rgba(31,26,22,0.16)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgba(255,247,240,0.56)]">
                {t('cta.board.label')}
              </p>
              <h3 className="mt-4 max-w-[14ch] text-balance font-display text-[2rem] font-semibold leading-[0.96] tracking-[-0.06em]">
                {t('cta.board.title')}
              </h3>

              <div className="mt-6 space-y-3">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-3 rounded-[22px] border border-white/8 bg-white/5 px-4 py-3"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-[#1f1a16]">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-[rgba(255,247,240,0.74)]">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type HomeFooterProps = {
  hasAuthSession: boolean;
};

export function HomeFooter({ hasAuthSession }: HomeFooterProps) {
  const { t } = useTranslation(['home', 'common']);

  return (
    <footer className="mt-10 px-4 pb-8 pt-6 md:px-6 md:pt-10">
      <div className="mx-auto max-w-290 rounded-[34px] border border-(--home-border) bg-[rgba(255,252,247,0.82)] p-6 shadow-(--home-shadow-soft) sm:p-8">
        <div className="grid gap-12 border-b border-(--home-border) pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)]">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full border border-(--home-border) bg-white/74">
                <img src={logoMark} alt="" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-(--home-text-strong)">
                  {t('brand', { ns: 'common' })}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-(--home-text-soft)">
                  {t('nav.kicker')}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-(--home-text-muted)">
              {t('footer.description')}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {homeFooterColumns.map((column) => (
              <HomeFooterColumn key={column.titleKey} title={t(column.titleKey)}>
                {column.links.map((link) => {
                  if ('href' in link) {
                    return (
                      <a
                        key={link.key}
                        href={link.href}
                        className="transition-colors hover:text-(--home-text-strong)"
                      >
                        {t(link.key)}
                      </a>
                    );
                  }

                  const route = resolveRoute(hasAuthSession, link);

                  return route ? (
                    <Link
                      key={link.key}
                      to={route}
                      className="transition-colors hover:text-(--home-text-strong)"
                    >
                      {t(link.key)}
                    </Link>
                  ) : null;
                })}
              </HomeFooterColumn>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-sm text-(--home-text-soft) sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t('brand', { ns: 'common' })}. {t('footer.copyright')}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span>{t('footer.legal.privacy')}</span>
            <span>{t('footer.legal.terms')}</span>
            <span>{t('footer.legal.contact')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
