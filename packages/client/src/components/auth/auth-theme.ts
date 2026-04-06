import { homeGhostButtonClass, homePrimaryButtonClass } from '@/components/home/home-content';
import { cn } from '@/lib/utils';

export const authCardClass =
  'overflow-hidden rounded-[28px] border border-(--home-border) bg-(--home-paper) text-(--home-text-strong) shadow-(--home-shadow-soft) backdrop-blur-sm';

export const authCardHeaderClass = 'gap-3 border-b border-(--home-border) pb-5';

export const authTitleClass =
  'font-display text-xl font-semibold tracking-[-0.05em] text-(--home-text-strong)';

export const authDescriptionClass = 'text-sm leading-6 text-(--home-text-muted)';

export const authMutedTextClass = 'text-sm leading-6 text-(--home-text-muted)';

export const authInlineLinkClass =
  'text-sm text-(--home-text-muted) transition-colors hover:text-(--home-text-strong)';

export const authPrimaryButtonClass = cn(
  homePrimaryButtonClass,
  'h-11 w-full font-display text-sm font-semibold tracking-[0.02em]'
);

export const authSecondaryButtonClass = cn(
  homeGhostButtonClass,
  'h-10 rounded-full border-(--home-border) bg-(--home-surface) text-(--home-text-strong)'
);

export const authSocialButtonClass = cn(
  authSecondaryButtonClass,
  'h-11 w-full justify-center font-medium'
);

export const authSeparatorClass = 'bg-(--home-border)';

export const authSeparatorLabelClass =
  'bg-[color:var(--home-paper)] px-3 text-[11px] font-semibold tracking-[0.18em] text-(--home-text-soft)';

export const authFormLabelClass = 'font-medium text-(--home-text-strong)';

export const authInputClass =
  'h-11 rounded-2xl border-(--home-border) bg-(--home-surface) text-(--home-text-strong) shadow-none placeholder:text-(--home-text-soft) transition-[border-color,background-color,box-shadow] hover:border-(--home-border-strong) focus-visible:border-(--home-border-strong) focus-visible:ring-[3px] focus-visible:ring-[var(--home-accent-soft)] disabled:bg-(--home-surface-soft)';

export const authFieldIconClass = 'text-(--home-text-soft)';

export const authPasswordToggleClass = 'text-(--home-text-soft) hover:text-(--home-text-strong)';

export const authHintClass = 'text-(--home-text-muted)';

export const authStepDotActiveClass = 'bg-(--home-accent)';
export const authStepDotInactiveClass = 'bg-(--home-border)';
export const authStepLineActiveClass = 'bg-(--home-accent)';
export const authStepLineInactiveClass = 'bg-(--home-border)';

export const authOTPGroupClass =
  'overflow-hidden rounded-[20px] border border-(--home-border) bg-(--home-surface) shadow-inner';

export const authOTPSlotClass =
  'h-12 w-11 border-y-0 border-r border-(--home-border) bg-transparent font-display text-lg font-semibold tracking-[0.12em] text-(--home-text-strong) shadow-none first:rounded-l-[20px] first:border-l-0 last:rounded-r-[20px] last:border-r-0 data-[active=true]:border-(--home-border-strong) data-[active=true]:bg-(--home-paper) data-[active=true]:ring-[3px] data-[active=true]:ring-[var(--home-accent-soft)] sm:h-12 sm:w-12 sm:text-xl';
