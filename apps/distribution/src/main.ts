import { NestFactory } from '@nestjs/core';
import { DistributionModule } from './distribution.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(DistributionModule, {
    transport: Transport.REDIS,
    options: {
      host: 'redis_db',
    },
  });

  await app.listen();
}
bootstrap();
