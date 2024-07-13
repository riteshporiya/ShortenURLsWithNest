import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url === '/') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  await app.listen(3000);
}
bootstrap();
