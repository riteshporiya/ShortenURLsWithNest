import { Logger, Module } from '@nestjs/common';
import { BootstrapService } from './bootstrap.service';

@Module({
  imports: [],
  providers: [BootstrapService, Logger],
})
export class BootStrapModule {}
