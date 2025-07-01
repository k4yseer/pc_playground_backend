import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({allowedheaders:["content-type"], origin:"http://localhost:5173"})
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
