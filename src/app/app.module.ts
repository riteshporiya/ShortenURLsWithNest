import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { postgresConfig } from './config';
import * as path from 'path';
import { DbModule } from './db/db.module';
import { BootStrapModule } from './bootstrap/bootstrap.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpModule as HttpClientModule } from '@nestjs/axios';
import { LoggingInterceptor } from './logger/logging.interceptor';
import { RestModule } from './rest/rest.module';

const envFilePath = path.resolve(__dirname, '../../../.env');

@Module({
  imports: [
    DbModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('postgresConfig'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'local' ? envFilePath : undefined,
      load: [postgresConfig],
    }),
    BootStrapModule,
    HttpClientModule,
    RestModule,
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
