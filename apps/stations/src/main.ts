import { NestFactory } from '@nestjs/core';
import { StationsModule } from './stations.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(StationsModule, {
    transport: Transport.REDIS,
    options: {
      host: 'redis_db',
    },
  });

  await app.listen();
}
bootstrap();
