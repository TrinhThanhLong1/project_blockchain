import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NftService } from './nft.service';

@ApiBearerAuth()
@Controller('nfts')
@ApiTags('Nft')
export class NftController {
  constructor(private nftService: NftService) {}
}
