import { Module } from '@nestjs/common';
import { urlRepositoryProvider } from './repositories/url.repository';
import { UrlService } from './url.service';

@Module({
  imports: [],
  providers: [urlRepositoryProvider, UrlService],
  exports: [UrlService],
})
export class UrlModule {}
