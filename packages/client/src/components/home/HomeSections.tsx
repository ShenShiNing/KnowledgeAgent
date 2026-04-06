import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoMark from '@/assets/brand/logo-mark.svg';
import { Button } from '@/components/ui/button';
import {
  HomeEvidenceCard,
  HomeFeatureCard,
  HomeFooterColumn,
  HomeSectionHeading,
  HomeWorkflowCard,
} from './HomePrimitives';
import {
  homeFeatureCards,
  homeFooterColumns,
  homeProofCards,
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
        <div className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative overflow-hidden rounded-[34px] border border-(--home-border) bg-[linear-gradient(180deg,rgba(24,24,27,0.96),rgba(10,10,12,0.92))] p-6 shadow-(--home-shadow-soft) sm:p-8">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_42%)]"
            />
            <div className="relative">
              <HomeSectionHeading
                eyebrow={t('proof.eyebrow')}
                title={t('proof.title')}
                titleClassName="max-w-[13ch] text-[clamp(2rem,8vw,4.4rem)] sm:max-w-[13ch]"
                description={t('proof.description')}
                descriptionClassName="max-w-[35rem]"
              />

              <div className="mt-8 rounded-[28px] border border-(--home-border) bg-[rgba(255,255,255,0.03)] p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
                  {t('proof.rail.label')}
                </p>
                <h3 className="mt-4 max-w-[16ch] text-balance font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[0.98] tracking-[-0.06em] text-(--home-text-strong)">
                  {t('proof.rail.title')}
                </h3>
                <p className="mt-4 max-w-136 text-sm leading-7 text-(--home-text-muted)">
                  {t('proof.rail.description')}
                </p>

                <div className="mt-6 space-y-3">
                  {railPoints.map((point, index) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-4xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3"
                    >
                      <span className="mt-0.5 flex size-6 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.06)] text-[11px] font-semibold text-(--home-text-strong)">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-6 text-(--home-text-muted)">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {cards.map((card, index) => (
              <HomeEvidenceCard
                key={card.title}
                className={index === 0 ? 'md:col-span-2' : undefined}
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
        <HomeSectionHeading
          className="max-w-140"
          eyebrow={t('workflow.label')}
          title={t('workflow.title')}
          titleClassName="max-w-[15ch] text-[clamp(2rem,8vw,4.4rem)]"
          description={t('workflow.description')}
          descriptionClassName="max-w-[42rem]"
        />

        <div className="relative mt-10">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[7%] right-[7%] top-11 hidden h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] xl:block"
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
    <section id="capabilities" className="scroll-mt-24 px-4 py-14 md:px-6 md:py-20">
      <div className="relative mx-auto max-w-290 overflow-hidden rounded-[36px] border border-(--home-border) bg-[linear-gradient(180deg,rgba(24,24,27,0.98),rgba(10,10,12,0.92))] p-6 shadow-(--home-shadow-soft) sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-44 w-160 -translate-x-1/2 bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_68%)]"
        />
        <div className="relative">
          <HomeSectionHeading
            eyebrow={t('capabilities.label')}
            title={t('capabilities.title')}
            titleClassName="max-w-[15ch] text-[clamp(2rem,8vw,4.4rem)] sm:max-w-[15ch]"
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
    <section id="reach" className="px-4 pb-8 pt-14 md:px-6 md:pb-14 md:pt-20">
      <div className="mx-auto max-w-290">
        <div className="relative overflow-hidden rounded-[38px] border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(180deg,rgba(250,250,250,0.98),rgba(244,244,245,0.94))] px-6 py-10 text-[#09090b] shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:px-8 sm:py-12 lg:px-10">
          <div
            aria-hidden
            className="absolute -right-20 -top-28 h-72 w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.58),transparent_68%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(9,9,11,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(9,9,11,0.06)_1px,transparent_1px)] bg-size-[48px_48px] opacity-40"
          />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-3 rounded-full border border-[rgba(9,9,11,0.12)] bg-[rgba(9,9,11,0.04)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgba(9,9,11,0.72)]">
                <span className="h-2 w-2 rounded-full bg-[rgba(9,9,11,0.72)]" />
                {t('cta.eyebrow')}
              </p>

              <h2 className="mt-6 max-w-[11ch] text-balance font-display text-[clamp(2.2rem,10vw,4.8rem)] font-extrabold leading-[0.9] tracking-[-0.08em] sm:max-w-[12ch]">
                {t('cta.title')}
              </h2>
              <p className="mt-5 max-w-136 text-base leading-7 text-[rgba(9,9,11,0.7)] sm:text-lg">
                {t('cta.description')}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  className="h-11 rounded-full border border-transparent bg-[#09090b] px-5 text-white shadow-[0_20px_38px_rgba(9,9,11,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-[#18181b]"
                  asChild
                >
                  <Link to={primaryTarget}>
                    {hasAuthSession ? t('cta.primary.auth') : t('cta.primary.guest')}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-11 rounded-full border-[rgba(9,9,11,0.12)] bg-[rgba(255,255,255,0.72)] px-5 text-[#09090b] hover:bg-[rgba(255,255,255,0.92)]"
                  asChild
                >
                  <Link to="/about">{t('cta.secondary')}</Link>
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-[rgba(9,9,11,0.08)] bg-[rgba(255,255,255,0.72)] p-5 shadow-[0_20px_50px_rgba(9,9,11,0.1)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgba(9,9,11,0.56)]">
                {t('cta.board.label')}
              </p>
              <h3 className="mt-4 max-w-[16ch] text-balance font-display text-[2rem] font-bold leading-[0.96] tracking-[-0.06em]">
                {t('cta.board.title')}
              </h3>

              <div className="mt-6 space-y-3">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-3 rounded-[22px] border border-[rgba(9,9,11,0.08)] bg-[rgba(255,255,255,0.82)] px-4 py-3"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-[#09090b] text-[11px] font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-[rgba(9,9,11,0.68)]">{step}</p>
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
    <footer className="mt-14 px-4 pb-8 pt-10 text-(--home-text-strong) md:px-6 md:pt-14">
      <div className="mx-auto max-w-290 overflow-hidden rounded-[34px] border border-(--home-border) bg-[linear-gradient(180deg,rgba(17,17,20,0.98),rgba(9,9,11,0.94))] p-6 shadow-(--home-shadow-soft) sm:p-8">
        <div className="grid gap-12 border-b border-(--home-border) pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)]">
                <img src={logoMark} alt="" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">
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
                        className="transition-colors hover:text-white"
                      >
                        {t(link.key)}
                      </a>
                    );
                  }

                  const route = resolveRoute(hasAuthSession, link);

                  return route ? (
                    <Link key={link.key} to={route} className="transition-colors hover:text-white">
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
