import type { LucideIcon } from 'lucide-react';
import {
  BadgeCheck,
  Database,
  FileSearch,
  FolderKanban,
  Link2,
  Lock,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export type HomeRoute =
  | '/about'
  | '/auth/login'
  | '/auth/signup'
  | '/dashboard'
  | '/knowledge-bases';

export const homePrimaryButtonClass =
  'h-11 rounded-full border border-[#1f1a16] bg-[#1f1a16] px-5 text-[color:#faf7f2] shadow-[0_18px_40px_rgba(31,26,22,0.16)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-[#110e0b] hover:shadow-[0_22px_44px_rgba(31,26,22,0.2)] focus-visible:ring-[#1f1a16]';

export const homeGhostButtonClass =
  'h-10 rounded-full border border-(--home-border) bg-[rgba(255,250,244,0.72)] px-4 text-sm font-semibold text-(--home-text-strong) shadow-none transition-colors hover:bg-white hover:text-(--home-text-strong) focus-visible:ring-[#1f1a16]';

export const homeNavItems = [
  { href: '#workflow', key: 'nav.workflow' },
  { href: '#faq', key: 'nav.faq' },
  { key: 'nav.about', route: '/about' },
] as const;

export const homeProofCards = [
  {
    descriptionKey: 'proof.cards.trace.description',
    icon: FileSearch,
    titleKey: 'proof.cards.trace.title',
    valueKey: 'proof.cards.trace.value',
  },
  {
    descriptionKey: 'proof.cards.boundary.description',
    icon: ShieldCheck,
    titleKey: 'proof.cards.boundary.title',
    valueKey: 'proof.cards.boundary.value',
  },
  {
    descriptionKey: 'proof.cards.review.description',
    icon: BadgeCheck,
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
    descriptionKey: 'workflow.steps.query.description',
    icon: Search,
    number: '02',
    titleKey: 'workflow.steps.query.title',
  },
  {
    descriptionKey: 'workflow.steps.deliver.description',
    icon: BadgeCheck,
    number: '03',
    titleKey: 'workflow.steps.deliver.title',
  },
] as const;

export const homeFeatureCards = [
  {
    ctaKey: 'capabilities.cards.rag.cta',
    descriptionKey: 'capabilities.cards.rag.description',
    eyebrowKey: 'capabilities.cards.rag.eyebrow',
    icon: Database,
    signalKey: 'capabilities.cards.rag.signal',
    tone: 'sand',
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
    tone: 'ink',
    route: '/about',
    titleKey: 'capabilities.cards.secure.title',
  },
  {
    ctaKey: 'capabilities.cards.multimodal.cta',
    descriptionKey: 'capabilities.cards.multimodal.description',
    eyebrowKey: 'capabilities.cards.multimodal.eyebrow',
    icon: MessageSquareText,
    signalKey: 'capabilities.cards.multimodal.signal',
    tone: 'pearl',
    routeAuth: '/dashboard',
    routeGuest: '/auth/signup',
    titleKey: 'capabilities.cards.multimodal.title',
  },
  {
    ctaKey: 'capabilities.cards.search.cta',
    descriptionKey: 'capabilities.cards.search.description',
    eyebrowKey: 'capabilities.cards.search.eyebrow',
    icon: Sparkles,
    signalKey: 'capabilities.cards.search.signal',
    tone: 'moss',
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
  tone: 'ink' | 'moss' | 'pearl' | 'sand';
  route?: HomeRoute;
  routeAuth?: HomeRoute;
  routeGuest?: HomeRoute;
  titleKey: string;
}>;

export const homeFaqItems = [
  {
    answerKey: 'faq.items.sources.answer',
    questionKey: 'faq.items.sources.question',
  },
  {
    answerKey: 'faq.items.security.answer',
    questionKey: 'faq.items.security.question',
  },
  {
    answerKey: 'faq.items.setup.answer',
    questionKey: 'faq.items.setup.question',
  },
  {
    answerKey: 'faq.items.handoff.answer',
    questionKey: 'faq.items.handoff.question',
  },
] as const;

export const homeFooterColumns = [
  {
    links: [
      { key: 'footer.columns.product.workflow', href: '#workflow' },
      { key: 'footer.columns.product.faq', href: '#faq' },
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
