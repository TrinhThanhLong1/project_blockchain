import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Nft, NftSchema } from './nft.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Nft.name, schema: NftSchema }])],
  providers: [NftService],
  controllers: [NftController],
  exports: [NftService, MongooseModule],
})
export class NftModule {}
