import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ShutdownSignal } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as pkgInfo from '../package.json';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
        process.env.NODE_ENV === 'production'
            ? ['log', 'error']
            : ['debug', 'error', 'log', 'warn'],
    bufferLogs: process.env.NODE_ENV === 'production',
    autoFlushLogs: process.env.NODE_ENV === 'production',
  });

  const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
          .setTitle(pkgInfo.name.substring(1).replace(/\//g, ':'))
          .setDescription(pkgInfo.description)
          .setVersion(pkgInfo.version)
          .build(),
  );
  SwaggerModule.setup('docs', app, document);

  process.on('uncaughtException', (error: Error) => {
    logger.error({ err: error });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Promise Rejection, reason: ${reason}`);
    promise.catch((err: Error) => {
      logger.error({ err });
      process.exit(1);
    });
  });

  app
      .enableShutdownHooks([
        ShutdownSignal.SIGTERM,
        ShutdownSignal.SIGINT,
        ShutdownSignal.SIGHUP,
      ]);

  await app.listen(3000);
}
bootstrap();
