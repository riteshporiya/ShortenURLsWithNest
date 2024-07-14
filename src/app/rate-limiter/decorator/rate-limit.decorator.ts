import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rate_limit';
export const RateLimit = (limit: number, interval: number) =>
  SetMetadata(RATE_LIMIT_KEY, { limit, interval });
