import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoMark from '@/assets/brand/logo-mark.svg';
import { Button } from '@/components/ui/button';
import {
  HomeEditorialCard,
  HomeManifestoLink,
  HomeOrbitalPreview,
  HomeSectionHeading,
} from './HomePrimitives';
import {
  homeFooterColumns,
  homePrimaryButtonClass,
  homePrincipleItems,
  homeReleaseCards,
  homeSecondaryButtonClass,
  homeShowcaseMarkerItems,
  homeShowcaseSignalKeys,
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

export function HomeShowcaseSection() {
  const { t } = useTranslation('home');
  const markers = homeShowcaseMarkerItems.map((item) => ({
    className: item.className,
    title: t(item.titleKey),
    value: t(item.valueKey),
  }));
  const signals = homeShowcaseSignalKeys.map((key) => t(key));

  return (
    <section id="research" className="scroll-mt-32 px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1380px]">
        <HomeOrbitalPreview
          orbitLabel={t('showcase.label')}
          title={t('showcase.title')}
          description={t('showcase.description')}
          markers={markers}
          signals={signals}
        />
      </div>
    </section>
  );
}

type HomeReleaseSectionProps = {
  hasAuthSession: boolean;
};

export function HomeReleaseSection({ hasAuthSession }: HomeReleaseSectionProps) {
  const { t } = useTranslation('home');

  return (
    <section id="releases" className="scroll-mt-32 px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <HomeSectionHeading
            eyebrow={t('releases.label')}
            title={t('releases.title')}
            description={t('releases.description')}
          />
          <p className="max-w-2xl justify-self-end text-base leading-7 text-(--home-text-muted)">
            {t('releases.support')}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {homeReleaseCards.map((card) => {
            const target = resolveRoute(hasAuthSession, card);

            return (
              <HomeEditorialCard
                key={card.titleKey}
                date={t(card.dateKey)}
                description={t(card.descriptionKey)}
                eyebrow={t(card.eyebrowKey)}
                icon={card.icon}
                title={t(card.titleKey)}
                cta={
                  target ? (
                    <Link
                      to={target}
                      className="inline-flex items-center gap-2 text-sm font-medium text-(--home-text-strong)"
                    >
                      {t(card.ctaKey)}
                      <ArrowRight className="size-4" />
                    </Link>
                  ) : null
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

type HomePrinciplesSectionProps = {
  hasAuthSession: boolean;
};

export function HomePrinciplesSection({ hasAuthSession }: HomePrinciplesSectionProps) {
  const { t } = useTranslation('home');
  const primaryTarget = hasAuthSession ? '/dashboard' : '/auth/signup';

  return (
    <section id="principles" className="scroll-mt-32 px-4 pb-8 pt-10 md:px-6 md:pb-12 md:pt-14">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-10 border-y border-(--home-border) py-10 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <div>
            <HomeSectionHeading
              eyebrow={t('principles.label')}
              title={t('principles.title')}
              description={t('principles.description')}
            />

            <div className="mt-8 flex flex-wrap gap-3">
              <Button className={homePrimaryButtonClass} asChild>
                <Link to={primaryTarget}>
                  {hasAuthSession ? t('principles.primary.auth') : t('principles.primary.guest')}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="ghost" className={homeSecondaryButtonClass} asChild>
                <Link to="/about">{t('principles.secondary')}</Link>
              </Button>
            </div>
          </div>

          <div>
            {homePrincipleItems.map((item) => {
              const route = resolveRoute(hasAuthSession, item);
              const label = t('principles.itemCta');

              return route ? (
                <Link key={item.titleKey} to={route} className="block">
                  <HomeManifestoLink
                    cta={label}
                    description={t(item.descriptionKey)}
                    icon={item.icon}
                    title={t(item.titleKey)}
                  />
                </Link>
              ) : (
                <a key={item.titleKey} href={item.href} className="block">
                  <HomeManifestoLink
                    cta={label}
                    description={t(item.descriptionKey)}
                    icon={item.icon}
                    title={t(item.titleKey)}
                  />
                </a>
              );
            })}
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
    <footer className="mt-12 bg-(--home-footer-bg) px-4 pb-8 pt-12 text-(--home-footer-text) md:px-6 md:pt-16">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-10 border-b border-[rgba(255,255,255,0.12)] pb-10 lg:grid-cols-[minmax(280px,1fr)_minmax(0,2fr)]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)]">
                <img src={logoMark} alt="" className="size-6" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-[0.02em]">
                  {t('brand', { ns: 'common' })}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-(--home-footer-muted)">
                  {t('nav.kicker')}
                </p>
              </div>
            </div>
            <p className="mt-5 text-base leading-7 text-(--home-footer-muted)">{t('footer.tagline')}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {homeFooterColumns.map((column) => (
              <div key={column.titleKey}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--home-footer-muted)">
                  {t(column.titleKey)}
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => {
                    const route = resolveRoute(hasAuthSession, link);

                    return route ? (
                      <Link
                        key={link.key}
                        to={route}
                        className="text-sm leading-6 text-(--home-footer-text) transition-colors hover:text-white"
                      >
                        {t(link.key)}
                      </Link>
                    ) : (
                      <a
                        key={link.key}
                        href={link.href}
                        className="text-sm leading-6 text-(--home-footer-text) transition-colors hover:text-white"
                      >
                        {t(link.key)}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-sm text-(--home-footer-muted) sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t('brand', { ns: 'common' })}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/about" className="transition-colors hover:text-white">
              {t('footer.about')}
            </Link>
            <Link
              to={hasAuthSession ? '/dashboard' : '/auth/login'}
              className="transition-colors hover:text-white"
            >
              {t('footer.console')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
