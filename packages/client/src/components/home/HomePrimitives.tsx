import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
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
            'inline-flex items-center gap-3 rounded-full border border-(--home-border) bg-[rgba(255,255,255,0.04)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-(--home-text-soft)',
            isCentered && 'justify-center'
          )}
        >
          <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.75)]" />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          'mt-5 max-w-[13ch] text-balance font-display text-[clamp(2.2rem,5vw,4.4rem)] font-extrabold leading-[0.94] tracking-[-0.08em] text-(--home-text-strong)',
          isCentered && 'mx-auto',
          titleClassName
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-5 max-w-152 text-[0.98rem] leading-7 text-(--home-text-muted) sm:text-base',
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
    <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-3.5 py-2 text-[11px] font-medium text-(--home-text-muted) shadow-[0_8px_20px_rgba(0,0,0,0.16)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[rgba(255,255,255,0.72)]" />
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
    <article className="overflow-hidden rounded-[24px] border border-(--home-border) bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4 shadow-(--home-shadow-soft) transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-(--home-border-strong)">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--home-text-soft)">
        {label}
      </p>
      <p className="mt-4 font-display text-[1.55rem] font-bold tracking-[-0.06em] text-(--home-text-strong)">
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
    <article className="group relative h-full min-h-60 overflow-hidden rounded-[30px] border border-(--home-border) bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-6 shadow-(--home-shadow-soft) transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-(--home-border-strong)">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_46%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="font-editorial text-[2.25rem] font-semibold italic tracking-[-0.08em] text-[rgba(255,255,255,0.82)]">
            {number}
          </span>
          <span className="flex size-11 items-center justify-center rounded-[18px] border border-(--home-border) bg-[rgba(255,255,255,0.04)] text-(--home-text-strong)">
            <Icon className="size-4.5" />
          </span>
        </div>

        <h3 className="mt-8 max-w-[14ch] font-display text-[clamp(1.35rem,2.2vw,1.9rem)] font-bold leading-[1.02] tracking-[-0.05em] text-(--home-text-strong)">
          {title}
        </h3>
        <p className="mt-4 max-w-[30ch] text-sm leading-7 text-(--home-text-muted)">
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
        'group relative h-full min-h-55 overflow-hidden rounded-[30px] border border-(--home-border) bg-[linear-gradient(180deg,rgba(22,22,24,0.96),rgba(10,10,12,0.92))] p-6 shadow-(--home-shadow-soft) transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-(--home-border-strong)',
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.34),transparent)]"
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
            {value}
          </span>
          <span className="flex size-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] text-(--home-text-strong)">
            <Icon className="size-4" />
          </span>
        </div>

        <h3 className="mt-10 max-w-[14ch] text-balance font-display text-[clamp(1.5rem,2vw,1.9rem)] font-bold leading-[0.98] tracking-[-0.06em] text-(--home-text-strong)">
          {title}
        </h3>
        <p className="mt-4 max-w-[30ch] text-sm leading-7 text-(--home-text-muted)">
          {description}
        </p>
      </div>
    </article>
  );
}

const featureToneClasses = {
  amber: {
    badge:
      'border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] text-[#fafafa] shadow-[0_10px_28px_rgba(0,0,0,0.12)]',
    glow: 'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_52%)]',
    panel:
      'bg-[linear-gradient(180deg,rgba(24,24,27,0.98),rgba(10,10,11,0.94))] hover:border-[rgba(255,255,255,0.18)]',
  },
  lime: {
    badge:
      'border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] text-[#fafafa] shadow-[0_10px_28px_rgba(0,0,0,0.14)]',
    glow: 'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_52%)]',
    panel:
      'bg-[linear-gradient(180deg,rgba(28,28,31,0.98),rgba(12,12,14,0.94))] hover:border-[rgba(255,255,255,0.22)]',
  },
  slate: {
    badge:
      'border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] text-[#e4e4e7] shadow-[0_10px_28px_rgba(0,0,0,0.12)]',
    glow: 'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_52%)]',
    panel:
      'bg-[linear-gradient(180deg,rgba(20,20,23,0.98),rgba(10,10,12,0.94))] hover:border-[rgba(255,255,255,0.16)]',
  },
  steel: {
    badge:
      'border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] text-[#d4d4d8] shadow-[0_10px_28px_rgba(0,0,0,0.14)]',
    glow: 'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_52%)]',
    panel:
      'bg-[linear-gradient(180deg,rgba(18,18,20,0.98),rgba(9,9,11,0.94))] hover:border-[rgba(255,255,255,0.18)]',
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
        'group relative h-full min-h-65 overflow-hidden rounded-[32px] border border-(--home-border) p-6 shadow-(--home-shadow-soft) transition-[transform,border-color] duration-300 hover:-translate-y-1 sm:min-h-70 sm:p-7',
        toneClasses.panel
      )}
    >
      <div aria-hidden className={cn('absolute inset-0 opacity-90', toneClasses.glow)} />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex size-12 items-center justify-center rounded-[18px] border border-(--home-border) bg-[rgba(255,255,255,0.05)] text-(--home-text-strong)">
            <Icon className="size-4.5" />
          </div>
          <span
            className={cn(
              'max-w-[18ch] rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase',
              toneClasses.badge
            )}
          >
            {signal}
          </span>
        </div>

        <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.26em] text-(--home-text-soft)">
          {eyebrow}
        </p>
        <h3 className="mt-4 max-w-[12ch] font-display text-[clamp(1.55rem,2.5vw,2.2rem)] font-bold leading-[0.98] tracking-[-0.06em] text-(--home-text-strong)">
          {title}
        </h3>
        <p className="mt-5 max-w-[32ch] text-sm leading-7 text-(--home-text-muted)">
          {description}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-10 text-sm font-semibold text-(--home-text-strong)">
          {cta}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
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
