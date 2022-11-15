import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { AppModule } from './app.module';
import { appConfig } from './configs/configs.constants';
import { HttpExceptionFilter } from './shared/fillter/http-exception.filter';

async function listen() {
  const wsProvider = new WsProvider('ws://127.0.0.1:9944');
  const api = await ApiPromise.create({
    provider: wsProvider,
  });
  api.query.system.events((events) => {
    events.forEach((record) => {
      const { event } = record;
      if (event.section === 'nftCurrencyPallet' && event.method === 'Mint') {
        const enventData = [];
        event.data.forEach((data) => {
          enventData.push(data.toString());
        });
        const data = {
          walletAddress: enventData[0],
          tokenId: enventData[1],
        };
        console.log(data);
      }
    });
  });
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API with NestJS')
    .setDescription('API developed throughout the API with NestJS course')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(appConfig.port);
  listen().catch(console.error);
}
bootstrap();
