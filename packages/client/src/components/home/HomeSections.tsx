import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoMark from '@/assets/brand/logo-mark.svg';
import { Button } from '@/components/ui/button';
import {
  HomeFeatureCard,
  HomeFooterColumn,
  HomeSectionHeading,
  HomeWorkflowCard,
} from './HomePrimitives';
import {
  homeFeatureCards,
  homeFooterColumns,
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
      <div className="mx-auto max-w-[1160px]">
        <HomeSectionHeading
          className="max-w-[520px]"
          title={t('workflow.title')}
          description={t('workflow.description')}
        />

        <div className="motion-safe:animate-[home-rise_0.9s_ease-out_0.12s_both] mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
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
    </section>
  );
}

type HomeCapabilitiesSectionProps = {
  hasAuthSession: boolean;
};

export function HomeCapabilitiesSection({ hasAuthSession }: HomeCapabilitiesSectionProps) {
  const { t } = useTranslation('home');

  return (
    <section id="capabilities" className="scroll-mt-24 px-4 py-18 md:px-6 md:py-24">
      <div className="mx-auto max-w-[1160px]">
        <HomeSectionHeading
          align="center"
          title={t('capabilities.title')}
          description={t('capabilities.description')}
        />

        <div className="motion-safe:animate-[home-rise_0.9s_ease-out_0.18s_both] mt-12 grid gap-4 lg:grid-cols-2">
          {homeFeatureCards.map((card) => {
            const target = resolveRoute(hasAuthSession, card);
            const cardNode = (
              <HomeFeatureCard
                cta={t(card.ctaKey)}
                description={t(card.descriptionKey)}
                eyebrow={t(card.eyebrowKey)}
                icon={card.icon}
                title={t(card.titleKey)}
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
    </section>
  );
}

type HomeCtaSectionProps = {
  hasAuthSession: boolean;
};

export function HomeCtaSection({ hasAuthSession }: HomeCtaSectionProps) {
  const { t } = useTranslation('home');
  const primaryTarget = hasAuthSession ? '/dashboard' : '/auth/signup';

  return (
    <section id="reach" className="px-4 pb-8 pt-14 md:px-6 md:pb-14 md:pt-20">
      <div className="mx-auto max-w-[1160px]">
        <div className="relative mx-auto max-w-[860px] overflow-hidden rounded-[32px] bg-(--home-accent) px-6 py-14 text-center text-[color:var(--home-accent-ink)] shadow-[0_30px_90px_rgba(214,255,22,0.16)] sm:px-10 sm:py-16">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.42),transparent_58%)]"
          />
          <div className="relative mx-auto max-w-[760px]">
            <h2 className="mx-auto max-w-[10ch] font-display text-[clamp(2.55rem,5.4vw,4.3rem)] font-extrabold leading-[0.9] tracking-[-0.08em]">
              {t('cta.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-[32rem] text-base leading-7 text-[rgba(9,12,6,0.72)] sm:text-lg">
              {t('cta.description')}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                className="h-11 rounded-full border border-transparent bg-[#0a0d08] px-5 text-white shadow-[0_20px_38px_rgba(10,13,8,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-[#141913]"
                asChild
              >
                <Link to={primaryTarget}>
                  {hasAuthSession ? t('cta.primary.auth') : t('cta.primary.guest')}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
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
    <footer className="mt-16 border-t border-(--home-border) px-4 pb-8 pt-12 text-(--home-text-strong) md:px-6 md:pt-16">
      <div className="mx-auto max-w-[1160px]">
        <div className="grid gap-12 border-b border-(--home-border) pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-full border border-[rgba(214,255,22,0.18)] bg-[rgba(214,255,22,0.08)]">
                <img src={logoMark} alt="" className="h-5 w-5" />
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                {t('brand', { ns: 'common' })}
              </p>
            </div>

            <p className="mt-6 text-sm leading-7 text-(--home-text-muted)">{t('footer.description')}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {homeFooterColumns.map((column) => (
              <HomeFooterColumn key={column.titleKey} title={t(column.titleKey)}>
                {column.links.map((link) => {
                  const route = resolveRoute(hasAuthSession, link);

                  return route ? (
                    <Link key={link.key} to={route} className="transition-colors hover:text-white">
                      {t(link.key)}
                    </Link>
                  ) : (
                    <a key={link.key} href={link.href} className="transition-colors hover:text-white">
                      {t(link.key)}
                    </a>
                  );
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
