import type { LucideIcon } from 'lucide-react';
import {
  Database,
  FileText,
  Link2,
  Lock,
  MessageSquareText,
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
  'h-11 rounded-full border border-transparent bg-(--home-accent) px-5 text-[color:var(--home-accent-ink)] shadow-[0_18px_46px_rgba(214,255,22,0.18)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-(--home-accent-strong) hover:shadow-[0_26px_58px_rgba(214,255,22,0.24)] focus-visible:ring-[color:var(--home-accent)]';

export const homeGhostButtonClass =
  'h-10 rounded-full border border-transparent bg-transparent px-0 text-sm font-semibold text-(--home-text-soft) shadow-none transition-colors hover:bg-transparent hover:text-(--home-text-strong) focus-visible:ring-[color:var(--home-accent)]';

export const homeNavItems = [
  { href: '#workflow', key: 'nav.workflow' },
  { href: '#capabilities', key: 'nav.capabilities' },
  { key: 'nav.about', route: '/about' },
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
    routeAuth: '/knowledge-bases',
    routeGuest: '/auth/signup',
    titleKey: 'capabilities.cards.rag.title',
  },
  {
    ctaKey: 'capabilities.cards.secure.cta',
    descriptionKey: 'capabilities.cards.secure.description',
    eyebrowKey: 'capabilities.cards.secure.eyebrow',
    icon: Lock,
    route: '/about',
    titleKey: 'capabilities.cards.secure.title',
  },
  {
    ctaKey: 'capabilities.cards.multimodal.cta',
    descriptionKey: 'capabilities.cards.multimodal.description',
    eyebrowKey: 'capabilities.cards.multimodal.eyebrow',
    icon: MessageSquareText,
    routeAuth: '/dashboard',
    routeGuest: '/auth/signup',
    titleKey: 'capabilities.cards.multimodal.title',
  },
  {
    ctaKey: 'capabilities.cards.search.cta',
    descriptionKey: 'capabilities.cards.search.description',
    eyebrowKey: 'capabilities.cards.search.eyebrow',
    icon: Search,
    routeAuth: '/dashboard',
    routeGuest: '/auth/signup',
    titleKey: 'capabilities.cards.search.title',
  },
] as const satisfies ReadonlyArray<{
  ctaKey: string;
  descriptionKey: string;
  eyebrowKey: string;
  icon: LucideIcon;
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
