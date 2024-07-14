// rate-limiter.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RATE_LIMIT_KEY } from './decorator/rate-limit.decorator';
import { CustomExceptionFactory } from '../exceptions/custom-exception.factory';
import { ErrorCode } from '../exceptions/error-codes';

interface RateLimitInfo {
  count: number;
  lastReset: number;
}

@Injectable()
export class RateLimiterInterceptor implements NestInterceptor {
  private cache: Map<string, RateLimitInfo> = new Map();

  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const rateLimitConfig = this.reflector.get(
      RATE_LIMIT_KEY,
      context.getHandler(),
    );
    if (!rateLimitConfig) {
      return next.handle();
    }

    const { limit, interval } = rateLimitConfig;
    const request = context.switchToHttp().getRequest();
    const ip = request.ip;
    const now = Date.now();

    let rateLimitInfo = this.cache.get(ip);

    if (!rateLimitInfo) {
      rateLimitInfo = { count: 1, lastReset: now };
      this.cache.set(ip, rateLimitInfo);
      return next.handle();
    }

    if (now - rateLimitInfo.lastReset > interval) {
      rateLimitInfo.count = 1;
      rateLimitInfo.lastReset = now;
    } else {
      rateLimitInfo.count++;
    }

    if (rateLimitInfo.count > limit) {
      throw CustomExceptionFactory.create(ErrorCode.TOO_MANY_REQUESTS);
    }

    this.cache.set(ip, rateLimitInfo);
    return next.handle();
  }
}
