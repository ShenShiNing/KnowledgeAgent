import type { LucideIcon } from 'lucide-react';
import {
  ClipboardCheck,
  Database,
  FileText,
  FolderKanban,
  Link2,
  Lock,
  LockKeyhole,
  MessageSquareText,
  Orbit,
  Search,
  ShieldCheck,
} from 'lucide-react';

export type HomeRoute =
  | '/about'
  | '/auth/login'
  | '/auth/signup'
  | '/dashboard'
  | '/knowledge-bases';

export const homePrimaryButtonClass =
  'h-11 rounded-full border border-[rgba(255,255,255,0.12)] bg-(--home-accent) px-5 text-[color:var(--home-accent-ink)] shadow-[0_14px_36px_rgba(0,0,0,0.24)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-(--home-accent-strong) hover:shadow-[0_18px_40px_rgba(0,0,0,0.3)] focus-visible:ring-[color:var(--home-accent)]';

export const homeGhostButtonClass =
  'h-10 rounded-full border border-(--home-border) bg-[rgba(255,255,255,0.03)] px-4 text-sm font-semibold text-(--home-text-strong) shadow-none transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-(--home-text-strong) focus-visible:ring-[color:var(--home-accent)]';

export const homeNavItems = [
  { href: '#workflow', key: 'nav.workflow' },
  { href: '#capabilities', key: 'nav.capabilities' },
  { key: 'nav.about', route: '/about' },
] as const;

export const homeHeroMetrics = [
  {
    labelKey: 'hero.metrics.trace.label',
    valueKey: 'hero.metrics.trace.value',
  },
  {
    labelKey: 'hero.metrics.scope.label',
    valueKey: 'hero.metrics.scope.value',
  },
  {
    labelKey: 'hero.metrics.review.label',
    valueKey: 'hero.metrics.review.value',
  },
] as const;

export const homeProofCards = [
  {
    descriptionKey: 'proof.cards.trace.description',
    icon: Orbit,
    titleKey: 'proof.cards.trace.title',
    valueKey: 'proof.cards.trace.value',
  },
  {
    descriptionKey: 'proof.cards.boundary.description',
    icon: LockKeyhole,
    titleKey: 'proof.cards.boundary.title',
    valueKey: 'proof.cards.boundary.value',
  },
  {
    descriptionKey: 'proof.cards.review.description',
    icon: ClipboardCheck,
    titleKey: 'proof.cards.review.title',
    valueKey: 'proof.cards.review.value',
  },
] as const;

export const homeWorkflowSteps = [
  {
    descriptionKey: 'workflow.steps.connect.description',
    icon: Link2,
    number: '01',
    titleKey: 'workflow.steps.connect.title',
  },
  {
    descriptionKey: 'workflow.steps.index.description',
    icon: FileText,
    number: '02',
    titleKey: 'workflow.steps.index.title',
  },
  {
    descriptionKey: 'workflow.steps.query.description',
    icon: Search,
    number: '03',
    titleKey: 'workflow.steps.query.title',
  },
  {
    descriptionKey: 'workflow.steps.act.description',
    icon: ShieldCheck,
    number: '04',
    titleKey: 'workflow.steps.act.title',
  },
] as const;

export const homeFeatureCards = [
  {
    ctaKey: 'capabilities.cards.rag.cta',
    descriptionKey: 'capabilities.cards.rag.description',
    eyebrowKey: 'capabilities.cards.rag.eyebrow',
    icon: Database,
    signalKey: 'capabilities.cards.rag.signal',
    tone: 'lime',
    routeAuth: '/knowledge-bases',
    routeGuest: '/auth/signup',
    titleKey: 'capabilities.cards.rag.title',
  },
  {
    ctaKey: 'capabilities.cards.secure.cta',
    descriptionKey: 'capabilities.cards.secure.description',
    eyebrowKey: 'capabilities.cards.secure.eyebrow',
    icon: Lock,
    signalKey: 'capabilities.cards.secure.signal',
    tone: 'amber',
    route: '/about',
    titleKey: 'capabilities.cards.secure.title',
  },
  {
    ctaKey: 'capabilities.cards.multimodal.cta',
    descriptionKey: 'capabilities.cards.multimodal.description',
    eyebrowKey: 'capabilities.cards.multimodal.eyebrow',
    icon: MessageSquareText,
    signalKey: 'capabilities.cards.multimodal.signal',
    tone: 'slate',
    routeAuth: '/dashboard',
    routeGuest: '/auth/signup',
    titleKey: 'capabilities.cards.multimodal.title',
  },
  {
    ctaKey: 'capabilities.cards.search.cta',
    descriptionKey: 'capabilities.cards.search.description',
    eyebrowKey: 'capabilities.cards.search.eyebrow',
    icon: FolderKanban,
    signalKey: 'capabilities.cards.search.signal',
    tone: 'steel',
    routeAuth: '/dashboard',
    routeGuest: '/auth/signup',
    titleKey: 'capabilities.cards.search.title',
  },
] as const satisfies ReadonlyArray<{
  ctaKey: string;
  descriptionKey: string;
  eyebrowKey: string;
  icon: LucideIcon;
  signalKey: string;
  tone: 'amber' | 'lime' | 'slate' | 'steel';
  route?: HomeRoute;
  routeAuth?: HomeRoute;
  routeGuest?: HomeRoute;
  titleKey: string;
}>;

export const homeFooterColumns = [
  {
    links: [
      { key: 'footer.columns.product.workflow', href: '#workflow' },
      { key: 'footer.columns.product.features', href: '#capabilities' },
      {
        key: 'footer.columns.product.workspace',
        routeAuth: '/dashboard',
        routeGuest: '/auth/signup',
      },
    ],
    titleKey: 'footer.columns.product.title',
  },
  {
    links: [
      { key: 'footer.columns.company.about', route: '/about' },
      { key: 'footer.columns.company.login', route: '/auth/login' },
      {
        key: 'footer.columns.company.getStarted',
        routeAuth: '/dashboard',
        routeGuest: '/auth/signup',
      },
    ],
    titleKey: 'footer.columns.company.title',
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
