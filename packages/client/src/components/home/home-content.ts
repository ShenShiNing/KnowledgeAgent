import type { LucideIcon } from 'lucide-react';
import { Database, FileText, MessageSquareText, Search, ShieldCheck } from 'lucide-react';

export type HomeRoute =
  | '/about'
  | '/auth/login'
  | '/auth/signup'
  | '/dashboard'
  | '/knowledge-bases';

export const homePrimaryButtonClass =
  'h-11 rounded-full border border-transparent bg-(--home-surface-inverse) px-5 text-[color:var(--home-app-bg)] shadow-[0_16px_34px_rgba(19,18,16,0.16)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-[color:var(--home-text-strong)] hover:shadow-[0_22px_38px_rgba(19,18,16,0.22)] focus-visible:ring-[color:var(--home-accent)] dark:text-[color:var(--home-surface-inverse)]';

export const homeSecondaryButtonClass =
  'h-11 rounded-full border border-(--home-border-strong) bg-[rgba(255,250,243,0.62)] px-5 text-(--home-text-strong) transition-[transform,background-color,border-color] hover:-translate-y-0.5 hover:border-[color:var(--home-accent)] hover:bg-(--home-surface) focus-visible:ring-[color:var(--home-accent)] dark:bg-[rgba(29,24,19,0.68)]';

export const homeGhostButtonClass =
  'h-10 rounded-full border border-transparent bg-transparent px-4 text-(--home-text-strong) transition-colors hover:bg-(--home-surface-soft) focus-visible:ring-[color:var(--home-accent)]';

export const homeNavItems = [
  { href: '#research', key: 'nav.research' },
  { href: '#releases', key: 'nav.releases' },
  { href: '#principles', key: 'nav.principles' },
] as const;

export const homeHeroMetrics = [
  {
    detailKey: 'hero.metrics.archives.detail',
    labelKey: 'hero.metrics.archives.label',
    valueKey: 'hero.metrics.archives.value',
  },
  {
    detailKey: 'hero.metrics.scope.detail',
    labelKey: 'hero.metrics.scope.label',
    valueKey: 'hero.metrics.scope.value',
  },
  {
    detailKey: 'hero.metrics.evidence.detail',
    labelKey: 'hero.metrics.evidence.label',
    valueKey: 'hero.metrics.evidence.value',
  },
] as const;

export const homeShowcaseMarkerItems = [
  {
    className: 'left-[2%] top-[18%] md:left-[10%] md:top-[14%]',
    titleKey: 'showcase.markers.scope.title',
    valueKey: 'showcase.markers.scope.value',
  },
  {
    className: 'right-[2%] top-[12%] md:right-[10%] md:top-[18%]',
    titleKey: 'showcase.markers.coverage.title',
    valueKey: 'showcase.markers.coverage.value',
  },
  {
    className: 'left-[8%] bottom-[14%] md:left-[18%] md:bottom-[22%]',
    titleKey: 'showcase.markers.sync.title',
    valueKey: 'showcase.markers.sync.value',
  },
] as const;

export const homeShowcaseSignalKeys = [
  'showcase.signals.answers',
  'showcase.signals.retrieval',
  'showcase.signals.review',
] as const;

export const homeReleaseCards = [
  {
    ctaKey: 'releases.cards.archive.cta',
    dateKey: 'releases.cards.archive.date',
    descriptionKey: 'releases.cards.archive.description',
    eyebrowKey: 'releases.cards.archive.eyebrow',
    icon: Database,
    routeAuth: '/knowledge-bases',
    routeGuest: '/auth/signup',
    titleKey: 'releases.cards.archive.title',
  },
  {
    ctaKey: 'releases.cards.conversation.cta',
    dateKey: 'releases.cards.conversation.date',
    descriptionKey: 'releases.cards.conversation.description',
    eyebrowKey: 'releases.cards.conversation.eyebrow',
    icon: MessageSquareText,
    routeAuth: '/dashboard',
    routeGuest: '/auth/signup',
    titleKey: 'releases.cards.conversation.title',
  },
  {
    ctaKey: 'releases.cards.verification.cta',
    dateKey: 'releases.cards.verification.date',
    descriptionKey: 'releases.cards.verification.description',
    eyebrowKey: 'releases.cards.verification.eyebrow',
    icon: ShieldCheck,
    route: '/about',
    titleKey: 'releases.cards.verification.title',
  },
] as const satisfies ReadonlyArray<{
  ctaKey: string;
  dateKey: string;
  descriptionKey: string;
  eyebrowKey: string;
  icon: LucideIcon;
  route?: HomeRoute;
  routeAuth?: HomeRoute;
  routeGuest?: HomeRoute;
  titleKey: string;
}>;

export const homePrincipleItems = [
  {
    descriptionKey: 'principles.items.sources.description',
    href: '#research',
    icon: Search,
    titleKey: 'principles.items.sources.title',
  },
  {
    descriptionKey: 'principles.items.archives.description',
    routeAuth: '/knowledge-bases',
    routeGuest: '/auth/signup',
    icon: Database,
    titleKey: 'principles.items.archives.title',
  },
  {
    descriptionKey: 'principles.items.responses.description',
    routeAuth: '/dashboard',
    routeGuest: '/auth/signup',
    icon: MessageSquareText,
    titleKey: 'principles.items.responses.title',
  },
  {
    descriptionKey: 'principles.items.audit.description',
    route: '/about',
    icon: FileText,
    titleKey: 'principles.items.audit.title',
  },
] as const satisfies ReadonlyArray<{
  descriptionKey: string;
  href?: string;
  icon: LucideIcon;
  route?: HomeRoute;
  routeAuth?: HomeRoute;
  routeGuest?: HomeRoute;
  titleKey: string;
}>;

export const homeFooterColumns = [
  {
    links: [
      {
        key: 'footer.columns.product.workspace',
        routeAuth: '/dashboard',
        routeGuest: '/auth/signup',
      },
      {
        key: 'footer.columns.product.knowledge',
        routeAuth: '/knowledge-bases',
        routeGuest: '/auth/signup',
      },
      { key: 'footer.columns.product.research', href: '#research' },
    ],
    titleKey: 'footer.columns.product.title',
  },
  {
    links: [
      { key: 'footer.columns.system.releases', href: '#releases' },
      { key: 'footer.columns.system.principles', href: '#principles' },
      { key: 'footer.columns.system.about', route: '/about' },
    ],
    titleKey: 'footer.columns.system.title',
  },
  {
    links: [
      { key: 'footer.columns.access.signup', route: '/auth/signup' },
      { key: 'footer.columns.access.login', route: '/auth/login' },
      {
        key: 'footer.columns.access.console',
        routeAuth: '/dashboard',
        routeGuest: '/auth/login',
      },
    ],
    titleKey: 'footer.columns.access.title',
  },
] as const satisfies ReadonlyArray<{
  links: ReadonlyArray<{
    href?: string;
    key: string;
    route?: HomeRoute;
    routeAuth?: HomeRoute;
    routeGuest?: HomeRoute;
  }>;
  titleKey: string;
}>;
