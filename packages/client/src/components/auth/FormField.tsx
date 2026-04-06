import type { CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  authFieldIconClass,
  authFormLabelClass,
  authHintClass,
  authInputClass,
  authPasswordToggleClass,
} from './auth-theme';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
  icon?: LucideIcon;
  errors?: string[];
  hint?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  appearance?: 'default' | 'auth';
}

function PasswordToggleButton({
  appearance = 'default',
  showPassword,
  onToggle,
}: {
  appearance?: 'default' | 'auth';
  showPassword: boolean;
  onToggle: () => void;
}) {
  const Icon = showPassword ? EyeOff : Eye;
  return (
    <button
      type="button"
      className={cn(
        'absolute right-3 top-2.5 cursor-pointer text-muted-foreground transition-colors hover:text-foreground',
        appearance === 'auth' && authPasswordToggleClass
      )}
      onClick={onToggle}
      tabIndex={-1}
    >
      <Icon className="size-4" />
    </button>
  );
}

function FieldMessage({
  appearance = 'default',
  error,
  hint,
}: {
  appearance?: 'default' | 'auth';
  error?: string;
  hint?: string;
}) {
  if (error) {
    return <p className="text-xs text-destructive">{error}</p>;
  }
  if (hint) {
    return (
      <p className={cn('text-xs text-muted-foreground', appearance === 'auth' && authHintClass)}>
        {hint}
      </p>
    );
  }
  return null;
}

function getInputType(type: string, showPasswordToggle?: boolean, showPassword?: boolean): string {
  if (!showPasswordToggle) return type;
  return showPassword ? 'text' : 'password';
}

export function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  inputClassName,
  inputStyle,
  value,
  onChange,
  onBlur,
  disabled,
  required,
  icon: Icon,
  errors = [],
  hint,
  showPasswordToggle,
  showPassword,
  onTogglePassword,
  appearance = 'default',
}: FormFieldProps) {
  const inputType = getInputType(type, showPasswordToggle, showPassword);
  const isAuthAppearance = appearance === 'auth';

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className={cn(isAuthAppearance && authFormLabelClass)}>
        {label}
      </Label>
      <div className="relative">
        {Icon && (
          <Icon
            className={cn(
              'absolute left-3 top-2.5 size-4 text-muted-foreground',
              isAuthAppearance && authFieldIconClass
            )}
          />
        )}
        <Input
          id={name}
          type={inputType}
          placeholder={placeholder}
          className={cn(
            Icon && 'pl-10',
            showPasswordToggle && 'pr-10',
            isAuthAppearance && authInputClass,
            inputClassName
          )}
          style={inputStyle}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
        />
        {showPasswordToggle && onTogglePassword && (
          <PasswordToggleButton
            appearance={appearance}
            showPassword={!!showPassword}
            onToggle={onTogglePassword}
          />
        )}
      </div>
      <FieldMessage appearance={appearance} error={errors[0]} hint={hint} />
    </div>
  );
}
