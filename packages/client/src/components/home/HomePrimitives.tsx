import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type HomeSectionHeadingProps = {
  align?: 'left' | 'center';
  className?: string;
  description: string;
  eyebrow: string;
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
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--home-text-soft)">
        {eyebrow}
      </p>
      <h2 className="font-editorial mt-4 text-4xl leading-[0.98] tracking-[-0.05em] text-(--home-text-strong) sm:text-5xl lg:text-[4rem]">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-(--home-text-muted) sm:text-[1.05rem]">
        {description}
      </p>
    </div>
  );
}

type HomeMetricCardProps = {
  detail: string;
  label: string;
  value: string;
};

export function HomeMetricCard({ detail, label, value }: HomeMetricCardProps) {
  return (
    <article className="rounded-[26px] border border-(--home-border) bg-(--home-surface) px-5 py-5 shadow-[var(--home-shadow-soft)] backdrop-blur-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-(--home-text-soft)">
        {label}
      </p>
      <p className="font-editorial mt-3 text-4xl leading-none tracking-[-0.06em] text-(--home-text-strong)">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-(--home-text-muted)">{detail}</p>
    </article>
  );
}

type HomeOrbitalMarker = {
  className: string;
  title: string;
  value: string;
};

type HomeOrbitalPreviewProps = {
  className?: string;
  description: string;
  markers: ReadonlyArray<HomeOrbitalMarker>;
  orbitLabel: string;
  signals: ReadonlyArray<string>;
  title: string;
};

const orbitalLatitudes = ['h-[20%]', 'h-[38%]', 'h-[58%]', 'h-[78%]'] as const;
const orbitalMeridians = ['w-[18%]', 'w-[36%]', 'w-[56%]', 'w-[78%]'] as const;

export function HomeOrbitalPreview({
  className,
  description,
  markers,
  orbitLabel,
  signals,
  title,
}: HomeOrbitalPreviewProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[38px] border border-(--home-border-strong) bg-[linear-gradient(180deg,rgba(255,250,243,0.92),rgba(243,235,224,0.74))] px-6 pb-8 pt-8 shadow-[var(--home-shadow)] dark:bg-[linear-gradient(180deg,rgba(30,24,18,0.94),rgba(19,15,11,0.92))]',
        className
      )}
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--home-text-soft)">
          {orbitLabel}
        </p>
        <h3 className="font-editorial mt-4 text-4xl leading-[1.02] tracking-[-0.06em] text-(--home-text-strong) sm:text-5xl lg:text-[4.35rem]">
          {title}
        </h3>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-(--home-text-muted)">
          {description}
        </p>
      </div>

      <div className="relative mt-10 h-[18rem] overflow-hidden sm:h-[22rem] lg:h-[29rem]">
        <div className="absolute inset-x-0 bottom-[-10%] h-[42%] bg-[radial-gradient(circle_at_center,rgba(182,143,77,0.28),transparent_62%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(215,178,106,0.18),transparent_62%)]" />

        {markers.map((marker) => (
          <div
            key={marker.title}
            className={cn(
              'absolute z-20 rounded-full border border-(--home-border) bg-[rgba(255,250,243,0.84)] px-4 py-2 shadow-[var(--home-shadow-soft)] backdrop-blur-md motion-safe:animate-[home-float_12s_ease-in-out_infinite] dark:bg-[rgba(30,24,18,0.82)]',
              marker.className
            )}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-(--home-text-soft)">
              {marker.title}
            </p>
            <p className="mt-1 text-sm font-medium text-(--home-text-strong)">{marker.value}</p>
          </div>
        ))}

        <div className="absolute left-1/2 top-[56%] size-[17rem] -translate-x-1/2 -translate-y-1/2 sm:size-[22rem] lg:size-[31rem]">
          <div className="absolute inset-0 rounded-full border border-(--home-border-strong) bg-[radial-gradient(circle_at_50%_24%,rgba(182,143,77,0.18),transparent_20%),radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.65),rgba(255,255,255,0)_64%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)] dark:bg-[radial-gradient(circle_at_50%_24%,rgba(215,178,106,0.16),transparent_20%),radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.08),rgba(255,255,255,0)_64%)]" />

          {orbitalMeridians.map((width) => (
            <div
              key={width}
              className={cn(
                'absolute inset-y-0 left-1/2 -translate-x-1/2 rounded-full border border-[color:var(--home-grid)]',
                width
              )}
            />
          ))}

          {orbitalLatitudes.map((height) => (
            <div
              key={height}
              className={cn(
                'absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-full border border-[color:var(--home-grid)]',
                height
              )}
            />
          ))}

          <div className="absolute inset-0 rounded-full border border-[color:var(--home-grid)] rotate-[14deg]" />
          <div className="absolute inset-0 rounded-full border border-[color:var(--home-grid)] -rotate-[14deg]" />

          <div className="absolute left-[36%] top-[24%] h-[18%] w-[22%] rotate-[12deg] rounded-[56%_44%_48%_52%/45%_53%_47%_55%] border border-[color:var(--home-grid)] bg-[rgba(182,143,77,0.06)] dark:bg-[rgba(215,178,106,0.08)]" />
          <div className="absolute left-[48%] top-[34%] h-[24%] w-[16%] rotate-[18deg] rounded-[60%_40%_56%_44%/40%_58%_42%_60%] border border-[color:var(--home-grid)] bg-[rgba(182,143,77,0.04)] dark:bg-[rgba(215,178,106,0.06)]" />
          <div className="absolute left-[26%] top-[46%] h-[14%] w-[18%] -rotate-[16deg] rounded-[52%_48%_42%_58%/58%_45%_55%_42%] border border-[color:var(--home-grid)] bg-[rgba(182,143,77,0.04)] dark:bg-[rgba(215,178,106,0.06)]" />

          <div className="absolute left-[51%] top-[32%] size-2 -translate-x-1/2 rounded-full bg-(--home-accent)" />
          <div className="absolute left-[41%] top-[48%] size-2 rounded-full bg-(--home-accent)" />
          <div className="absolute left-[58%] top-[57%] size-2 rounded-full bg-(--home-accent)" />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {signals.map((signal) => (
          <span
            key={signal}
            className="rounded-full border border-(--home-border) bg-(--home-surface) px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--home-text-soft)"
          >
            {signal}
          </span>
        ))}
      </div>
    </div>
  );
}

