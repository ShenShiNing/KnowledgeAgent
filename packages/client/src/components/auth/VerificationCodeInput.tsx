import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';
import { authOTPGroupClass, authOTPSlotClass } from './auth-theme';

interface VerificationCodeInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  error?: boolean;
  appearance?: 'default' | 'auth';
}

export function VerificationCodeInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  autoFocus = false,
  error = false,
  appearance = 'default',
}: VerificationCodeInputProps) {
  const slotClassName =
    appearance === 'auth'
      ? authOTPSlotClass
      : 'h-11 w-10 text-lg font-semibold sm:h-12 sm:w-12 sm:text-xl';

  return (
    <InputOTP
      maxLength={length}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoFocus={autoFocus}
      pattern={REGEXP_ONLY_DIGITS}
      containerClassName="justify-center"
    >
      <InputOTPGroup className={cn(appearance === 'auth' && authOTPGroupClass)}>
        {Array.from({ length }, (_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            className={cn(slotClassName, error && 'border-destructive')}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
