import { describe, expect, it } from 'vitest';
import { resolveZodIssueMessage } from '@/lib/validation/resolve-zod-issue-message';

describe('resolveZodIssueMessage', () => {
  it('returns localized invalid email text for email format issues', () => {
    expect(
      resolveZodIssueMessage(
        {
          code: 'invalid_format',
          format: 'email',
          message: 'Invalid email format',
        },
        { invalidEmail: '邮箱格式不正确' }
      )
    ).toBe('邮箱格式不正确');
  });

  it('returns localized required text for required string issues', () => {
    expect(
      resolveZodIssueMessage(
        {
          code: 'too_small',
          minimum: 1,
          origin: 'string',
          message: 'Password is required',
        },
        { required: '请输入密码' }
      )
    ).toBe('请输入密码');
  });

  it('falls back to the original issue message when nothing matches', () => {
    expect(
      resolveZodIssueMessage({
        code: 'custom',
        message: 'Original message',
      })
    ).toBe('Original message');
  });
});
