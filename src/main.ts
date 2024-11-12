import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use(morgan('dev'));

  app.enableCors();

  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Şəfa Tapp')
    .setDescription('Sefa Tapp API')
    .setVersion('2.12.2')
    // .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
