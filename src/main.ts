import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './common/config.common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.PORT);
}
bootstrap();
