import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlModule } from '../url/url.module';

@Module({
  imports: [UrlModule],
  controllers: [UrlController],
})
export class RestModule {}
