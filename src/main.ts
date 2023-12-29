import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // create api service
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // load config service
  const configService = app.get<ConfigService>(ConfigService);

  // listen to service
  await app.listen(configService.get('app.port'));
}

bootstrap();
