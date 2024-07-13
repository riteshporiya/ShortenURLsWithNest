import { Injectable, Logger } from '@nestjs/common';
import { logAround } from '../logger/decorator/log-around';

@Injectable()
export class BootstrapService {
  constructor(private logger: Logger) {
    this.bootstrap();
  }

  @logAround()
  private bootstrap() {
    this.logger.log('Bootstrapping...');
  }
}
