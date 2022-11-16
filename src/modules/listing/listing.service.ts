import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Listing, ListingDocument } from './listing.schema';
import CreateListingDto from './dto/listingcreate.dto';

@Injectable()
export class ListingService {
  constructor(
    @InjectModel(Listing.name) private listingModel: Model<ListingDocument>,
  ) {}

  async createListing(createListing: CreateListingDto) {
    return this.listingModel.create(createListing);
  }
}
