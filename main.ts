import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilitar CORS para permitir requisições externas
  await app.listen(3000); // Porta padrão
}
bootstrap();
