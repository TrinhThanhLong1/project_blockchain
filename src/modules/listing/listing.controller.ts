import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QueryParamDto } from '../entity/query-param.dto';
import { USER_SWAGGER_RESPONSE } from '../user/user.constant';
import CreateListingDto from './dto/listingcreate.dto';
import UpdateListingDto from './dto/listring.update.dto';
import { LISTING_SWAGGER_RESPONSE } from './listing.constant';
import { ListingService } from './listing.service';

@ApiBearerAuth()
@Controller('listings')
@ApiTags('listing')
export class ListingController {
  constructor(private listingService: ListingService) {}

  @Post('')
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(LISTING_SWAGGER_RESPONSE.CREATE_SUCCESS)
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

  @Patch(':id')
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(LISTING_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  updateListing(
    @Param('id') id: string,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    const { lender, fee, tokenId, due_date, paid_type, message, signature } =
      updateListingDto;
    const data = {
      lender,
      fee,
      tokenId,
      due_date,
      paid_type,
      message,
      signature,
    };
    return this.listingService.updateListing(id, data);
  }

  @Get(':walletAddress')
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(LISTING_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  getLisNft(
    @Param('walletAddress') walletAddress: string,
    @Query() query: QueryParamDto,
  ) {
    return this.listingService.getList(walletAddress, query);
  }
}
