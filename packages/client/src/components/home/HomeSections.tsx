import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoMark from '@/assets/brand/logo-mark.svg';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HomeFaqItem, HomeFooterColumn, HomeSectionHeading } from './HomePrimitives';
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
    title: t(card.titleKey),
    value: t(card.valueKey),
  }));
  const railPoints = [
    t('proof.rail.points.scope'),
    t('proof.rail.points.version'),
    t('proof.rail.points.audit'),
  ];

  return (
    <section className="px-4 py-14 md:px-6 md:py-18">
      <div className="mx-auto max-w-290">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:items-start">
          <HomeSectionHeading
            eyebrow={t('proof.eyebrow')}
            title={t('proof.title')}
            titleClassName="max-w-[14ch]"
            description={t('proof.description')}
            descriptionClassName="max-w-[34rem]"
          />

          <div className="border-t border-(--home-border)">
            <div className="grid gap-8 py-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                  {t('proof.rail.label')}
                </p>
                <h3 className="mt-4 max-w-[14ch] font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-(--home-text-strong)">
                  {t('proof.rail.title')}
                </h3>
                <p className="mt-5 max-w-3xl text-[1rem] leading-8 text-(--home-text-muted)">
                  {t('proof.rail.description')}
                </p>
              </div>

              <div className="space-y-4">
                {railPoints.map((point, index) => (
                  <div
                    key={point}
                    className="border-l border-(--home-border) pl-4 text-sm leading-7 text-(--home-text-muted)"
                  >
                    <span className="mr-2 inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-(--home-text-soft)">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-0 border-t border-(--home-border) md:grid-cols-3">
              {cards.map((card, index) => (
                <article
                  key={card.title}
                  className={cn(
                    'border-b border-(--home-border) py-6 md:border-b-0 md:py-8',
                    index > 0 && 'md:border-l md:border-(--home-border) md:pl-6',
                    index === 0 && 'md:pr-6'
                  )}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                    {card.value}
                  </p>
                  <h4 className="mt-4 max-w-[12ch] font-display text-[1.65rem] font-semibold leading-[1.02] tracking-[-0.05em] text-(--home-text-strong)">
                    {card.title}
                  </h4>
                  <p className="mt-4 max-w-[26ch] text-sm leading-7 text-(--home-text-muted)">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
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
    number: step.number,
    title: t(step.titleKey),
  }));
  const metrics = [
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
  ];

  return (
    <section id="workflow" className="scroll-mt-24 px-4 py-14 md:px-6 md:py-18">
      <div className="mx-auto max-w-290">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:items-start">
          <HomeSectionHeading
            eyebrow={t('workflow.label')}
            title={t('workflow.title')}
            titleClassName="max-w-[13ch]"
            description={t('workflow.description')}
            descriptionClassName="max-w-[34rem]"
          />

          <div className="border-t border-(--home-border)">
            <div className="grid gap-0 md:grid-cols-3">
              {workflow.map((step, index) => (
                <article
                  key={step.number}
                  className={cn(
                    'border-b border-(--home-border) py-6 md:border-b-0 md:py-8',
                    index > 0 && 'md:border-l md:border-(--home-border) md:pl-6',
                    index === 0 && 'md:pr-6'
                  )}
                >
                  <p className="font-editorial text-[2.7rem] font-semibold italic leading-none tracking-[-0.08em] text-[rgba(31,26,22,0.36)]">
                    {step.number}
                  </p>
                  <h3 className="mt-5 max-w-[12ch] font-display text-[1.75rem] font-semibold leading-[1.02] tracking-[-0.05em] text-(--home-text-strong)">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[28ch] text-sm leading-7 text-(--home-text-muted)">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="grid gap-4 border-t border-(--home-border) py-6 sm:grid-cols-3">
              {metrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className={cn(index > 0 && 'sm:border-l sm:border-(--home-border) sm:pl-5')}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                    {metric.label}
                  </p>
                  <p className="mt-3 font-display text-[1.4rem] font-semibold tracking-[-0.05em] text-(--home-text-strong)">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-(--home-border) pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                {t('workflow.board.label')}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-(--home-text-muted)">
                {t('workflow.board.description')}
              </p>
            </div>
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
    <section className="px-4 py-14 md:px-6 md:py-18">
      <div className="mx-auto max-w-290">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:items-start">
          <HomeSectionHeading
            eyebrow={t('capabilities.label')}
            title={t('capabilities.title')}
            titleClassName="max-w-[14ch]"
            description={t('capabilities.description')}
            descriptionClassName="max-w-[34rem]"
          />

          <div className="grid gap-0 border-t border-(--home-border) lg:grid-cols-2">
            {homeFeatureCards.map((card, index) => {
              const target = resolveRoute(hasAuthSession, card);

              if (!target) return null;

              return (
                <Link
                  key={card.titleKey}
                  to={target}
                  className={cn(
                    'block border-b border-(--home-border) py-6 lg:py-8',
                    index % 2 === 1 && 'lg:border-l lg:border-(--home-border) lg:pl-8',
                    index % 2 === 0 && 'lg:pr-8'
                  )}
                >
                  <article>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-(--home-text-soft)">
                        {t(card.eyebrowKey)}
                      </p>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--home-text-soft)">
                        {t(card.signalKey)}
                      </span>
                    </div>

                    <h3 className="mt-4 max-w-[13ch] font-display text-[1.75rem] font-semibold leading-[1.02] tracking-[-0.05em] text-(--home-text-strong)">
                      {t(card.titleKey)}
                    </h3>
                    <p className="mt-4 max-w-[32ch] text-sm leading-7 text-(--home-text-muted)">
                      {t(card.descriptionKey)}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-(--home-text-strong)">
                      {t(card.ctaKey)}
                      <ArrowRight className="size-4" />
                    </span>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeFaqSection() {
  const { t } = useTranslation('home');

  return (
    <section id="faq" className="scroll-mt-24 px-4 py-14 md:px-6 md:py-18">
      <div className="mx-auto max-w-290">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:items-start">
          <div>
            <HomeSectionHeading
              eyebrow={t('faq.label')}
              title={t('faq.title')}
              titleClassName="max-w-[13ch]"
              description={t('faq.description')}
              descriptionClassName="max-w-[32rem]"
            />

            <div className="mt-8 border-t border-(--home-border) pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                {t('faq.aside.label')}
              </p>
              <p className="mt-4 max-w-[32ch] text-sm leading-7 text-(--home-text-muted)">
                {t('faq.aside.body')}
              </p>
            </div>
          </div>

          <div className="border-t border-(--home-border)">
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
    <section className="px-4 pb-8 pt-14 md:px-6 md:pb-14 md:pt-18">
      <div className="mx-auto max-w-290 border-y border-(--home-border) py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(280px,0.96fr)] lg:items-start">
          <div>
            <p className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
              <span className="h-2 w-2 rounded-full bg-[#b78347]" />
              {t('cta.eyebrow')}
            </p>

            <h2 className="mt-6 max-w-[11ch] text-balance font-display text-[clamp(2.4rem,10vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-(--home-text-strong)">
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
                className="h-11 rounded-full border-(--home-border) bg-transparent px-5 text-(--home-text-strong) hover:bg-white/60"
                asChild
              >
                <Link to="/about">{t('cta.secondary')}</Link>
              </Button>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
              {t('cta.board.label')}
            </p>
            <h3 className="mt-4 max-w-[14ch] font-display text-[2rem] font-semibold leading-[0.96] tracking-[-0.06em] text-(--home-text-strong)">
              {t('cta.board.title')}
            </h3>

            <div className="mt-6 border-t border-(--home-border)">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-3 border-b border-(--home-border) py-4"
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-[#1f1a16] text-[11px] font-semibold text-[#faf7f2]">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-(--home-text-muted)">{step}</p>
                </div>
              ))}
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
    <footer className="pb-8 pt-6 md:pt-8">
      <div className="border-t border-(--home-border) px-4 pt-8 md:px-6">
        <div className="grid gap-12 pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)]">
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

        <div className="flex flex-col gap-3 border-t border-(--home-border) pt-6 text-sm text-(--home-text-soft) sm:flex-row sm:items-center sm:justify-between">
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
