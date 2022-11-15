import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import CreateNftDto from './dto/nft.create.dto';
import { NFT_SWAGGER_RESPONSE } from './nft.constant';
import { Nft } from './nft.schema';
import { NftService } from './nft.service';

@ApiBearerAuth()
@Controller('nfts')
@ApiTags('Nft')
export class NftController {
  constructor(private nftService: NftService) {}
}
