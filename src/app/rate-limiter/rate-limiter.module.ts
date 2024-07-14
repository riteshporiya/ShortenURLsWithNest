import { Module, Global } from '@nestjs/common';
import { RateLimiterInterceptor } from './rate-limiter.interceptor';

@Global()
@Module({
  providers: [RateLimiterInterceptor],
  exports: [RateLimiterInterceptor],
})
export class RateLimiterModule {}