type HomeEditorialCardProps = {
  cta: ReactNode;
  date: string;
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  title: string;
};

export function HomeEditorialCard({
  cta,
  date,
  description,
  eyebrow,
  icon: Icon,
  title,
}: HomeEditorialCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[30px] border border-(--home-border) bg-(--home-paper) px-5 py-5 shadow-[var(--home-shadow-soft)] transition-[transform,border-color] hover:-translate-y-1 hover:border-[color:var(--home-accent)] dark:bg-(--home-surface-soft)">
      <div className="flex items-start justify-between gap-4 border-b border-(--home-border) pb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-(--home-text-soft)">
            {eyebrow}
          </p>
          <p className="mt-2 text-sm text-(--home-text-muted)">{date}</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-full border border-(--home-border) text-(--home-text-strong)">
          <Icon className="size-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="font-editorial mt-5 text-[2rem] leading-[1.05] tracking-[-0.05em] text-(--home-text-strong)">
          {title}
        </h3>
        <p className="mt-4 flex-1 text-sm leading-7 text-(--home-text-muted)">{description}</p>
        <div className="mt-6 border-t border-(--home-border) pt-4">{cta}</div>
      </div>
    </article>
  );
}

type HomeManifestoLinkProps = {
  cta: ReactNode;
  description: string;
  icon: LucideIcon;
  title: string;
};

export function HomeManifestoLink({
  cta,
  description,
  icon: Icon,
  title,
}: HomeManifestoLinkProps) {
  return (
    <article className="group border-b border-(--home-border) py-5 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex items-start gap-4">
        <span className="mt-1 flex size-11 items-center justify-center rounded-full border border-(--home-border) bg-(--home-surface) text-(--home-text-strong) transition-colors group-hover:border-[color:var(--home-accent)] group-hover:text-(--home-accent-strong)">
          <Icon className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="font-editorial text-[1.8rem] leading-[1.02] tracking-[-0.04em] text-(--home-text-strong)">
              {title}
            </h3>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-(--home-text-strong)">
              {cta}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-(--home-text-muted)">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
