import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {

  const app = await NestFactory.create(AppModule,{cors:true});
  app.use("/assets",express.static(path.join(__dirname, '../assets')));
  app.setGlobalPrefix('v1');
  await app.listen(3000);
}
bootstrap();
