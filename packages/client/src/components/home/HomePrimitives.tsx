import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type HomeSectionHeadingProps = {
  align?: 'left' | 'center';
  className?: string;
  description?: string;
  eyebrow?: string;
  title: string;
};

export function HomeSectionHeading({
  align = 'left',
  className,
  description,
  eyebrow,
  title,
}: HomeSectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div className={cn('max-w-3xl', isCentered && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-(--home-accent)',
            isCentered && 'justify-center'
          )}
        >
          <span className="h-2 w-2 rounded-full bg-(--home-accent)" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display mt-4 text-[clamp(2.2rem,5.2vw,4.2rem)] font-extrabold leading-[0.92] tracking-[-0.075em] text-(--home-text-strong)">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-(--home-text-muted) sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
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
    <article className="group relative border-t border-(--home-border) pt-6">
      <div className="flex items-center justify-between gap-4">
        <span className="font-display text-[1.65rem] font-bold tracking-[-0.08em] text-(--home-accent)">
          {number}
        </span>
        <span className="flex size-10 items-center justify-center rounded-full border border-(--home-border) bg-[rgba(255,255,255,0.02)] text-(--home-accent) transition-colors duration-300 group-hover:border-[rgba(214,255,22,0.3)] group-hover:bg-[rgba(214,255,22,0.08)]">
          <Icon className="size-4" />
        </span>
      </div>

      <h3 className="mt-6 font-display text-[clamp(1.2rem,2.1vw,1.55rem)] font-bold leading-[1.02] tracking-[-0.04em] text-(--home-text-strong)">
        {title}
      </h3>
      <p className="mt-3 max-w-[28ch] text-sm leading-6 text-(--home-text-soft)">{description}</p>
    </article>
  );
}

type HomeFeatureCardProps = {
  cta: ReactNode;
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  title: string;
};

export function HomeFeatureCard({
  cta,
  description,
  eyebrow,
  icon: Icon,
  title,
}: HomeFeatureCardProps) {
  return (
    <article className="group relative h-full overflow-hidden rounded-[28px] border border-(--home-border) bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-6 shadow-[var(--home-shadow-soft)] transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-[rgba(214,255,22,0.22)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))] sm:p-7">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,255,22,0.1),transparent_52%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative flex h-full flex-col">
        <div className="flex size-10 items-center justify-center rounded-full border border-(--home-border) bg-[rgba(214,255,22,0.08)] text-(--home-accent)">
          <Icon className="size-4" />
        </div>

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-(--home-text-soft)">
          {eyebrow}
        </p>
        <h3 className="mt-3 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-bold leading-[1.04] tracking-[-0.05em] text-(--home-text-strong)">
          {title}
        </h3>

        <p className="mt-4 max-w-[32ch] text-sm leading-7 text-(--home-text-muted)">{description}</p>

        <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-(--home-accent)">
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
      <div className="mt-4 flex flex-col gap-3 text-sm text-(--home-text-muted)">{children}</div>
    </div>
  );
}
