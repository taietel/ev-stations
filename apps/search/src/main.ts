import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'redis_db',
        port: 6379,
      },
    },
  );
  await app.listen();
}
bootstrap();
