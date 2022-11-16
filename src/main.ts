import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { AppModule } from './app.module';
import { appConfig } from './configs/configs.constants';
import { HttpExceptionFilter } from './shared/fillter/http-exception.filter';
import { NftService } from './modules/nft/nft.service';

async function listenPolkadot(nftService: NftService) {
  const wsProvider = new WsProvider('ws://127.0.0.1:9944');
  const api = await ApiPromise.create({
    provider: wsProvider,
  });
  api.query.system.events((events) => {
    events.forEach((record) => {
      const { event } = record;
      if (event.section === 'nftCurrency' && event.method === 'Mint') {
        const enventData = [];
        event.data.forEach((data) => {
          enventData.push(data.toString());
        });
        const data = {
          walletAddress: enventData[0],
          tokenId: enventData[1],
        };
        nftService.addNft(data);
      } else if (event.section === 'nftCurrency' && event.method === 'SetUri') {
        const enventData = [];
        event.data.forEach((data) => {
          enventData.push(data.toString());
        });
        const data = {
          tokenId: enventData[0],
          uri: enventData[1],
        };
        nftService.setUri(data);
      }
    });
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const nftService = app.get<NftService>(NftService);
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
  listenPolkadot(nftService).catch(console.error);
}
bootstrap();
