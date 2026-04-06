type ValidationIssue = {
  code?: string;
  format?: string;
  message?: string;
  minimum?: number;
  origin?: string;
};

interface ResolveZodIssueMessageOptions {
  invalidEmail?: string;
  required?: string;
}

function isInvalidEmailIssue(issue: ValidationIssue): boolean {
  return issue.format === 'email' || issue.message === 'Invalid email format';
}

function isRequiredStringIssue(issue: ValidationIssue): boolean {
  return issue.code === 'too_small' && issue.minimum === 1 && issue.origin === 'string';
}

export function resolveZodIssueMessage(
  issue: ValidationIssue | undefined,
  options: ResolveZodIssueMessageOptions = {}
): string | undefined {
  if (!issue) return undefined;

  if (options.invalidEmail && isInvalidEmailIssue(issue)) {
    return options.invalidEmail;
  }

  if (options.required && isRequiredStringIssue(issue)) {
    return options.required;
  }

  return issue.message;
}
