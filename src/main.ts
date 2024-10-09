import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { HttpFilter, HttpResponse } from './response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpFilter());
  app.useGlobalInterceptors(new HttpResponse());
  await app.listen(3000);
}
bootstrap();
