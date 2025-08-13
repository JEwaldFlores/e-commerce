
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import ENV from './config/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false, 
    transform: true,
    transformOptions: { enableImplicitConversion:true},
  }));

  const config = new DocumentBuilder()
    .setTitle('Proyecto Back M4')
    .setDescription('App desarrollada con NestJS')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Server listening on http://localhost:${ENV.PORT}`)
}
bootstrap();
