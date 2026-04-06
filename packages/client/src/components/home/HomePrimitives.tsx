import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type HomeSectionHeadingProps = {
  align?: 'left' | 'center';
  className?: string;
  description?: string;
  descriptionClassName?: string;
  eyebrow?: string;
  title: string;
  titleClassName?: string;
};

export function HomeSectionHeading({
  align = 'left',
  className,
  description,
  descriptionClassName,
  eyebrow,
  title,
  titleClassName,
}: HomeSectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div className={cn('max-w-3xl', isCentered && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'inline-flex items-center gap-3 rounded-full border border-(--home-border) bg-[rgba(255,252,248,0.86)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-(--home-text-soft) shadow-[0_10px_24px_rgba(61,43,24,0.05)]',
            isCentered && 'justify-center'
          )}
        >
          <span className="h-2 w-2 rounded-full bg-[#b78347]" />
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={cn(
          'mt-5 max-w-[13ch] text-balance font-display text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-(--home-text-strong)',
          isCentered && 'mx-auto',
          titleClassName
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            'mt-5 max-w-152 text-[0.98rem] leading-8 text-(--home-text-muted) sm:text-[1.02rem]',
            isCentered && 'mx-auto',
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

type HomeSignalPillProps = {
  children: ReactNode;
};

export function HomeSignalPill({ children }: HomeSignalPillProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-(--home-border) bg-[rgba(255,252,247,0.76)] px-3.5 py-2 text-[11px] font-medium text-(--home-text-muted) shadow-[0_12px_24px_rgba(61,43,24,0.05)] backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-[#b78347]" />
      {children}
    </span>
  );
}

type HomeMetricCardProps = {
  label: string;
  value: string;
};

export function HomeMetricCard({ label, value }: HomeMetricCardProps) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-(--home-border) bg-[rgba(255,252,247,0.8)] p-4 shadow-(--home-shadow-soft) backdrop-blur-sm transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[rgba(95,67,38,0.2)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--home-text-soft)">
        {label}
      </p>
      <p className="mt-4 font-display text-[1.55rem] font-semibold tracking-[-0.06em] text-(--home-text-strong)">
        {value}
      </p>
    </article>
  );
}

type HomeWorkflowCardProps = {
  description: string;
  icon: LucideIcon;
  number: string;
  title: string;
};

export function HomeWorkflowCard({
  description,
  icon: Icon,
  number,
  title,
}: HomeWorkflowCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[30px] border border-(--home-border) bg-[rgba(255,252,247,0.82)] p-6 shadow-(--home-shadow-soft) transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[rgba(95,67,38,0.2)] hover:shadow-[0_22px_44px_rgba(61,43,24,0.08)] sm:p-7">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(196,147,84,0.18),transparent_72%)] opacity-70"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span className="font-editorial text-[2.6rem] font-semibold italic leading-none tracking-[-0.08em] text-[rgba(31,26,22,0.38)]">
            {number}
          </span>
          <span className="flex size-12 items-center justify-center rounded-[18px] border border-(--home-border) bg-white/70 text-(--home-text-strong)">
            <Icon className="size-4.5" />
          </span>
        </div>

        <h3 className="mt-8 max-w-[14ch] font-display text-[clamp(1.45rem,2vw,2rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-(--home-text-strong)">
          {title}
        </h3>
        <p className="mt-4 max-w-[32ch] text-sm leading-7 text-(--home-text-muted)">
          {description}
        </p>
      </div>
    </article>
  );
}

type HomeEvidenceCardProps = {
  className?: string;
  description: string;
  icon: LucideIcon;
  title: string;
  value: string;
};

export function HomeEvidenceCard({
  className,
  description,
  icon: Icon,
  title,
  value,
}: HomeEvidenceCardProps) {
  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-[30px] border border-(--home-border) bg-[rgba(255,252,247,0.84)] p-6 shadow-(--home-shadow-soft) transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[rgba(95,67,38,0.2)] sm:p-7',
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(196,147,84,0.16),transparent_72%)]"
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
            {value}
          </span>
          <span className="flex size-10 items-center justify-center rounded-full border border-(--home-border) bg-white/72 text-(--home-text-strong)">
            <Icon className="size-4" />
          </span>
        </div>

        <h3 className="mt-10 max-w-[14ch] text-balance font-display text-[clamp(1.55rem,2vw,2rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-(--home-text-strong)">
          {title}
        </h3>
        <p className="mt-4 max-w-[32ch] text-sm leading-7 text-(--home-text-muted)">
          {description}
        </p>
      </div>
    </article>
  );
}

