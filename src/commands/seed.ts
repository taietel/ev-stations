import { NestFactory } from '@nestjs/core';
import { SeedModule } from 'src/seed/seed.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  try {
  } catch (error) {
    console.error(error);
  } finally {
    appContext.close();
  }
}

bootstrap();
