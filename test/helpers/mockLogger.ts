import { vitest } from 'vitest';

export const mockLogger = {
  info: vitest.fn(),
  error: vitest.fn(),
  warn: vitest.fn(),
  debug: vitest.fn(),
};
