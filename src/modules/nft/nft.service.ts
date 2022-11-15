import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateNftDto from './dto/nft.create.dto';

import { Nft, NftDocument } from './nft.schema';

@Injectable()
export class NftService {
  constructor(@InjectModel(Nft.name) private nftModel: Model<NftDocument>) {}

  async createNft(data: CreateNftDto[]) {
    const nft = await this.nftModel.insertMany(data);
    return {
      data: nft,
    };
  }
}
