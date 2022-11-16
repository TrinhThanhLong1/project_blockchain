import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Listing, ListingSchema } from './listing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Listing.name, schema: ListingSchema }]),
  ],
  providers: [ListingService],
  controllers: [ListingController],
  exports: [ListingService, MongooseModule],
})
export class ListingModule {}
