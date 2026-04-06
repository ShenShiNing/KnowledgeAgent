import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export type HomePreferenceOption = {
  label: string;
  value: string;
};

interface HomePreferenceMenuProps {
  ariaLabel: string;
  className?: string;
  icon: React.ReactNode;
  onValueChange: (value: string) => void;
  options: ReadonlyArray<HomePreferenceOption>;
  value: string;
}

export function HomePreferenceMenu({
  ariaLabel,
  className,
  icon,
  onValueChange,
  options,
  value,
}: HomePreferenceMenuProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'group inline-flex h-auto items-center gap-1.5 bg-transparent p-0 text-(--home-text-soft) transition-colors hover:text-(--home-text-strong) focus-visible:outline-none data-[state=open]:text-(--home-text-strong)',
            className
          )}
          aria-label={ariaLabel}
          title={ariaLabel}
        >
          {icon}
          <ChevronDown className="size-3 text-(--home-text-soft) transition-transform group-data-[state=open]:rotate-180 group-data-[state=open]:text-(--home-text-strong)" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-40 border-(--home-border) bg-(--home-paper) text-(--home-text-strong) shadow-(--home-shadow)"
      >
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