const featureToneClasses = {
  ink: {
    badge: 'border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] text-[#faf7f2]',
    cta: 'text-[#faf7f2]',
    eyebrow: 'text-[rgba(255,255,255,0.62)]',
    panel:
      'border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,#1f1a16_0%,#18130f_100%)] text-[#faf7f2] shadow-[0_24px_54px_rgba(31,26,22,0.18)]',
    text: 'text-[rgba(255,247,240,0.74)]',
  },
  moss: {
    badge: 'border-[rgba(82,97,69,0.12)] bg-[rgba(237,242,231,0.82)] text-[#3d4c31]',
    cta: 'text-[#253018]',
    eyebrow: 'text-[rgba(37,48,24,0.64)]',
    panel:
      'border-[rgba(82,97,69,0.12)] bg-[linear-gradient(180deg,#f0f4ea_0%,#e8eee0_100%)] text-[#253018]',
    text: 'text-[rgba(37,48,24,0.72)]',
  },
  pearl: {
    badge: 'border-(--home-border) bg-white/72 text-(--home-text-strong)',
    cta: 'text-(--home-text-strong)',
    eyebrow: 'text-(--home-text-soft)',
    panel:
      'border-(--home-border) bg-[linear-gradient(180deg,#fffdf9_0%,#f8f3eb_100%)] text-(--home-text-strong)',
    text: 'text-(--home-text-muted)',
  },
  sand: {
    badge: 'border-[rgba(183,131,71,0.14)] bg-[rgba(251,242,228,0.9)] text-[#7a5425]',
    cta: 'text-[#523619]',
    eyebrow: 'text-[rgba(82,54,25,0.62)]',
    panel:
      'border-[rgba(183,131,71,0.12)] bg-[linear-gradient(180deg,#fff9f1_0%,#f7ebdb_100%)] text-[#2d2115]',
    text: 'text-[rgba(45,33,21,0.72)]',
  },
} as const;

type HomeFeatureCardProps = {
  cta: ReactNode;
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  signal: string;
  title: string;
  tone: keyof typeof featureToneClasses;
};

export function HomeFeatureCard({
  cta,
  description,
  eyebrow,
  icon: Icon,
  signal,
  title,
  tone,
}: HomeFeatureCardProps) {
  const toneClasses = featureToneClasses[tone];

  return (
    <article
      className={cn(
        'group relative h-full min-h-72 overflow-hidden rounded-[32px] border p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 sm:p-7',
        toneClasses.panel
      )}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.36),transparent_74%)]"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex size-12 items-center justify-center rounded-[18px] border border-current/10 bg-white/55">
            <Icon className="size-4.5" />
          </div>

          <span
            className={cn(
              'max-w-[19ch] rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]',
              toneClasses.badge
            )}
          >
            {signal}
          </span>
        </div>

        <p
          className={cn(
            'mt-8 text-[10px] font-semibold uppercase tracking-[0.26em]',
            toneClasses.eyebrow
          )}
        >
          {eyebrow}
        </p>
        <h3 className="mt-4 max-w-[12ch] font-display text-[clamp(1.65rem,2.4vw,2.3rem)] font-semibold leading-[0.98] tracking-[-0.06em]">
          {title}
        </h3>
        <p className={cn('mt-5 max-w-[34ch] text-sm leading-7', toneClasses.text)}>{description}</p>

        <span
          className={cn(
            'mt-auto inline-flex items-center gap-2 pt-10 text-sm font-semibold',
            toneClasses.cta
          )}
        >
          {cta}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}

type HomeFaqItemProps = {
  answer: string;
  question: string;
};

export function HomeFaqItem({ answer, question }: HomeFaqItemProps) {
  return (
    <details className="group rounded-[26px] border border-(--home-border) bg-[rgba(255,252,247,0.8)] p-6 shadow-(--home-shadow-soft) transition-colors open:bg-white/90">
      <summary className="flex list-none items-center justify-between gap-4 text-left">
        <span className="max-w-[28ch] font-display text-[1.25rem] font-semibold leading-[1.08] tracking-[-0.04em] text-(--home-text-strong)">
          {question}
        </span>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-(--home-border) bg-white/72 text-(--home-text-strong) transition-transform duration-300 group-open:rotate-180">
          <ChevronDown className="size-4" />
        </span>
      </summary>
      <p className="pt-5 text-sm leading-7 text-(--home-text-muted)">{answer}</p>
    </details>
  );
}

type HomeFooterColumnProps = {
  children: ReactNode;
  title: string;
};

export function HomeFooterColumn({ children, title }: HomeFooterColumnProps) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
        {title}
      </p>
      <div className="mt-5 flex flex-col gap-3 text-sm text-(--home-text-muted)">{children}</div>
    </div>
  );
}
