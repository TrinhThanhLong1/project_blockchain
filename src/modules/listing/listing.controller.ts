import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import CreateListingDto from './dto/listingcreate.dto';
import { ListingService } from './listing.service';

@ApiBearerAuth()
@Controller('listings')
@ApiTags('listing')
export class ListingController {
  constructor(private listingService: ListingService) {}

  @Post('')
  createListing(@Body() createListing: CreateListingDto) {
    const { lender, fee, tokenId, due_date, paid_type, message, signature } =
      createListing;
    const data = {
      lender,
      fee,
      tokenId,
      due_date,
      paid_type,
      message,
      signature,
    };
    return this.listingService.createListing(data);
  }
}
