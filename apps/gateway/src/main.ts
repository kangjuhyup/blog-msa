/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { AppModule } from './app/app.module';
import { SiweMessage } from 'siwe';
import cookieParser from 'cookie-parser';

declare module "express-session" {
  interface SessionData {
    nonce?: string | null;
    swie? : SiweMessage | null
  }
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.enableCors({ credentials : true, origin : true });
  app.setGlobalPrefix(globalPrefix);
  app.use(session({
    secret : 'kangjuhyup1993',
    resave : false,
    saveUninitialized : true,
  }))
  app.use(cookieParser())
  const port = process.env.PORT || 8000;
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
